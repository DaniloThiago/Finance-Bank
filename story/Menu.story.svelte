<Hst.Story>
  <Menu title="Dashboard" classe="selected" icon={mdiViewDashboard } />
  <br>
  <Menu title="My Wallet" icon={mdiWalletBifold} />
 </Hst.Story>
 
 <script lang="ts">
  // https://pictogrammers.com/library/mdi/
  import { mdiViewDashboard, mdiWalletBifold } from '@mdi/js';
  import Menu from '../src/lib/components/Menu.svelte'
  export let Hst;
 </script>
 