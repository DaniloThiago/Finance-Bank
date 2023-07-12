import type { SvelteComponent } from 'svelte';

export default interface MenuItemInterface {
  description: string;
  icon: string;
  active: boolean;
  component: typeof SvelteComponent;
}