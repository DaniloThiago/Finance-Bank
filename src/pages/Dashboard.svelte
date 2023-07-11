<script lang="ts">
  import { onMount } from "svelte";
  import Highcharts from "highcharts";
  import Total from "../components/Total.svelte";
  import PixCard from "../components/PixCard.svelte";
  import MyCards from "../components/MyCards.svelte";
  import Transactions from "../components/Transactions.svelte";
  import { type TransactionItem } from "../interfaces/TransactionItem.interface";
  import type Card from "../interfaces/Card.interface";

  onMount(async () => {
    let splineData;
    let dados: TransactionItem[] = [];
    const response = await fetch("http://localhost:3000/transaction");
    const jsonData = await response.json();
    dados = jsonData;

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

    const obterSomatorioPorMes = (dados, ano) => {
      const resultado = {};

      dados.forEach(obj => {
        const data = new Date(obj.date);
        const objAno = data.getFullYear();
        const mes = data.getMonth();
        const valor = obj.value;

        if (objAno === ano) {
          const cardId = obj.idCard;

          if (!resultado[cardId]) {
            resultado[cardId] = {
              card: obj.idCard,
              hist: Array.from({ length: 12 }, (_, i) => ({ month: meses[i], value: 0 }))
            };
          }

          resultado[cardId].hist[mes].month = meses[mes];
          resultado[cardId].hist[mes].value += valor;
        }
      });

      return Object.values(resultado);
    };

    const anoDesejado = 2023;
    const resultado = obterSomatorioPorMes(dados, anoDesejado);
    console.log(resultado);

    splineData = await Promise.all(resultado.map(async (item: any) => {
      const response: any = await fazerRequisicaoDoCartao(item.card); // Substitua pela sua lógica de requisição
      const flagValid = response.flag.charAt(0).toUpperCase() + response.flag.slice(1) + ' ' + response.valid; // Concatenação dos campos flag e valid

      return {
        ...item,
        card: flagValid
      };
    }));

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
      name: item.card,
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
  });
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
        value={632.0}
        percent={1.29}
        classe="w-50"
      />
      <Total
        type="down"
        text="Total de Gastos"
        value={632.0}
        percent={1.29}
        classe="w-50"
      />
    </div>
    <div id="spline-chart-container" />
    <Transactions qtd_maxima={3} />
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
</style>
