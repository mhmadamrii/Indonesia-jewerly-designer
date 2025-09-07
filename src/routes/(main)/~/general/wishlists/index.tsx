import { Await, createFileRoute } from "@tanstack/react-router";
import { getWishlistItems } from "~/actions/wishlist.action";
import { NoData } from "~/components/NoData";
import { WishlistMasonry } from "./-components/wishlist-masonry";
import { WishlistMasonrySkeleton } from "./-components/wishlist-masonry-skeleton";

export const Route = createFileRoute("/(main)/~/general/wishlists/")({
  component: RouteComponent,
  loader: async () => {
    const wishlistItems = getWishlistItems();
    return { wishlistItems };
  },
});

function RouteComponent() {
  const { wishlistItems } = Route.useLoaderData();

  return (
    <section className="mx-10 flex min-h-screen justify-center gap-3 py-2">
      <Await promise={wishlistItems} fallback={<WishlistMasonrySkeleton />}>
        {({ data }) => {
          if (!data || data.length === 0) {
            return <NoData />;
          }
          return (
            <WishlistMasonry
              items={data.map((item) => ({
                id: item.id,
                img: item.imageUrl,
                url: item.jewelryAssetId,
                height: Math.random() * 1000 + 250,
              }))}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={false}
            />
          );
        }}
      </Await>
    </section>
  );
}
