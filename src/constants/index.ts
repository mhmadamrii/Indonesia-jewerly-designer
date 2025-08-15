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

const purchasedAssetsData: PurchasedAsset[] = [
  {
    id: "6b2f23bf-a879-409a-83c7-9582f04e9e35",
    name: "Fortnite 3D Model",
    description: "Get 3d asset for fortnite, collect and secure your next collections",
    price: 200,
    previewUrl: "https://example.com/preview1",
    thumbnailUrl: "https://example.com/thumb1",
    downloadUrl: "https://example.com/download1",
    typeAsset: "3d-model",
    purchaseDate: "2025-08-02T07:59:31.414Z",
    artist: {
      id: "6u5qfzquMWJN8GBVjKlIUc0T9atfiw3l",
      name: "Muhammad Amri",
      email: "interceptorghost4@gmail.com",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocLlouf-XtUn7hKUzjYWVqLrsa5EYs1reM60UIu2e2H3P3HTYhQ=s96-c",
      role: "artist",
    },
    category: {
      id: "dcb1e5a2-caed-46b1-9e57-b3da86f13373",
      name: "Gaming",
      description: "Gaming related assets",
    },
  },
  {
    id: "7c3f34cf-b980-510b-94d8-0693f15f0f46",
    name: "Diamond Ring Collection",
    description: "Luxury diamond ring 3D models for jewelry visualization and e-commerce",
    price: 350,
    previewUrl: "https://example.com/preview2",
    thumbnailUrl: "https://example.com/thumb2",
    downloadUrl: "https://example.com/download2",
    typeAsset: "3d-model",
    purchaseDate: "2025-08-01T15:30:45.123Z",
    artist: {
      id: "7v6rgzrvNXKO9HCWkLmJVd1U0bugjx4m",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      image: "/placeholder.svg?height=96&width=96",
      role: "designer",
    },
    category: {
      id: "edc2f6b3-dbfe-57c2-0f68-c4eb97g24484",
      name: "Luxury",
      description: "High-end luxury items",
    },
  },
  {
    id: "8d4g45dg-c091-621c-05e9-1704g26g1g57",
    name: "Vintage Watch Collection",
    description:
      "Classic vintage watch 3D models with intricate details and realistic materials",
    price: 275,
    previewUrl: "https://example.com/preview3",
    thumbnailUrl: "https://example.com/thumb3",
    downloadUrl: "https://example.com/download3",
    typeAsset: "3d-model",
    purchaseDate: "2025-07-28T09:15:22.789Z",
    artist: {
      id: "8w7shzswOYLP0IDXlNnKWe2V1cvhky5n",
      name: "Alex Chen",
      email: "alex.chen@example.com",
      image: "/placeholder.svg?height=96&width=96",
      role: "3d-artist",
    },
    category: {
      id: "fde3g7c4-ecgf-68d3-1g79-d5fc08h35595",
      name: "Vintage",
      description: "Classic and vintage items",
    },
  },
  {
    id: "9e5h56eh-d102-732d-16f0-2815h37h2h68",
    name: "Modern Bracelet Set",
    description:
      "Contemporary bracelet designs with geometric patterns and modern aesthetics",
    price: 180,
    previewUrl: "https://example.com/preview4",
    thumbnailUrl: "https://example.com/thumb4",
    downloadUrl: "https://example.com/download4",
    typeAsset: "3d-model",
    purchaseDate: "2025-07-25T14:22:18.456Z",
    artist: {
      id: "9x8tiztyPZMQ1JEYmOoLXf3W2dxily6o",
      name: "Emma Rodriguez",
      email: "emma.rodriguez@example.com",
      image: "/placeholder.svg?height=96&width=96",
      role: "jewelry-designer",
    },
    category: {
      id: "gef4h8d5-fdhi-79e4-2h80-e6gd19i46606",
      name: "Modern",
      description: "Contemporary and modern designs",
    },
  },
  {
    id: "0f6i67fi-e213-843e-27g1-3926i48i3i79",
    name: "Antique Necklace Collection",
    description:
      "Historical necklace replicas with authentic period details and craftsmanship",
    price: 420,
    previewUrl: "https://example.com/preview5",
    thumbnailUrl: "https://example.com/thumb5",
    downloadUrl: "https://example.com/download5",
    typeAsset: "3d-model",
    purchaseDate: "2025-07-20T11:45:33.789Z",
    artist: {
      id: "0y9ujzuzQANR2KFZnPpMYg4X3eyjmz7p",
      name: "David Kim",
      email: "david.kim@example.com",
      image: "/placeholder.svg?height=96&width=96",
      role: "historian-artist",
    },
    category: {
      id: "hfg5i9e6-gejk-80f5-3i91-f7he20j57717",
      name: "Antique",
      description: "Historical and antique pieces",
    },
  },
];
