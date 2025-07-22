import { Eye, Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

const jewelryItems = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amV3ZXJseXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Balinese Gold Necklace",
    price: "$2,450",
    category: "Traditional",
    likes: 234,
    views: 1200,
  },
  {
    id: 2,
    src: "https://plus.unsplash.com/premium_photo-1708958117373-5d354f07a61a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8amV3ZXJseXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Geometric Silver Ring",
    price: "$680",
    category: "Modern",
    likes: 189,
    views: 890,
  },
  {
    id: 3,
    src: "https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGpld2VybHl8ZW58MHx8MHx8fDA%3D",
    title: "Emerald Drop Earrings",
    price: "$3,200",
    category: "Luxury",
    likes: 456,
    views: 2100,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1602527418456-8b5cd2c7a4c2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGpld2VybHl8ZW58MHx8MHx8fDA%3D",
    title: "Traditional Gold Bracelet",
    price: "$1,890",
    category: "Heritage",
    likes: 312,
    views: 1450,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1649118486196-9a99d8ea7e38?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGpld2VybHl8ZW58MHx8MHx8fDA%3D",
    title: "Minimalist Silver Pendant",
    price: "$520",
    category: "Contemporary",
    likes: 167,
    views: 780,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGpld2VybHl8ZW58MHx8MHx8fDA%3D",
    title: "Royal Ruby Ring",
    price: "$4,100",
    category: "Royal",
    likes: 589,
    views: 2800,
  },
];

export function JewelryShowcase() {
  return (
    <section className="px-4 py-20">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-8 text-3xl font-light text-gray-800 md:text-5xl">
            Featured Collections
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Explore our curated selection of extraordinary jewelry pieces, each crafted
            with precision and passion by Indonesian master artisans.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jewelryItems.map((item) => (
            <Card
              key={item.id}
              className="group transform overflow-hidden border-0 pt-0 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                onClick={() => toast.warning("You need to login to add to cart")}
                className="relative cursor-pointer overflow-hidden"
              >
                <img
                  src={item.src || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {item.category}
                  </Badge>
                </div>
                <div className="absolute right-4 bottom-4 left-4 translate-y-4 transform opacity-0 transition-transform duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {item.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {item.views}
                      </span>
                    </div>
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-amber-600">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold text-amber-600">{item.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-amber-600 px-8 py-3 text-lg text-white hover:bg-amber-700"
          >
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  );
}
