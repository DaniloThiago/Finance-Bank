<script lang="ts">
  import Card from './Card.svelte'

  let cartoes = [
    { value: 5750.2, number: 5282345678901289, exp: '09/25', flag: 'visa' },
    { value: 7360.59, number: 1289528234567890, exp: '08/25', flag: 'mast' },
    { value: 3233.9, number: 7890128952823456, exp: '10/25', flag: 'visa' },
    { value: 0, number: 7890128952823456, exp: '10/25', flag: 'mast' },
  ];

  let indiceAtual = 0;
  
  function anterior() {
    indiceAtual = (indiceAtual - 1 + cartoes.length) % cartoes.length;
  }
  
  function proximo() {
    indiceAtual = (indiceAtual + 1) % cartoes.length;
  }

  function getIndicesExibicao(idx) {
    const indices = [];
    for (let i = 0; i < quantidadeExibida; i++) {
      indices.push(cartoes[(idx + i) % cartoes.length]);
    }
    return indices;
  }
  export let quantidadeExibida = 3;
</script>

<article>
  <button on:click={anterior}>
    <img src="./src/assets/icons/arrow.svg" alt="Anterior">
  </button>
  <section class="d-flex align-center justify-center">
    {#each getIndicesExibicao(indiceAtual) as card}
      <Card info={card}></Card>
    {/each}
  </section>
  <button on:click={proximo}>
    <img src="./src/assets/icons/arrow.svg" alt="Próximo">
  </button>
</article>


<style lang="scss">
  article {
    display: flex;
    justify-content: space-between;

    section {
      gap: var(--gap);;
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