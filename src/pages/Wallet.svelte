<script lang="ts">
  import NewCard from "../components/NewCard.svelte";
  import SelectCard from "../components/SelectCard.svelte";
</script>

<div class="d-flex flex-col title-div">
  <p class="title">Meus Cartões</p>
  <p class="subtitle">
    Gerencie seus cartões, podendo excluir ou adicionar novos
  </p>
</div>

<div class="content d-flex flex-col align-center">
  <div class="d-flex justify-between w-100">
    <p class="title">Cartões Físicos</p>
    <NewCard />
  </div>
  <SelectCard />
</div>
<div class="content d-flex flex-col align-center">
  <div class="d-flex justify-between w-100">
    <p class="title">Cartões Virtuais</p>
    <NewCard is_virtual={true} />
  </div>
  <SelectCard is_virtual={true} />
</div>

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

  .content {
    padding: 2.8rem 2.4rem;
    gap: 4rem;
    border-radius: 2rem;
    background: var(--c-ebony-clay);
    gap: 4rem;
    margin-bottom: 5.4rem;
    width: calc(100vw - (33rem + var(--gap) * 3));

    div {
      .title {
        color: var(--c-white);
        font-size: 2rem;
        font-weight: var(--s-bold);
        line-height: 120%;
      }
    }
  }
</style>
