<script lang="ts">
  export let info: data;

  interface data {
    value: number;
    exp: string;
    number: number;
    flag: string;
  }
</script>

<article class="d-flex justify-evenly">
  <div class="left d-flex justify-between flex-col">
    <span class="title">Fatura do Cartão</span>
    <span class="value">R$ {info.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
    <span class="number">
      {info.number.toString().match(/.{1,4}/g).join(' ')}
    </span>
  </div>
  <div class="right d-flex justify-between flex-col align-center">
    <img class="logo" src="./src/assets/logo/mastercard.svg" alt="mastercard">
    <span class="exp">
      {info.exp}
    </span>
  </div>
</article>

<style type="text/scss" lang="scss">
  @import "./static/style.scss";
  article {
    position: relative;
    width: 32.6rem;
    height: 18.4rem;
    overflow: hidden;
    background: var(--c-jasmine-purple);
    background: var(--g-master);
    border-radius: 2rem;

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