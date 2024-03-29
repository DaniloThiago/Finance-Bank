<script lang="ts">
  import Modal from "./Modal.svelte";
  import { requestSignal, requestSignalInsert } from '../store/store';

  let modal_toggle: boolean = false;
  let modal_toggle_pix: boolean = false;
  let base64Image: string = '';

  const handlerCodePix = async () => {
    modal_toggle = true;
    modal_toggle_pix = true;
    base64Image = '';
    valuePix = '';
  }

  const createCode = async () => {
    const data = {
      nome: 'Danilo Thiago Alves de Oliveira',
      cidade: 'Natal',
      chave: chavePIX.trim(),
      valor: valuePix,
      saida: 'qr'
    }

    const queryString = new URLSearchParams(data).toString();
    base64Image = `https://gerarqrcodepix.com.br/api/v1?${queryString}`;

    try {
      const responseGetBalance = await fetch("http://localhost:3000/balance");
      const balance = await responseGetBalance.json();
      
      const dataPix = {
        idCard: 0,
        date: getDate(),
        description: 'Recebimento via PIX',
        tipoTransacao: 1, // RECEBIMENTO PIX
        value: valuePix,
        status: 1
      };

      const responseTransaction = await fetch('http://localhost:3000/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPix),
      });

      if(responseTransaction.ok) {
        requestSignalInsert.set({status: true, element: dataPix});
        const transaction = await responseTransaction.json();
        const data = { in: balance.in + transaction.value };

        const responsePatchBalance = await fetch('http://localhost:3000/balance', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });


        if (responsePatchBalance.ok) {
          requestSignal.set(true);
        } else {
          console.error('Falha na solicitação:', responsePatchBalance.status);
        }
      } 
    } catch (error) {
      console.log('Erro na solicitação:', error);
    }
  }

  const handleNewCard = () => {
    modal_toggle = true;
  };

  let chavePIX = '';
  let valuePix = null;
  let descricaoPix = '';
  let isChavePIXValid = true;
  let isValuePixValid = true;
  let isDescricaoPixValid = true;

  async function validateTransaction() {
    isValuePixValid = true;
    isChavePIXValid = true;
    isDescricaoPixValid = true;
    
    if(modal_toggle_pix) {
      if (chavePIX.trim() === '') {
        isChavePIXValid = false;
      }

      if (valuePix <= 0) {
        isValuePixValid = false;
      }
    } else {
      if (chavePIX.trim() === '') {
        isChavePIXValid = false;
      }
  
      if (valuePix <= 0) {
        isValuePixValid = false;
      }
  
      if (descricaoPix.trim() === '') {
        isDescricaoPixValid = false;
      }
    }

    if (!isChavePIXValid || !isValuePixValid || !isDescricaoPixValid) {
      alert('Por favor, preencha o campo sinalizado');
      return;
    }

    if(modal_toggle_pix) return createCode();

    
    try {
      const responseGetBalance = await fetch("http://localhost:3000/balance");
      const balance = await responseGetBalance.json();
      
      if(valuePix > balance.in) return alert('Sem saldo em conta!')

      const data = {
        idCard: 0,
        date: getDate(),
        description: descricaoPix.trim(),
        tipoTransacao: 2, // PAGAMENTO PIX
        value: valuePix,
        status: 1
      };

      const responseTransaction = await fetch('http://localhost:3000/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if(responseTransaction.ok) {
        const transaction = await responseTransaction.json();

        const data = {
          in: balance.in - transaction.value,
          out: balance.out + transaction.value
        };
        const responsePatchBalance = await fetch('http://localhost:3000/balance', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (responsePatchBalance.ok) {
          requestSignal.set(true);
        } else {
          console.error('Falha na solicitação:', responsePatchBalance.status);
        }
      } 
    } catch (error) {
      console.log('Erro na solicitação:', error);
    }

    clearPix();
  }

  function clearPix() {
    chavePIX = '';
    valuePix = '';
    descricaoPix = '';
    base64Image = '';
    isChavePIXValid = true;
    isValuePixValid = true;
    isDescricaoPixValid = true;
    
    modal_toggle = false;
    modal_toggle_pix = false;
  }

  function getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  </script>

<div class="d-flex flex-col pix-card">
  <span class="h4">Pague com o Pix</span>
  <span class="texto-corrido-medio"
    >Pague suas contas com praticidade ou gere códigos para realizar cobranças</span
  >
  <div class="d-flex flex-col">
    <button class="btn-primary" on:click={handleNewCard}>Pagar com pix</button>
    <button class="btn-secondary d-flex align-center justify-center" on:click={handlerCodePix}>
      Gerar código
      <img src="./src/assets/icons/trending_flat.svg" alt="" />
    </button>
  </div>
</div>

<Modal {modal_toggle} size="lg">
  <section id="modal-pix">
    <button id="close-modal-pix" on:click={() => {
      clearPix();
    }}>
      <img src="./src/assets/icons/clear.svg" alt="Clear">
    </button>
    
    {#if modal_toggle && !modal_toggle_pix}
    <img src="./src/assets/icons/pix.svg" alt="PIX" />
    {:else}
    
      {#if base64Image != ''}
        <img src={base64Image} class="pix" alt="Imagem Base64">
      {/if}
    {/if}

    <div>
      {#if modal_toggle || modal_toggle_pix}
        <span id="ctChavePIX" class:invalid={!isChavePIXValid}>
          <label for="ChavePIX">Chave PIX:</label>
          <input type="text" id="ChavePIX" bind:value={chavePIX}>
        </span>
      {/if}

      {#if modal_toggle_pix || modal_toggle}
        <span id="ctValuePix" class:invalid={!isValuePixValid}>
          <label for="ValuePix">VALOR:</label>
          <input type="number" name="value" id="ValuePix" bind:value={valuePix}>
        </span>
      {/if}

      {#if modal_toggle && !modal_toggle_pix}
      <span id="ctDescricaoPix" class:invalid={!isDescricaoPixValid}>
        <label for="DescricaoPix">DESCRIÇÃO:</label>
        <input type="text" name="descricao" id="DescricaoPix" bind:value={descricaoPix}>
      </span>
      {/if}
      
      <button
      class="w-100 btn-primary"
      on:click={() => validateTransaction()}>
        {#if modal_toggle && modal_toggle_pix}
          SOLICITAR
        {:else}
          PAGAR
        {/if}
      </button>
    </div>
  </section>
</Modal>

<style type="text/scss" lang="scss">
  @import "../../static/style.scss";

  #modal-pix {
    .invalid {
      label {
        color: var(--c-lava-red)
      }
      input {
        color: var(--c-white);
        border: 1px solid var(--c-lava-red);
        background-color: var(--c-lava-red);
      }
    }
    #close-modal-pix {
      top: 0;
      left: 0;
      color: var(--c-white);
      background-color: var(--c-lava-red);
      width: 3rem;
      height: 3rem;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      cursor: pointer;
      border: none;

      img {
        width: 2rem;
      }
    }

    display: flex;
    > img {
      width: 20%;
      margin-right: 2rem;
      &.pix {
        width: 256px;
      }
    }
    button {
      cursor: pointer;
    }
    > div {
      color: var(--c-white);
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--gap);
      
      span {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: calc(var(--gap) / 10);
        width: 100%;

        input {
          height: 3rem;
          padding: 0 1rem;
        }
      }
    }
  }

  .btn-primary {
    cursor: pointer;
    z-index: 1;
    border-radius: 10px;
    padding: 13.5px 10px;
    background-color: var(--c-purple-blue);
    border: none;

    color: var(--c-white);
    font-size: 14px;
    font-weight: 500;
    line-height: 120%;
  }
  .pix-card {
    background-color: var(--c-ebony-clay);
    gap: 42px;
    border-radius: 20px;
    padding: 32px;
    position: relative;
    overflow: hidden;

    .h4 {
      z-index: 1;
      color: var(--c-white);
      font-size: 24px;
      font-weight: 600;
      line-height: 120%;
    }

    .texto-corrido-medio {
      z-index: 1;
      color: #a6a6a6;
      font-size: 16px;
      font-weight: 500;
      line-height: 160%;
    }

    div {
      gap: 16px;
      padding: 0;

      .btn-secondary {
        z-index: 1;
        border-radius: 10px;
        padding: 13.5px 10px;
        border: 1px solid var(--c-white);
        background-color: transparent;
        gap: 16px;

        color: var(--c-white);
        font-size: 14px;
        font-weight: 500;
        line-height: 120%;
      }
    }

    &:before {
      content: "";
      display: block;
      position: absolute;
      z-index: 0;
      opacity: 0.04;
      background-image: url("../assets/logo/pix.svg");
      background-size: 250px;
      background-repeat: no-repeat;
      width: 250px;
      height: 250px;

      top: -3.5rem;
      right: -8rem;
    }
    
  }
</style>
