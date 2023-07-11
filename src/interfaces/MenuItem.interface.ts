import type { SvelteComponent } from 'svelte';

export default interface MenuItem {
  description: string;
  icon: string;
  active: boolean;
  component: typeof SvelteComponent;
}