<script lang="ts">
  import { onMount } from "svelte";
  import Highcharts from "highcharts";
  import Total from "../components/Total.svelte";
  import PixCard from "../components/PixCard.svelte";
  import MyCards from "../components/MyCards.svelte";
  import Transactions from "../components/Transactions.svelte";
  import { requestSignal } from '../store/store';

  import { type TransactionItemInterface } from "../interfaces/TransactionItem.interface";

  let transactions: TransactionItemInterface[] = [];
  let balance: number = 0;

  function sort(array, desc = true) {
    if(desc) return array.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    else return array.sort((b, a) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  requestSignal.subscribe(signal => {
    if (signal) {
      renderDashboard()
      requestSignal.set(false);
    }
  });

  async function renderDashboard() {
    const responseBalance = await fetch("http://localhost:3000/balance");
    balance = await responseBalance.json();

    let splineData;
    const response = await fetch("http://localhost:3000/transaction/?date_like=2023");
    const jsonData = await response.json();
    transactions = jsonData;

    const meses = {
      0: "Janeiro",
      1: "Fevereiro",
      2: "Março",
      3: "Abril",
      4: "Maio",
      5: "Junho",
      6: "Julho",
      7: "Agosto",
      8: "Setembro",
      9: "Outubro",
      10: "Novembro",
      11: "Dezembro"
    };

    const obterSomatorioPorMes = (transactions) => {
      const resultado = {};

      transactions.forEach(obj => {
        const data = new Date(obj.date);
        data.setHours(data.getHours() + 3);
        const mes = data.getMonth();
        const valor = obj.value;

        const cardId = obj.idCard;

        if (!resultado[cardId]) {
          resultado[cardId] = {
            card: obj.idCard,
            hist: Array.from({ length: 12 }, (_, i) => ({ month: meses[i], value: 0 }))
          };
        }

        resultado[cardId].hist[mes].month = meses[mes];
        resultado[cardId].hist[mes].value += valor;
      });

      return Object.values(resultado);
    };

    const cardTransaction = transactions.filter(item => item.idCard > 0);
    const resultadoCardTransaction = obterSomatorioPorMes(cardTransaction);

    const transactionCard = await Promise.all(resultadoCardTransaction.map(async (item: any) => {
      const response: any = await fazerRequisicaoDoCartao(item.card);
      const flagValid = response.flag.charAt(0).toUpperCase() + response.flag.slice(1) + ' ' + response.valid; // Concatenação dos campos flag e valid

      return {
        ...item,
        label: flagValid
      };
    }));

    const balanceTransaction = transactions.filter(item => item.idCard == 0);
    
    const resultado = [{
      card: 0,
      hist: Array.from({ length: 12 }, (_, i) => ({ month: meses[i], value: 0 }))
    }];

    const transactionBalanceTemp = sort(balanceTransaction, false)
    const transactionBalance = await Promise.all(resultado.map(async (item: any) => {
      item.hist.map((el, idx) => {
        const dataCurrent = new Date();
        const mesCurrent = dataCurrent.getMonth();
        if(idx > 0 && idx <= mesCurrent ) el.value = item.hist[idx-1].value;
        transactionBalanceTemp.map(t => {
          const data = new Date(t.date);
          data.setHours(data.getHours() + 3);
          const mes = data.getMonth();
          
          if(meses[mes] == el.month && mes <= mesCurrent && t.status == 1) {
            if([1,7].indexOf(t.tipoTransacao) == -1) {
              el.value -= t.value
            } else {
              el.value += t.value
            }
          }
        })
      })

      return {
        ...item,
        label: "Saldo"
      };
    }));

    splineData = [...transactionCard, ...transactionBalance]
    function fazerRequisicaoDoCartao(idCard) {
      return fetch(`http://localhost:3000/card/${idCard}`)
      .then(response => response.json())
      .then(data => {
        const { flag, valid } = data;
        return { idCard, flag, valid };
      })
      .catch(error => {
        console.log("Erro na requisição:", error);
      });
    };

    const splineCategories = splineData[0].hist.map((item) => item.month);
    const transformedData = splineData.map((item) => ({
      name: item.label,
      data: item.hist.map((histItem) => histItem.value),
    }));

    // @ts-ignore
    Highcharts.chart("spline-chart-container", {
      chart: {
        styledMode: true,
        type: "spline",
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: splineCategories,
      },
      yAxis: {
        title: {
          text: "Valor",
        },
      },
      series: transformedData,
      tooltip: {
        crosshairs: true,
        formatter: function () {
          const formattedValue = this.y.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });
          const cardName = this.series.name;
          return `Cartão: ${cardName}<br/>Mês: ${this.x}<br/>Valor: ${formattedValue}`;
        },
      },
    });
  }

  onMount(() => renderDashboard());
</script>

<div class="d-flex flex-col title-div">
  <p class="title">Bem vindo, Ali</p>
  <p class="subtitle">Tenha uma visão geral dos seu saldo e dos seus gastos</p>
</div>

<div class="container">
  <div class="item content-1">
    <div class="d-flex gap-1">
      <Total
        type="up"
        text="Saldo da Conta"
        value={balance['in']}
        percent={1.29}
        classe="w-50"
      />
      <Total
        type="down"
        text="Total de Gastos"
        value={balance['out']}
        percent={1.29}
        classe="w-50"
      />
    </div>
    <div id="spline-chart-container" />
    <Transactions transactions={sort(transactions).slice(0,3)} />
  </div>
  <div class="item content-2">
    <MyCards />
    <PixCard />
  </div>
</div>

<style lang="scss">
  @import "../../static/style.scss";

  .title-div {
    padding-bottom: 32px;
    gap: 8px;

    .title {
      color: #fff;
      font-size: 2.4rem;
      font-weight: var(--s-bold);
      line-height: 120%;
    }

    .subtitle {
      color: #a6a6a6;
      font-size: 1.6rem;
      line-height: 160%;
    }
  }
  .gap-1 {
    gap: var(--gap);
  }
  #spline-chart-container {
    position: relative;
    width: 100%;
    height: 400px;
    display: inline-block;
    background-color: var(--c-ebony-clay);
    padding-top: 10rem;
    border-radius: 2rem;

    &:before {
      content: "Análise de Dados";
      position: absolute;
      color: var(--c-white);
      font-size: 2rem;
      font-weight: var(--s-bold);
      top: 3rem;
      left: 3rem;
    }
  }

  .container {
    display: grid;
    width: calc(100vw - (33rem + var(--gap) * 3));
    height: 100vh;
    grid-template-columns: 1fr 0.5fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: var(--gap);
    grid-template-areas: "content-1 content-2";

    .item {
      padding-bottom: var(--gap);
      > div.d-flex {
        justify-content: space-between;
        article {
          width: 50vw !important;
        }
      }
    }
  }

  .content-1 {
    grid-area: content-1;
  }

  .content-2 {
    grid-area: content-2;
  }
  /* OTHER STYLES */
  .content-1,
  .content-2 {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
  }
  
  @media screen and (max-width:1745px) {
    .content-2 {
      padding-right: var(--gap);
    }
  }
</style>
