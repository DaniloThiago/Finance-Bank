<script lang="ts">
  let cartoes = [
    { nome: 'Cartão 1', valor: 30 },
    { nome: 'Cartão 2', valor: 35 },
    { nome: 'Cartão 3', valor: 28 },
    { nome: 'Cartão 4', valor: 42 },
    { nome: 'Cartão 5', valor: 33 },
    { nome: 'Cartão 6', valor: 39 },
    { nome: 'Cartão 7', valor: 27 },
    { nome: 'Cartão 8', valor: 31 },
    { nome: 'Cartão 9', valor: 36 },
    { nome: 'Cartão 10', valor: 29 },
    { nome: 'Cartão 11', valor: 41 },
    { nome: 'Cartão 12', valor: 34 },
    { nome: 'Cartão 13', valor: 40 },
    { nome: 'Cartão 14', valor: 37 }
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

<style>
  article {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  button {
    cursor: pointer;
    font-size: 4rem;
  }

  .card {
    border: 1px solid gray;
    padding: 10px;
    color: #fff;
    width: 100%;
  }
</style>

<article>
  <button on:click={anterior}>
    &lt;
  </button>
  {#each getIndicesExibicao(indiceAtual) as card}
    <div class="card">
      <h2>{card.nome}</h2>
      <p>Valor: {card.valor}</p>
    </div>
  {/each}
  <button on:click={proximo}>
    &gt;
  </button>
</article>
