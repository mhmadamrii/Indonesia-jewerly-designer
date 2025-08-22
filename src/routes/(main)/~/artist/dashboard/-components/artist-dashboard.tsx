import { useNavigate } from "@tanstack/react-router";
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

export function ArtistDashboard() {
  const navigate = useNavigate();
  const stats = {
    totalRevenue: 12450,
    totalProducts: 24,
    averageRating: 4.8,
    totalFollowers: 1250,
  };

  const recentProducts = [
    {
      id: "1",
      name: "Diamond Eternity Ring",
      price: 2500,
      category: "Rings",
      thumbnailUrl: "/placeholder.svg?height=80&width=80",
      boost: 5,
      views: 234,
      likes: 45,
    },
    {
      id: "2",
      name: "Pearl Drop Earrings",
      price: 450,
      category: "Earrings",
      thumbnailUrl: "/placeholder.svg?height=80&width=80",
      boost: 0,
      views: 156,
      likes: 23,
    },
    {
      id: "3",
      name: "Gold Chain Necklace",
      price: 890,
      category: "Necklaces",
      thumbnailUrl: "/placeholder.svg?height=80&width=80",
      boost: 3,
      views: 189,
      likes: 34,
    },
  ];

  const recentSales = [
    {
      id: "1",
      productName: "Silver Bracelet Set",
      amount: 320,
      customer: "Sarah M.",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: "2",
      productName: "Emerald Pendant",
      amount: 1200,
      customer: "Michael R.",
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: "3",
      productName: "Rose Gold Ring",
      amount: 680,
      customer: "Emma L.",
      date: "2024-01-13",
      status: "processing",
    },
  ];

  const recentReviews = [
    {
      id: "1",
      title: "Absolutely stunning!",
      description:
        "The craftsmanship is incredible. Exactly as described and shipped quickly.",
      rating: 5,
      customer: "Jennifer K.",
      productName: "Diamond Stud Earrings",
      date: "2024-01-15",
    },
    {
      id: "2",
      title: "Beautiful piece",
      description: "Love the design and quality. Will definitely order again.",
      rating: 5,
      customer: "David P.",
      productName: "Custom Wedding Band",
      date: "2024-01-14",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <main>
        {/* Stats Overview */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalRevenue.toLocaleString()}
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
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
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
              <div className="text-2xl font-bold">{stats.averageRating}</div>
              <p className="text-muted-foreground text-xs">Based on 127 reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalFollowers.toLocaleString()}
              </div>
              <p className="text-muted-foreground text-xs">
                <span className="text-green-600">+45</span> this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
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
                    <div key={product.id} className="flex items-center space-x-4">
                      <img
                        src={product.thumbnailUrl || "/placeholder.svg"}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{product.name}</p>
                        <p className="text-muted-foreground text-sm">${product.price}</p>
                      </div>
                      <div className="text-muted-foreground flex items-center space-x-2 text-xs">
                        <Eye className="h-3 w-3" />
                        <span>{product.views}</span>
                        <Heart className="h-3 w-3" />
                        <span>{product.likes}</span>
                      </div>
                      {product.boost > 0 && (
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
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{sale.productName}</p>
                        <p className="text-muted-foreground text-xs">
                          {sale.customer} • {sale.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${sale.amount}</p>
                        <Badge
                          variant={sale.status === "completed" ? "default" : "secondary"}
                        >
                          {sale.status}
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
                {recentReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium">{review.title}</h4>
                        <div className="mt-1 flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-muted-foreground text-xs">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground mb-2 text-sm">
                      {review.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">by {review.customer}</span>
                      <span className="text-muted-foreground">
                        for {review.productName}
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
                  {recentProducts.map((product) => (
                    <Card key={product.id}>
                      <CardContent className="p-4">
                        <img
                          src={product.thumbnailUrl || "/placeholder.svg"}
                          alt={product.name}
                          className="mb-3 h-32 w-full rounded-lg object-cover"
                        />
                        <h3 className="mb-1 font-medium">{product.name}</h3>
                        <p className="text-muted-foreground mb-2 text-sm">
                          {product.category}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">${product.price}</span>
                          <div className="text-muted-foreground flex items-center space-x-1 text-xs">
                            <Eye className="h-3 w-3" />
                            <span>{product.views}</span>
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
                {recentReviews.map((review) => (
                  <div key={review.id} className="rounded-lg border p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{review.customer}</p>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-muted-foreground text-xs">{review.date}</span>
                    </div>
                    <h4 className="mb-2 font-medium">{review.title}</h4>
                    <p className="text-muted-foreground mb-3 text-sm">
                      {review.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-xs">
                        Product: {review.productName}
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
