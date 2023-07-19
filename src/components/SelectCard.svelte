<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import Card from "./Card.svelte";
  import VirtualCard from "./VirtualCard.svelte";
  import type CardInterface from "../interfaces/Card.interface";

  const dispatch = createEventDispatcher();

  let cards: any[];
  let isLoading = true;

  onMount(async () => {
    try {
      
      let url = "http://localhost:3000/card";
      if (is_virtual) url = "http://localhost:3000/virtual";

      const response = await fetch(url);
      const jsonData = await response.json();
      cards = jsonData;

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Formata o mês com dois dígitos

      for (const card of cards) {
        let idCard = card.id;
        if (is_virtual) idCard = card.idCard;
        const transactionUrl = `http://localhost:3000/transaction/?idCard=${idCard}&date_like=${currentYear}-${currentMonth}`;
        const transactionResponse = await fetch(transactionUrl);
        const transactionData = await transactionResponse.json();
        const totalValue = transactionData.reduce((total, transaction) => total + transaction.value, 0);
        card.value = totalValue;

        if(is_virtual){ // pega cartao fisico associado
          const url = `http://localhost:3000/card/${idCard}`;
          const response = await fetch(url);
          const jsonData : CardInterface = await response.json();
          card.associate_card = jsonData;
        }
      }

      isLoading = false;
    } catch (error) {
      console.error(error);
      isLoading = false;
    }
  });

  let indiceAtual = 0;

  function anterior() {
    indiceAtual = (indiceAtual - 1 + cards.length) % cards.length;
  }

  function proximo() {
    indiceAtual = (indiceAtual + 1) % cards.length;
  }

  function getIndicesExibicao(idx) {
    const indices = [];
    for (let i = 0; i < quantidadeExibida; i++) {
      if(i < cards.length) indices.push(cards[(idx + i) % cards.length]);
    }
    dispatch('eventIdCard', { idCard: indices[0].id });
    return indices;
  }
  export let quantidadeExibida = 3;
  export let is_virtual: boolean = false;
  export let is_edit_delete = false;
</script>

<article class="d-flex align-center justify-between w-100">
  <button on:click={anterior}>
    <img src="./src/assets/icons/arrow.svg" alt="Anterior" />
  </button>
  <section class="mw-100 overflow-auto">
    {#if isLoading}
      <p>Carregando...</p>
    {:else}
      {#each getIndicesExibicao(indiceAtual) as card}
        {#if is_virtual}
          <VirtualCard {card} {is_edit_delete} card_value={card.value} associate_card = {card.associate_card} />
        {:else}
          <Card {card} {is_edit_delete} card_value={card.value} />
        {/if}
      {/each}
    {/if}
  </section>
  <button on:click={proximo}>
    <img src="./src/assets/icons/arrow.svg" alt="próximo" />
  </button>
</article>

<style lang="scss">
  article {
    display: flex;
    align-items: center;
    justify-content: space-between;
    section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--gap);
    }
  }

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    padding: 0;

    &:first-child {
      transform: scaleX(-1);
    }

    img {
      width: 4rem;
      transition: all ease-in-out 0.2s;
    }

    &:hover {
      img {
        animation: animacao 0.8s infinite;
        position: relative;
      }
    }
  }

  @keyframes animacao {
    0% {
      transform: translateX(-0.4rem);
    }
    50% {
      transform: translateX(0rem);
    }
    100% {
      transform: translateX(-0.4rem);
    }
  }

  .card {
    border: 1px solid gray;
    padding: 10px;
    color: #fff;
    width: 100%;
  }
</style>
