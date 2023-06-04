import type { SvelteComponent } from 'svelte';

interface MenuItem {
  description: string;
  icon: string;
  active: boolean;
  component: typeof SvelteComponent;
}

import Dashboard from '../pages/Dashboard.svelte';
import Analytics from '../pages/Analytics.svelte';
import Wallet from '../pages/Wallet.svelte';

export const menuItems: MenuItem[] = [
  { description: 'Dashboard', icon: 'dashboard', active: true, component: Dashboard },
  { description: 'Analytics', icon: 'analytics', active: false, component: Analytics },
  { description: 'My Wallet', icon: 'wallet', active: false, component: Wallet },
];
