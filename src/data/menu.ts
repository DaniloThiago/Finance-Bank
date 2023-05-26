// menu.ts

interface MenuItem {
  description: string;
  icon: string;
  active: boolean;
}

export const menuItems: MenuItem[] = [
  { description: "Dashboard", icon: "dashboard", active: true },
  { description: "Analytics", icon: "analytics", active: false },
  { description: "My Wallet", icon: "wallet", active: false },
];
