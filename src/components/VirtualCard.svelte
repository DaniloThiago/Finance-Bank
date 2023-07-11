<script lang="ts">
  interface data {
    value: number;
    number: number;
  }

  export let info: data;
</script>

<article class="d-flex justify-evenly align-center" style="">
  <div class="left d-flex flex-col justify-center">
    <img
      class="logo"
      src="./src/assets/icons/account_balance.svg"
      alt="account_balance"
      height="50"
    />
  </div>
  <div class="vertical-line" />
  <div class="right d-flex justify-between flex-col">
    <span class="title">Fatura do Cartão</span>
    <span class="value"
      >R$ {info.value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}</span
    >
    <span class="number">
      {info.number
        .toString()
        .match(/.{1,4}/g)
        .join(" ")}
    </span>
  </div>
</article>

<style type="text/scss" lang="scss">
  @import "../../static/style.scss";
  article {
    position: relative;
    width: 32.6rem;
    height: 16rem;
    overflow: hidden;
    background: var(--g-virtual);
    border-radius: 2rem;
    padding: 2.8rem;
    gap: 32px;

    .vertical-line {
      width: 0.1rem;
      height: 100%;
      background: var(--c-white);
      opacity: 0.3;
    }

    .right,
    .left {
      font-size: 1.4rem;
      font-weight: 500;
      color: var(--c-white);
      gap: 0.8rem;
      height: 100%;

      span.title {
        font-weight: 300;
        opacity: 0.54;
      }

      span.value {
        font-size: 2.8rem;
        word-break: break-all;
      }
      span.number {
        opacity: 0.7;
        margin-top: auto;
      }

      img.logo {
        width: 4.6rem;
      }
    }
    .right {
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
