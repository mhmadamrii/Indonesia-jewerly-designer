import { compareDesc, format } from "date-fns";
import { ArtistDashboardAndAnalyticsType } from "~/actions/dashboard.action";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import {
  DollarSign,
  Eye,
  Filter,
  Heart,
  Package,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function ArtistDashboard({
  dashboardData,
}: {
  dashboardData: ArtistDashboardAndAnalyticsType;
}) {
  const recentProducts = dashboardData.artistProducts
    .slice()
    .sort((a, b) =>
      compareDesc(
        a.jewelry_assets.createdAt ?? new Date(),
        b.jewelry_assets.createdAt ?? new Date(),
      ),
    )
    .slice(0, 5);

  const formatPrice = (price: number) => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
    return formatted;
  };

  return (
    <div className="bg-background min-h-screen">
      <main>
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(
                  dashboardData.totalRevenue.reduce(
                    (sum, payment) => sum + parseInt(payment.amount),
                    0,
                  ),
                )}
              </div>
              <p className="text-muted-foreground text-xs">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
              <Package className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.productsInCart}</div>
              <p className="text-muted-foreground text-xs">
                <span className="text-green-600">+3</span> this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  dashboardData.assetReviews.reduce(
                    (sum, item) => sum + item.review.rating,
                    0,
                  ) / dashboardData.assetReviews.length
                ).toFixed(1)}
              </div>
              <p className="text-muted-foreground text-xs">
                Based on {dashboardData.assetReviews.length} reviews
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.followers}</div>
              <p className="text-muted-foreground text-xs">
                <span className="text-green-600">+45</span> this month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Recent Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Products</CardTitle>
                  <CardDescription>Your latest jewelry listings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentProducts.map((product) => (
                    <div
                      key={product.jewelry_assets.id}
                      className="flex items-center space-x-4"
                    >
                      <img
                        src={
                          product.jewelry_assets.thumbnailUrl || "/placeholder-img.jpg"
                        }
                        alt={product.jewelry_assets.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {product.jewelry_assets.name} -{" "}
                          {format(
                            product.jewelry_assets.createdAt as unknown as string,
                            "MMM dd, yyyy",
                          )}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          ${product.jewelry_assets.price}
                        </p>
                      </div>
                      <div className="text-muted-foreground flex items-center space-x-2 text-xs">
                        <Eye className="h-3 w-3" />
                        <span>5</span>
                        <Heart className="h-3 w-3" />
                        <span>10</span>
                      </div>
                      {product!.jewelry_assets!.boost! > 0 && (
                        <Badge variant="secondary">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          Boosted
                        </Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Sales */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>Your latest transactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData.recentSales.map((sale) => (
                    <div
                      key={sale.payments.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium">{sale.jewelry_assets.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {sale.user.name} •{" "}
                          {format(sale.payments.createdAt as Date, "MMM dd, yyyy")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {formatPrice(parseInt(sale.payments.amount))}
                        </p>
                        <Badge
                          variant={
                            sale.payments.status === "capture" ? "default" : "secondary"
                          }
                        >
                          {sale.payments.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>
                  What customers are saying about your jewelry
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardData.assetReviews.slice(0, 5).map((item) => (
                  <div key={item.review.id} className="border-b pb-4 last:border-b-0">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium">{item.review.title}</h4>
                        <div className="mt-1 flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < item.review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {format(item.review.createdAt as Date, "MMM dd, yyyy")}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2 text-sm">
                      {item.review.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">by {item.user.name}</span>
                      <span className="text-muted-foreground">
                        for {item.jewelry_assets.name}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Management</CardTitle>
                    <CardDescription>
                      Manage your jewelry listings and inventory
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Badge variant="outline">All Categories</Badge>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {dashboardData.artistProducts.map((product) => (
                    <Card key={product.jewelry_assets.id}>
                      <CardContent className="p-4">
                        <img
                          src={
                            product.jewelry_assets.thumbnailUrl || "/placeholder-img.jpg"
                          }
                          alt={product.jewelry_assets.name}
                          className="mb-3 h-32 w-full rounded-lg object-cover"
                        />
                        <h3 className="mb-1 font-medium">
                          {product.jewelry_assets.name}
                        </h3>
                        <p className="text-muted-foreground mb-2 text-sm">
                          {product.category.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">
                            ${product.jewelry_assets.price}
                          </span>
                          <div className="text-muted-foreground flex items-center space-x-1 text-xs">
                            <Eye className="h-3 w-3" />
                            <span>{10}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>
                  Track your revenue and sales performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">$3,240</p>
                      <p className="text-muted-foreground text-sm">This Month</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">$12,450</p>
                      <p className="text-muted-foreground text-sm">Total Revenue</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">47</p>
                      <p className="text-muted-foreground text-sm">Orders</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Goal Progress</span>
                      <span>$3,240 / $5,000</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>Manage and respond to customer feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {dashboardData.assetReviews.map((item) => (
                  <div key={item.review.id} className="rounded-lg border p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{item.user.name}</p>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < item.review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {format(item.review.createdAt as Date, "MMM dd, yyyy")}
                      </span>
                    </div>
                    <h4 className="mb-2 font-medium">{item.review.title}</h4>
                    <p className="text-muted-foreground mb-3 text-sm">
                      {item.review.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-xs">
                        Product: {item.jewelry_assets.name}
                      </span>
                      <Button variant="outline" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
