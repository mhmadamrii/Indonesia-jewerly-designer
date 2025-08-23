// import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { HardDrive, ShoppingBag, Tag, Trash2, Zap } from "lucide-react";
// import Image from "next/image";
// import { Suspense, useState } from "react";
// import { Badge } from "~/components/ui/badge";
// import { Button } from "~/components/ui/button";
// import { Card, CardContent } from "~/components/ui/card";
// import { Separator } from "~/components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

// interface CartItem {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   categoryId: string;
//   typeAsset: string;
//   thumbnailUrl: string;
//   assetUrl: string;
//   previewUrl: string;
//   tags?: string[];
//   boost: number;
//   totalBoostToUpdate: number;
//   totalStorageLimitToUpdate: number;
// }

// const mockCartItems: CartItem[] = [
//   {
//     id: "1",
//     name: "Futuristic Spaceship Model",
//     description: "High-quality 3D spaceship model with detailed textures and animations",
//     price: 49.99,
//     categoryId: "vehicles",
//     typeAsset: "model",
//     thumbnailUrl: "/placeholder-img.jpg?height=200&width=200",
//     assetUrl: "/assets/3d/duck.glb",
//     previewUrl: "/preview/spaceship.jpg",
//     tags: ["spaceship", "sci-fi", "vehicle", "animated"],
//     boost: 15,
//     totalBoostToUpdate: 25,
//     totalStorageLimitToUpdate: 500,
//   },
//   {
//     id: "2",
//     name: "Medieval Castle Environment",
//     description: "Complete medieval castle scene with modular components",
//     price: 79.99,
//     categoryId: "environments",
//     typeAsset: "scene",
//     thumbnailUrl: "/placeholder-img.jpg?height=200&width=200",
//     assetUrl: "/assets/3d/duck.glb",
//     previewUrl: "/preview/castle.jpg",
//     tags: ["castle", "medieval", "environment", "modular"],
//     boost: 25,
//     totalBoostToUpdate: 40,
//     totalStorageLimitToUpdate: 1200,
//   },
//   {
//     id: "3",
//     name: "Cyberpunk Character Rig",
//     description: "Fully rigged cyberpunk character with multiple animations",
//     price: 89.99,
//     categoryId: "characters",
//     typeAsset: "character",
//     thumbnailUrl: "/placeholder-img.jpg?height=200&width=200",
//     assetUrl: "/assets/3d/duck.glb",
//     previewUrl: "/preview/character.jpg",
//     tags: ["character", "cyberpunk", "rigged", "animated"],
//     boost: 30,
//     totalBoostToUpdate: 50,
//     totalStorageLimitToUpdate: 800,
//   },
// ];

// function Model3D({ url }: { url: string }) {
//   const { scene } = useGLTF(url);
//   return <primitive object={scene} scale={1.5} />;
// }

// function Model3DViewer({ assetUrl }: { assetUrl: string }) {
//   return (
//     <div className="h-48 w-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-200">
//       <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />
//         <Suspense fallback={null}>
//           <Model3D url={assetUrl} />
//           <Environment preset="studio" />
//         </Suspense>
//         <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
//       </Canvas>
//     </div>
//   );
// }

// export function CartScreen() {
//   const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

//   const removeItem = (id: string) => {
//     setCartItems((items) => items.filter((item) => item.id !== id));
//   };

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
//   const totalBoost = cartItems.reduce((sum, item) => sum + item.totalBoostToUpdate, 0);
//   const totalStorage = cartItems.reduce(
//     (sum, item) => sum + item.totalStorageLimitToUpdate,
//     0,
//   );
//   const tax = subtotal * 0.08;
//   const total = subtotal + tax;

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
//         <div className="mx-auto max-w-4xl">
//           <div className="py-16 text-center">
//             <ShoppingBag className="mx-auto mb-6 h-24 w-24 text-slate-300" />
//             <h2 className="mb-4 text-3xl font-bold text-slate-800">Your cart is empty</h2>
//             <p className="mb-8 text-slate-600">
//               Discover amazing 3D assets to bring your projects to life
//             </p>
//             <Button
//               size="lg"
//               className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//             >
//               Browse Assets
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-8">
//           <h1 className="mb-2 text-4xl font-bold text-slate-800">Shopping Cart</h1>
//           <p className="text-slate-600">
//             {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
//           </p>
//         </div>

