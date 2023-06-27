<script>
  import SelectCard from "../components/SelectCard.svelte";
  import { onMount } from "svelte";
  import Highcharts from "highcharts";
  import Total from "../components/Total.svelte";
  import PixCard from "../components/PixCard.svelte";
    import MyCardCard from "../components/MyCardCard.svelte";

  onMount(() => {
    const splineData = [
      {
        card: "MasterCard",
        hist: [
          { month: "Janeiro", value: 1000 },
          { month: "Fevereiro", value: 1500 },
          { month: "Março", value: 800 },
          { month: "Abril", value: 1200 },
          { month: "Maio", value: 900 },
          { month: "Junho", value: 1600 },
          { month: "Julho", value: 1100 },
          { month: "Agosto", value: 1300 },
          { month: "Setembro", value: 750 },
          { month: "Outubro", value: 1400 },
          { month: "Novembro", value: 950 },
          { month: "Dezembro", value: 1800 },
        ],
      },
      {
        card: "Visa",
        hist: [
          { month: "Janeiro", value: 100 },
          { month: "Fevereiro", value: 150 },
          { month: "Março", value: 80 },
          { month: "Abril", value: 120 },
          { month: "Maio", value: 90 },
          { month: "Junho", value: 160 },
          { month: "Julho", value: 110 },
          { month: "Agosto", value: 130 },
          { month: "Setembro", value: 75 },
          { month: "Outubro", value: 140 },
          { month: "Novembro", value: 95 },
          { month: "Dezembro", value: 180 },
        ],
      },
    ];

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
  <p class="title">Bem vindo,  Ali</p>
  <p class="subtitle">Tenha uma visão geral dos seu saldo e dos seus gastos</p>
</div>

<div class="container">
  <div class="item content-1">
    <div class="d-flex gap-1">
      <Total type="up" text="Saldo da Conta" value={632.0} percent={1.29} classe="w-50" />
      <Total type="down" text="Total de Gastos" value={632.0} percent={1.29} classe="w-50" />
    </div>
    <div id="spline-chart-container" />
  </div>
  <div class="item content-2">
    <MyCardCard />
    <PixCard />
  </div>
</div>

<style lang="scss">
  @import "../../static/style.scss";

  .title-div{
    padding-bottom: 32px;
    gap: 8px;

    .title{
      color: #FFF;
      font-size: 2.4rem;
      font-weight: var(--s-bold);
      line-height: 120%;
    }

    .subtitle{
      color: #A6A6A6;
      font-size: 1.6rem;  
      line-height: 160%;
    }
  }
  .gap-1 {
    gap: var(--gap);;
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
      content: 'Análise de Dados';
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
    gap: var(--gap);;
  }
</style>
