<script lang="ts">
  import SvgIcon from '@jamescoyle/svelte-icon';

  export let icon: string; // string type icon
  export let classe: string = '';
  export let title: string = '';
</script>

<div class={classe}>
  <SvgIcon type="mdi" path={icon}></SvgIcon>
  <span>
    {title}
  </span>
</div>

<style type="text/scss" lang="scss">
  @import "../../../static/style.scss";
  div {
    padding: 1.45rem 2.45rem;
    font-size: 1.6rem;
    width: 26.3rem;
    height: 5.7rem;
    color: var(--c-white);
    border-radius: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    
    span {
      margin-left: 1.4rem;
      font-weight: var(--s-regular);
    }
    
    &:hover {
      background-color: var(--c-palatinate-blue);
    }
    &.selected {
      background-color: var(--c-purple-blue);
      span {
        font-weight: var(--s-semi-bold);
      }
    }
  }
</style>