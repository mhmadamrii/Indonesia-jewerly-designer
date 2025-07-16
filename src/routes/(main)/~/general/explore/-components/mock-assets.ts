import { Asset } from "./types";

export const mockAssets: Asset[] = [
  {
    id: "1",
    title: "Futuristic Spaceship",
    description:
      "High-poly sci-fi spaceship with detailed textures and PBR materials. Perfect for games and animations.",
    price: 49.99,
    category: "Vehicles",
    tags: ["spaceship", "sci-fi", "futuristic", "vehicle"],
    imageUrl:
      "https://images.pexels.com/photos/586077/pexels-photo-586077.jpeg?auto=compress&cs=tinysrgb&w=800",
    modelUrl: "/models/spaceship.gltf",
    seller: {
      name: "Alex Rivera",
      avatar:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.8,
    },
    downloads: 1247,
    rating: 4.9,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Medieval Castle",
    description:
      "Detailed medieval castle with modular components. Includes interior and exterior designs.",
    price: 79.99,
    category: "Architecture",
    tags: ["medieval", "castle", "architecture", "fantasy"],
    imageUrl:
      "https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=800",
    modelUrl: "/models/castle.gltf",
    seller: {
      name: "Sarah Chen",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.9,
    },
    downloads: 892,
    rating: 4.7,
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    title: "Cyberpunk Robot",
    description:
      "Articulated robot character with multiple texture variants. Ready for animation.",
    price: 34.99,
    category: "Characters",
    tags: ["robot", "cyberpunk", "character", "rigged"],
    imageUrl:
      "https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=800",
    modelUrl: "/models/robot.gltf",
    seller: {
      name: "Marcus Tech",
      avatar:
        "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.6,
    },
    downloads: 2103,
    rating: 4.8,
    createdAt: "2024-01-25",
  },
  {
    id: "4",
    title: "Tropical Environment",
    description:
      "Complete tropical island scene with palm trees, rocks, and vegetation. Optimized for real-time rendering.",
    price: 89.99,
    category: "Environments",
    tags: ["tropical", "environment", "nature", "island"],
    imageUrl:
      "https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg?auto=compress&cs=tinysrgb&w=800",
    modelUrl: "/models/tropical.gltf",
    seller: {
      name: "Emma Nature",
      avatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.9,
    },
    downloads: 756,
    rating: 4.9,
    createdAt: "2024-02-01",
  },
  {
    id: "5",
    title: "Racing Car Pack",
    description:
      "Collection of 5 high-performance racing cars with detailed interiors and realistic physics setup.",
    price: 124.99,
    category: "Vehicles",
    tags: ["racing", "cars", "vehicles", "pack"],
    imageUrl:
      "https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&w=800",
    modelUrl: "/models/racing-cars.gltf",
    seller: {
      name: "Speed Studios",
      avatar:
        "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.7,
    },
    downloads: 1834,
    rating: 4.8,
    createdAt: "2024-02-05",
  },
  {
    id: "6",
    title: "Fantasy Sword Collection",
    description:
      "Set of 10 fantasy swords with magical effects and particle systems. Perfect for RPG games.",
    price: 29.99,
    category: "Props",
    tags: ["fantasy", "weapons", "swords", "magic"],
    imageUrl:
      "https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=800",
    modelUrl: "/models/swords.gltf",
    seller: {
      name: "Forge Master",
      avatar:
        "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.5,
    },
    downloads: 3291,
    rating: 4.6,
    createdAt: "2024-02-10",
  },
];

export const categories = [
  "All",
  "Vehicles",
  "Architecture",
  "Characters",
  "Environments",
  "Props",
  "Animals",
  "Food & Drinks",
  "Electronics",
];
