import { Option } from "~/components/ui/multi-select";

export const NAV_LINKS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    logo: "/dashboard.svg",
  },
  {
    to: "/publishing",
    label: "Publishing",
    logo: "/publishing.svg",
  },
  {
    to: "/my-models",
    label: "My Model",
    logo: "/my-model.svg",
  },
  {
    to: "/my-sales",
    label: "My Sale",
    logo: "/my-sale.svg",
  },
  {
    to: "/profile",
    label: "Profile",
    logo: "/my-sale.svg",
  },
] as const;

export const OPTIONS = [
  {
    label: "Arts",
    value: "arts",
  },
  {
    label: "Music",
    value: "music",
  },
  {
    label: "Gaming",
    value: "gaming",
  },
  {
    label: "Education",
    value: "education",
  },
  {
    label: "Sports",
    value: "sports",
  },
  {
    label: "Business",
    value: "business",
  },
  {
    label: "Food",
    value: "food",
  },
  {
    label: "Travel",
    value: "travel",
  },
] as Option[];

export const CURRENCIES = [
  {
    value: "USD",
    label: "USD ($)",
  },
  {
    value: "IDR",
    label: "IDR (Rp)",
  },
  {
    value: "EUR",
    label: "EUR (€)",
  },
  {
    value: "GBP",
    label: "GBP (£)",
  },
  {
    value: "JPY",
    label: "JPY (¥)",
  },
  {
    value: "CAD",
    label: "CAD (C$)",
  },
  {
    value: "AUD",
    label: "AUD (A$)",
  },
] as const;
