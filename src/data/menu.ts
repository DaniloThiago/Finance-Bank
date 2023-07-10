import type { SvelteComponent } from 'svelte';

interface MenuItem {
  description: string;
  icon: string;
  active: boolean;
  component: typeof SvelteComponent;
}

import Dashboard from '../pages/Dashboard.svelte';
import TransactionsPage from '../pages/TransactionsPage.svelte';
import Analytics from '../pages/Analytics.svelte';
import Wallet from '../pages/Wallet.svelte';

export const menuItems: MenuItem[] = [
  { description: 'Dashboard', icon: 'dashboard', active: true, component: Dashboard },
  { description: 'Transações', icon: 'attach_money', active: false, component: TransactionsPage },
  { description: 'Análise dos Gastos', icon: 'bar_chart', active: false, component: Analytics },
  { description: 'Meus Cartões', icon: 'style', active: false, component: Wallet },
];
