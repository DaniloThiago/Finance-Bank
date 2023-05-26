<script>
  import { menuItems } from '../data/menu';
  import Menu from '../components/Menu.svelte';

  let activeMenu = 0; // Índice do menu ativo inicialmente

  function setActiveMenu(index) {
    activeMenu = index;
  }
</script>

<nav class="d-flex flex-col justify-start">
  <article class="d-flex aligin-center">
    <img src="./src/assets/logo.svg" alt="logo">
    <abbr>
      FB
      <sup>TM</sup>
    </abbr>
  </article>
  <div id="menus" class="d-flex flex-col">
    {#each menuItems as item, index}
      <Menu
        title={item.description}
        icon={item.icon}
        active={activeMenu === index}
        on:click={() => setActiveMenu(index)}
      />
    {/each}
  </div>
</nav>

<style type="text/scss" lang="scss">
  nav {
    $ml: 2.9rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 32rem;
    height: 100vh;
    background-color: var(--c-ebony-clay);
    padding: 1rem;
    gap: 1rem;

    article {
      color: var(--c-white);
      margin: 6rem 0;
      margin-left: $ml;
      img {
        width: 4.3rem;
        height: 5.2rem;
      }
      abbr {
        $size: 3.2rem;
        position: relative;
        font-size: calc(#{$size} + 1.3rem);
        line-height: $size;
        font-family: var(--font-family);
        font-weight: var(--s-semi-bold);
        margin-left: 2.5rem;
        sup {
          $size: 0.7rem;
          position: absolute;
          font-size: calc(#{$size} + 0.3rem);
          line-height: $size;
          top: 0;
        }
      }
    }
    #menus {
      height: 100%;
      gap: 1rem;
      margin-left: $ml;
    }
  }
</style>