//         <div className="grid gap-8 lg:grid-cols-3">
//           {/* Cart Items */}
//           <div className="space-y-6 lg:col-span-2">
//             {cartItems.map((item) => (
//               <Card
//                 key={item.id}
//                 className="overflow-hidden transition-shadow hover:shadow-lg"
//               >
//                 <CardContent className="p-6">
//                   <div className="flex gap-6">
//                     {/* Image/3D Viewer Tabs */}
//                     <div className="w-80 flex-shrink-0">
//                       <Tabs defaultValue="thumbnail" className="w-full">
//                         <TabsList className="mb-4 grid w-full grid-cols-2">
//                           <TabsTrigger value="thumbnail">Thumbnail</TabsTrigger>
//                           <TabsTrigger value="3d-view">3D View</TabsTrigger>
//                         </TabsList>
//                         <TabsContent value="thumbnail" className="mt-0">
//                           <div className="relative h-48 w-full overflow-hidden rounded-lg bg-slate-100">
//                             <Image
//                               src={item.thumbnailUrl || "/placeholder-img.jpg"}
//                               alt={item.name}
//                               fill
//                               className="object-cover"
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//                           </div>
//                         </TabsContent>
//                         <TabsContent value="3d-view" className="mt-0">
//                           <Model3DViewer assetUrl={item.assetUrl} />
//                         </TabsContent>
//                       </Tabs>
//                     </div>

//                     {/* Item Details */}
//                     <div className="min-w-0 flex-1">
//                       <div className="mb-3 flex items-start justify-between">
//                         <div>
//                           <h3 className="mb-1 text-xl font-semibold text-slate-800">
//                             {item.name}
//                           </h3>
//                           <p className="line-clamp-2 text-sm text-slate-600">
//                             {item.description}
//                           </p>
//                         </div>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => removeItem(item.id)}
//                           className="text-slate-400 hover:bg-red-50 hover:text-red-500"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>

//                       {/* Tags */}
//                       {item.tags && item.tags.length > 0 && (
//                         <div className="mb-3 flex flex-wrap gap-1">
//                           {item.tags.slice(0, 3).map((tag) => (
//                             <Badge key={tag} variant="secondary" className="text-xs">
//                               <Tag className="mr-1 h-3 w-3" />
//                               {tag}
//                             </Badge>
//                           ))}
//                           {item.tags.length > 3 && (
//                             <Badge variant="secondary" className="text-xs">
//                               +{item.tags.length - 3} more
//                             </Badge>
//                           )}
//                         </div>
//                       )}

//                       {/* Asset Info */}
//                       <div className="mb-4 flex items-center gap-4 text-sm text-slate-600">
//                         <div className="flex items-center gap-1">
//                           <Zap className="h-4 w-4 text-yellow-500" />
//                           <span>Boost: +{item.totalBoostToUpdate}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <HardDrive className="h-4 w-4 text-blue-500" />
//                           <span>Storage: {item.totalStorageLimitToUpdate}MB</span>
//                         </div>
//                         <Badge variant="outline" className="capitalize">
//                           {item.typeAsset}
//                         </Badge>
//                       </div>

//                       {/* Price */}
//                       <div className="flex items-center justify-end">
//                         <div className="text-right">
//                           <div className="text-2xl font-bold text-slate-800">
//                             ${item.price.toFixed(2)}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-4">
//               <CardContent className="p-6">
//                 <h2 className="mb-6 text-2xl font-bold text-slate-800">Order Summary</h2>

//                 <div className="mb-6 space-y-4">
//                   <div className="flex justify-between text-slate-600">
//                     <span>Subtotal</span>
//                     <span>${subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-slate-600">
//                     <span>Tax</span>
//                     <span>${tax.toFixed(2)}</span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between text-xl font-bold text-slate-800">
//                     <span>Total</span>
//                     <span>${total.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 {/* Boost and Storage Summary */}
//                 <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4">
//                   <h3 className="mb-3 font-semibold text-slate-800">Package Benefits</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <Zap className="h-4 w-4 text-yellow-500" />
//                         <span>Total Boost</span>
//                       </div>
//                       <span className="font-medium">+{totalBoost}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <HardDrive className="h-4 w-4 text-blue-500" />
//                         <span>Storage Increase</span>
//                       </div>
//                       <span className="font-medium">
//                         {(totalStorage / 1000).toFixed(1)}GB
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <Button
//                   size="lg"
//                   className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white hover:from-blue-700 hover:to-purple-700"
//                 >
//                   Proceed to Checkout
//                 </Button>

//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="mt-3 w-full bg-transparent"
//                 >
//                   Continue Shopping
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
