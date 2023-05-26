<script>
  import { menuItems } from '../data/menu';
  import Menu from '../components/Menu.svelte';
</script>

<nav>
  {#each menuItems as item}
    <Menu title={item.description} icon={item.icon} />
  {/each}
</nav>
