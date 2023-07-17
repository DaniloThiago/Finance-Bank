<script lang="ts">
  import TransactionItem from "./TransactionItem.svelte";
  import { type TransactionItemInterface } from "../interfaces/TransactionItem.interface";

  export let transactions: TransactionItemInterface[] = [];
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
    {#each transactions as transaction}
        <TransactionItem props={transaction} />
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
