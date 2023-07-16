<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import Highcharts, { numberFormat } from "highcharts";
  import SelectCard from "../components/SelectCard.svelte";
  import { type TransactionItemInterface } from "../interfaces/TransactionItem.interface";

  let transactions: TransactionItemInterface[] = [];
  let idCard: number = -1;

  async function handleCustomEvent(event) {
    idCard = event.detail.idCard;

    if (idCard == -1) return;
    const response = await fetch(
      `http://localhost:3000/transaction/?idCard=${idCard}&date_like=2023`
    );
    const jsonData = await response.json();
    jsonData.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
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
      11: "Dezembro",
    };

    const obterSomatorioPorMes = (transactions) => {
      const resultado = {};

      transactions.forEach((obj) => {
        const data = new Date(obj.date);
        const mes = data.getMonth();
        const valor = obj.value;
        const idCard = obj.idCard;

        if (!resultado[idCard]) {
          resultado[idCard] = {
            hist: Array.from({ length: 12 }, (_, i) => ({
              month: meses[i],
              value: 0,
            })),
          };
        }

        resultado[idCard].hist[mes].month = meses[mes];
        resultado[idCard].hist[mes].value += valor;
      });

      return Object.values(resultado);
    };

    const resultado = obterSomatorioPorMes(transactions);
    const splineCategories = resultado[0]["hist"].map((item) => item.month);
    const splineValues = resultado[0]["hist"].map((item) => item.value);

    // @ts-ignore
    Highcharts.chart("spline-chart-container", {
      chart: {
        styledMode: true,
        type: "spline",
      },
      title: {
        text: "Gastos Mensais",
      },
      xAxis: {
        categories: splineCategories,
      },
      yAxis: {
        title: {
          text: "Valor",
        },
      },
      series: [
        {
          name: "Gastos",
          data: splineValues,
        },
      ],
      legend: {
        enabled: false,
      },
      tooltip: {
        formatter: function () {
          const formattedValue = this.y.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });
          return `Mês: ${this.x}<br/>Valor: ${formattedValue}`;
        },
      },
    });

    const creditCardData = [
      { category: "Restaurante", value: 25 },
      { category: "Supermercado", value: 35 },
      { category: "Roupas", value: 15 },
      { category: "Eletrônicos", value: 10 },
      { category: "Viagens", value: 15 },
    ];

    // Calcular a soma dos valores das categorias
    const totalValue = creditCardData.reduce(
      (sum, item) => sum + item.value,
      0
    );

    // Calcular a porcentagem correspondente a cada categoria
    const pieData = creditCardData.map((item) => ({
      name: item.category,
      y: (item.value / totalValue) * 100,
    }));

    // @ts-ignore
    Highcharts.chart("pie-chart-container", {
      chart: {
        styledMode: true,
        type: "pie",
      },
      title: {
        text: "Gastos por categoria",
      },
      tooltip: {
        formatter: function () {
          return `<b>${this.point.name}</b>: ${this.point.y.toFixed(1)}%`;
        },
      },
      plotOptions: {
        series: {
          borderWidth: 50,
          colorByPoint: false,
          size: "100%",
          innerSize: "60%",
          gap: 2,
          gapUnit: "value",
          dataLabels: {
            enabled: true,
            crop: true,
            distance: "-10%",
            style: {
              fontWeight: "bold",
              fontSize: "30px",
            },
            connectorWidth: 0,
          },
        },
      },
      series: [
        {
          type: "pie",
          name: "Categorias",
          data: pieData,
          showInLegend: true,
        },
      ],
    });
  }

  onMount(async () => handleCustomEvent);

</script>

<div class="d-flex flex-col title-div">
  <p class="title">Análise de Gastos</p>
  <p class="subtitle">
    Fique atualizado sobre a evolução dos gastos no seu cartão!
  </p>
</div>

<div class="container">
  <div class="content-1">
    <p>Cartão Selecionado</p>
    <SelectCard quantidadeExibida={1} on:eventIdCard={handleCustomEvent} />
  </div>
  <div class="content-2"><div class="cart" id="pie-chart-container" /></div>
</div>

<div class="cart" id="spline-chart-container" />

<style lang="scss">
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

  .container {
    display: grid;
    width: calc(100vw - (33rem + var(--gap) * 3));
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: var(--gap);
    grid-template-areas: "content-1 content-2";

    #pie-chart-container {
      width: 100%;
      height: 400px;
      display: inline-block;
      min-width: 520px;
    }
  }

  .content-1 {
    grid-area: content-1;

    p {
      color: var(--c-wild-blue-yonder);
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 160%;
    }
  }

  .cart {
    grid-area: content-2;
    padding: 2.8rem 2.4rem;
    border-radius: 2rem;
    background-color: var(--c-ebony-clay);
    margin-top: 2.8rem;
  }

  .content-2 {
    &:after {
      content: "";
      width: 9rem;
      height: 9rem;
      background-image: url("../assets/cart_figure.svg");
      background-size: contain;
      position: absolute;
    }
  }

  /* OTHER STYLES */
  .content-1,
  .content-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.8rem;
  }

  #spline-chart-container {
    width: 100%;
    height: 400px;
    display: inline-block;
  }
</style>
