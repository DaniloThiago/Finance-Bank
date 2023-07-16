<script lang="ts">
  import type CardInterface from "../interfaces/Card.interface";
  export let card: any;

  let img_alt = '';
  $ : img_alt = card.flag == 'visa'? 'visa' : 'mastercard';
</script>

<article class="d-flex justify-evenly" style="{img_alt == 'visa' ? 'background: var(--g-visa)' : ''}">
  <div class="left d-flex justify-between flex-col">
    <span class="title">Fatura do Cartão</span>
    <span class="value">R$ {card.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
    min-width: 34.6rem;
    height: 18.4rem;
    overflow: hidden;
    background: var(--c-jasmine-purple);
    background: var(--g-master);
    border-radius: 2rem;
    margin-bottom: 2.8rem;

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