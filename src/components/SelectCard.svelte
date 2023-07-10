<script lang="ts">
  import Card from './Card.svelte'
  import VirtualCard from './VirtualCard.svelte'

  let cartoes = [
    { value: 5750.2, number: 5282345678901289, exp: '09/25', flag: 'visa' },
    { value: 7360.59, number: 1289528234567890, exp: '08/25', flag: 'mast' },
    { value: 3233.9, number: 7890128952823456, exp: '10/25', flag: 'visa' },
    { value: 0, number: 7890128952823456, exp: '10/25', flag: 'mast' },
  ];

  let virtuais = [
    {value: 0,  number: 34534468789873245},
    {value: 1000,  number: 52823456712312313},
    {value: 30000,  number: 78901289598645649},
    {value: 10,  number: 23131311312313231},
    {value: 30,  number: 53453454365676828},
  ];

  let indiceAtual = 0;
  
  function anterior() {
    indiceAtual = (indiceAtual - 1 + cartoes.length) % cartoes.length;
    if (is_virtual) indiceAtual = (indiceAtual - 1 + virtuais.length) % virtuais.length;
  }
  
  function proximo() {
    indiceAtual = (indiceAtual + 1) % cartoes.length;
    if (is_virtual) indiceAtual = (indiceAtual + 1) % virtuais.length;
  }

  function getIndicesExibicao(idx) {
    const indices = [];
    for (let i = 0; i < quantidadeExibida; i++) {
      if (is_virtual){
        indices.push(virtuais[(idx + i) % virtuais.length]);
      }else{
        indices.push(cartoes[(idx + i) % cartoes.length]);
      }
    }
    return indices;
  }
  export let quantidadeExibida = 3;
  export let is_virtual : boolean = false;

</script>

<article class="d-flex align-center justify-between">
  <button on:click={anterior}>
    <img src="./src/assets/icons/arrow.svg" alt="Anterior">
  </button>
  <section>
    {#each getIndicesExibicao(indiceAtual) as card}
      {#if is_virtual}
        <VirtualCard info={card}></VirtualCard>
      {:else}
        <Card info={card}></Card>
      {/if}
    {/each}
  </section>
  <button on:click={proximo}>
    <img src="./src/assets/icons/arrow.svg" alt="próximo">
  </button>
</article>


<style lang="scss">
  article {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: fit-content;
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