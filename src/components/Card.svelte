<script lang="ts">
  import { onMount } from "svelte";

  export let card: card;

  interface card {
    id: number;
    valid: string;
    number: number;
    flag: string;
  }

  interface transition {
    id: number;
    idCard: number;
    date: string;
    description: string;
    tipoTransacao: number;
    categoriaGasto: number;
    value: number;
    status: number;
  }
  

  let transactions: transition[] = [];
  let isLoading = true;

  const cardId = card.id; // ID do cartão específico
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  let totalValue = 0;
  
  onMount(async () => {
    try {
      const url = `http://localhost:3000/transaction/?idCard=${cardId}&date_like=2020-${currentMonth}-`;
      const response = await fetch(url);
      const jsonData = await response.json();
      transactions = jsonData;
      isLoading = false;

      totalValue = transactions.reduce((accumulator, transaction) => {
        return accumulator + transaction.value;
      }, 0);
      
      console.log(transactions);
    } catch (error) {
      console.error(error);
      isLoading = false;
    }
  });

  let img_alt = '';
  $ : img_alt = card.flag == 'visa'? 'visa' : 'mastercard';
</script>

<article class="d-flex justify-evenly" style="{img_alt == 'visa' ? 'background: var(--g-visa)' : ''}">
  <div class="left d-flex justify-between flex-col">
    <span class="title">Fatura do Cartão</span>
    <span class="value">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
    <span class="number">
      {card.number.toString().match(/.{1,4}/g).join(' ')}
    </span>
  </div>
  <div class="right d-flex justify-between flex-col align-center">
    <img class="logo" src="./src/assets/logo/{img_alt}.svg" alt="{img_alt}">
    <span class="valid">
      {card.valid}
    </span>
  </div>
</article>

<style type="text/scss" lang="scss">
  @import "../../static/style.scss";
  article {
    position: relative;
    width: 32.6rem;
    height: 18.4rem;
    overflow: hidden;
    background: var(--c-jasmine-purple);
    background: var(--g-master);
    border-radius: 2rem;

    .right, .left {
      font-size: 1.4rem;
      font-weight: 500;
      color: var(--c-white);
      padding: 4rem 0;
      span.title {
        opacity: .54;
      }
      
      span.value {
        margin-top: -2rem;
        font-size: 2.8rem;
      }
      span.number {
        opacity: .7;
      }

      img.logo {
        width: 4.6rem;
      }
    }
    .left {
      width: 20rem;
    }
    &:after,
    &:before {
      content: "";
      display: block;
      position: absolute;
      width: 33.2rem;
      height: 22.6rem;
      background-color: var(--c-black);
      opacity: 0.1;
      border-radius: 100%;
      z-index: 0;
    }

    &:after {
      top: -14.2rem;
      left: 13.5rem;
    }

    &:before {
      top: 10rem;
      left: -13.5rem;
    }
  }
</style>