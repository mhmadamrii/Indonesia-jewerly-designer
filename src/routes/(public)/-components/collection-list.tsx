import { Calendar, Eye, Heart, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { NoData } from "~/components/NoData";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export function CollectionList({ collections }: { collections: any }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen px-4 py-8">
      {collections?.length === 0 && <NoData title="Koleksi Tidak Ditemukan" />}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {collections?.map((item: any, index: number) => {
          const asset = item.jewelry_assets;
          const category = item.category;
          const user = item.user;

          return (
            <motion.div
              key={asset.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group h-full"
            >
              <Card className="border-border/40 bg-card dark:bg-card/40 h-full overflow-hidden py-0 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={asset.thumbnailUrl}
                    alt={asset.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-background/80 text-foreground font-medium backdrop-blur-sm"
                    >
                      {category.name}
                    </Badge>
                  </div>

                  {asset.boost && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-foreground line-clamp-1 text-xl font-bold transition-colors group-hover:text-amber-600">
                        {asset.name}
                      </h3>
                      <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                        {asset.description}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="bg-secondary/50 text-secondary-foreground rounded-full px-2.5 py-0.5 text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Price & Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">Harga</p>
                      <p className="text-lg font-bold text-amber-600">
                        {formatPrice(asset.price)}
                      </p>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-3">
                      <div className="flex items-center gap-1.5 transition-colors hover:text-rose-500">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm font-medium">{asset.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5 transition-colors hover:text-blue-500">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.reviewCount}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <Separator className="bg-border/40" />

                <CardFooter className="bg-muted/30 flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="border-border relative h-8 w-8 overflow-hidden rounded-full border">
                      <img
                        src={user.image ?? "/placeholder-img.jpg"}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-foreground text-sm font-medium">
                        {user.name}
                      </span>
                      <span className="text-muted-foreground text-xs capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(asset.createdAt)}</span>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
