<script lang="ts">
  import { onMount } from "svelte";
  import TransactionItem from "./TransactionItem.svelte";

  let transactions = [];
  export let qtd_maxima: number = -1;

  async function fetchTransactions() {
    try {
      const response = await fetch("http://localhost:3000/transaction");
      transactions = await response.json();

      qtd_maxima = qtd_maxima == -1 ? transactions.length : qtd_maxima;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  onMount(fetchTransactions);
</script>

<table>
  <thead>
    <tr>
      <td colspan="4"> Últimas Transações </td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Data</th>
      <th>Descrição</th>
      <th>Status</th>
      <th>Valor</th>
    </tr>
    {#each transactions as transaction, index}
      {#if index < qtd_maxima}
        <TransactionItem props={transaction} />
      {/if}
    {/each}
  </tbody>
</table>

<style type="text/scss" lang="scss">
  table {
    background-color: var(--c-ebony-clay);
    padding: 1rem 2.4rem;
    border-radius: 2rem;
    border-spacing: 0 1.8rem;

    thead {
      tr {
        td {
          font-size: 2rem;
          font-weight: var(--s-bold);
          color: var(--c-white);
          line-height: 120%;
          padding-bottom: 22px;
        }
      }
    }

    tbody {
      tr {
        th {
          color: #aeabd8;
          font-size: 1.2rem;
          font-weight: var(--s-regular);
          text-align: left;
        }
      }
    }
  }
</style>
