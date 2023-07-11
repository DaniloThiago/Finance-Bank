<script lang="ts">
  export let modal_toggle: boolean = false;
</script>

{#if modal_toggle}
  <div class="modal d-flex flex-col align-center justify-center w-100">
    <div class="modal--content d-flex flex-col align-center">
      <slot />
    </div>
  </div>
{/if}

<style lang="scss">
  .modal {
    position: absolute;
    z-index: 1000;
    left: 0;
    top: 0;
    height: 100vh;
    background-color: #1d1d4166;

    .modal--content {
      width: 414px;
      padding: 24px 32px 40px 32px;
      gap: 40px;
      border-radius: 1rem;
      background: var(--c-haiti);
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }
  }
</style>
