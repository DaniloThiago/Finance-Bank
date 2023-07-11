import type { SvelteComponent } from 'svelte';

export default interface menuItem {
  description: string;
  icon: string;
  active: boolean;
  component: typeof SvelteComponent;
}