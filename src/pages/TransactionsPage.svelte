<script>
    import PixCard from "../components/PixCard.svelte";
    import MyCards from "../components/MyCards.svelte";
    import Transactions from "../components/Transactions.svelte";
  </script>
  
  <div class="d-flex flex-col title-div">
    <p class="title">Transações</p>
    <p class="subtitle">Acompanhe o histórico de transções realizados na sua conta</p>
  </div>
  
  <div class="container">
    <div class="item content-1">
      <Transactions />
    </div>
    <div class="item content-2">
      <MyCards />
      <PixCard />
    </div>
  </div>
  
  <style lang="scss">
    @import "../../static/style.scss";
  
    .title-div{
      padding-bottom: 32px;
      gap: 8px;
  
      .title{
        color: var(--c-white);
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
  