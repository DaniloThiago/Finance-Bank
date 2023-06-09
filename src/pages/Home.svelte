<script>
  import { menuItems } from '../data/menu';
  import Menu from '../components/Menu.svelte';

  let activeMenu = parseInt(localStorage.getItem('activeMenu')) || 0; 

  function setActiveMenu(index) {
    activeMenu = index;
    localStorage.setItem('activeMenu', index)
  }
</script>

<!-- Navbar -->
<nav class="d-flex flex-col justify-start">
  <article class="d-flex align-center">
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

<!-- Current Component -->
<section>
  {#each menuItems as item, index}
  {#if activeMenu === index}
    <svelte:component this={item.component} />
  {/if}
{/each}
</section>

<style type="text/scss" lang="scss">
  nav {
    $ml: 2.9rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 32rem;
    height: 100vh;
    background-color: var(--c-ebony-clay);
    gap: var(--gap);
    overflow: auto;

    article {
      color: var(--c-white);
      margin: 5.8rem 0;
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
      gap: var(--gap);
      padding-bottom: var(--gap);
      margin-left: $ml;
    }
  }

  section {
    padding: var(--gap) 0 0 calc(33rem + var(--gap));
    height: 100vh;
    box-sizing: border-box;
  }
</style>