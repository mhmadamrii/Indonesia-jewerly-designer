import { Calendar, Eye, Heart, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { NoData } from "~/components/NoData";

export function CollectionList({ collections }: { collections: any }) {
  console.log("collections", collections);
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
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="min-h-screen px-4 py-5">
      {collections?.length == 0 && <NoData title="No Search Found" />}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      ></motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {collections?.map((item: any, index: number) => {
          const asset = item.jewelry_assets;
          const category = item.category;
          const user = item.user;

          return (
            <motion.div
              key={asset.id}
              // @ts-expect-error
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <motion.div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/20">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-600/20 to-pink-600/20">
                  <motion.img
                    src={asset.thumbnailUrl}
                    alt={asset.name}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-1 text-sm font-semibold text-white shadow-lg"
                  >
                    <TrendingUp className="h-4 w-4" />
                    {asset.boost}
                  </motion.div>
                  <div className="absolute top-4 left-4 rounded-full bg-purple-500/90 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                    {category.name}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-purple-400">
                    {asset.name}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-slate-400">
                    {asset.description}
                  </p>
                  <div className="mb-4 flex items-center gap-3 border-b border-slate-700/50 pb-4">
                    <img
                      src={user.image ?? "/placeholder-img.jpg"}
                      alt={user.name}
                      className="h-10 w-10 rounded-full border-2 border-purple-500/50"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-slate-400 capitalize">{user.role}</p>
                    </div>
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((tag: string, i: number) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="rounded-md bg-slate-700/50 px-2 py-1 text-xs text-purple-300"
                      >
                        #{tag}
                      </motion.span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="rounded-md bg-slate-700/50 px-2 py-1 text-xs text-slate-400">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-pink-500" />
                        <span>{asset.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-blue-400" />
                        <span>{item.reviewCount}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(asset.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Price</p>
                      <p className="text-2xl font-bold text-white">
                        {formatPrice(asset.price)}
                      </p>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
