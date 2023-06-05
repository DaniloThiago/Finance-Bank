<script>
  import SelectCard from "../components/SelectCard.svelte";
  import { onMount } from "svelte";
  import Highcharts from "highcharts";

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

    console.log(splineCategories);

    // @ts-ignore
    Highcharts.chart("spline-chart-container", {
      chart: {
        styledMode: true,
        type: "spline",
      },
      title: {
        text: "Gastos Cartões",
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

<div id="spline-chart-container" />
<SelectCard quantidadeExibida={3} />

<style>
  #spline-chart-container {
    width: 100%;
    height: 400px;
    display: inline-block;
  }
</style>
