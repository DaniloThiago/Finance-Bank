<script lang="ts">
  import { format } from "date-fns";
  import ptBR from "date-fns/locale/pt-BR";
  import { type TransactionItemInterface } from "../interfaces/TransactionItem.interface";

  export let props: TransactionItemInterface;

  const tiposTransacao = {
    1: "RECEBIMENTO PIX",
    2: "PAGAMENTO PIX",
    3: "TRANSFERÊNCIA BANCÁRIA",
    4: "PAGAMENTO BOLETO",
    5: "CARTÃO DE CRÉDITO",
    6: "PAGAMENTO DE FATURA",
    7: "DEPÓSITO BANCÁRIO",
  }
  
  const tipoTransacao = tiposTransacao[props.tipoTransacao];

  const status = props.status == 1 ? "done" : "clear";
  const DC = [1,7].indexOf(props.tipoTransacao) == -1 ? "D" : "C";

  const year = props.date.substring(0, 4);
  const monthName = format(
    new Date(0, +props.date.substring(5, 7) - 1),
    "LLL",
    { locale: ptBR }
  );
  const day = props.date.substring(8, 10);
</script>

<tr>
  <td
    ><p>{day}</p>
    <p>{monthName}</p>
    <p>{year}</p></td
  >
  <td>
    <p>{props.description}</p>
    <p class="subtitle">{tipoTransacao}</p>
  </td>
  <td>
    <div class="d-flex justify-center {status}">
      <img src="../src/assets/icons/{status}.svg" alt={status} width="12" />
    </div>
  </td>
  <td class="type-{DC}">{DC == "D" ? '-' : ''} R${props.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
</tr>

<style type="text/scss" lang="scss">
  tr {
    td {
      color: var(--c-white);
      font-size: 1.4rem;
      font-weight: var(--s-regular);

      p:nth-child(2) {
        text-transform: uppercase;
        font-size: 1rem;
      }
      .subtitle {
        color: var(--c-wild-blue-yonder);
      }
      p:nth-child(3) {
        font-size: 0.7rem;
      }

      div {
        padding: 0.2rem;
        border-radius: 1rem;
        width: 16px;
        height: 16px;
      }

      .done {
        background: var(--c-green-haze);
      }

      .clear {
        background: var(--c-lava-red);
      }

      &.type-D {
        color: #c94747
      }
      &.type-C {
        color: #8fb51f
      }
    }
  }
</style>
