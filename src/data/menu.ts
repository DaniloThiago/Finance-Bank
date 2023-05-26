// menu.ts

interface MenuItem {
  description: string;
  icon: string;
}

export const menuItems: MenuItem[] = [
  { description: "Dashboard", icon: "dashboard" },
  { description: "Analytics", icon: "analytics" },
  { description: "My Wallet", icon: "wallet" },
];
