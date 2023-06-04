<script lang="ts">
  export let type: string = 'up';
  export let text: string = 'Total Income';
  export let value: number = 62100;
  export let percent: number = 0;
  let icon = type == 'up' ? 'trending_up' : 'trending_down';
  let color = type === 'up' ? 'green-haze' : 'lava-red';
</script>

<article>
  <div class="d-flex aligin-center justify-between">
    <span class="icon d-flex aligin-center justify-center {color}">
      <img src={`./src/assets/icons/${icon}.svg`} alt="Icon" />
    </span>
    <span>
      <p>{text}</p>
      <p>$ {value.toFixed(2)}</p>
    </span>
    <span class="icon d-flex aligin-center justify-center {color}">
      +{percent}%
    </span>
  </div>
</article>

<style type="text/scss" lang="scss">
  @import "./static/style.scss";
  article {
    padding: 3.3rem 2.7rem;
    background-color: var(--c-ebony-clay);
    border-radius: 2rem;
    height: 6rem;
    width: 26.7rem;
    box-sizing: initial;

    div {
      color: var(--c-white);

      .icon {
        background-color: var(--c-malibu);
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 1rem;
        img {
          width: 3rem;
        }
        
        &.lava-red {
          background-color: var(--c-purple-blue);
        }
      }
      span {
        &:nth-child(2) {
          p {
            &:nth-child(1) {
              color: var(--c-wild-blue-yonder);
              font-size: 1.6rem;
            }
            &:nth-child(2) {
              font-size: 2.4rem;
              font-weight: var(--s-bold);
            }
          }
        }
        &:last-child {
          width: 4.1rem;
          height: 1.5rem;
          padding: 0.4rem 1rem;
          font-size: 1.2rem;
          border-radius: 1rem;
          align-self: self-end;
          box-sizing: initial;
          margin-bottom: 0.65rem;
          &.green-haze {
            color: var(--c-green-haze);
            background-color: var(--c-green-haze-15);
          }
          &.lava-red {
            color: var(--c-lava-red);
            background-color: var(--c-lava-red-15);
          }
        }
      }
    }
  }
</style>