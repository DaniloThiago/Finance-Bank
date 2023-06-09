<script>
  import { onMount } from "svelte";
  import Highcharts from "highcharts";

  onMount(() => {
    const splineData = [
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
    ];

    const splineCategories = splineData.map((item) => item.month);
    const splineValues = splineData.map((item) => item.value);

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
        text: "Gastos de Cartão de Crédito",
      },
      subtitle: {
            useHTML: true,
            text: '<img src="https://www.highcharts.com/samples/graphics/sun.png"> </img>',
            floating: true,
            verticalAlign: 'middle',
            y: 0
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
          gapUnit: 'value',
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
          type: 'pie',
          name: "Categorias",
          data: pieData,
          showInLegend: true,
        },
      ],
    });
  });
</script>

<div id="spline-chart-container" />
<div id="pie-chart-container" />

<style>
  #spline-chart-container,
  #pie-chart-container {
    width: 100%;
    height: 400px;
    display: inline-block;
  }
</style>
