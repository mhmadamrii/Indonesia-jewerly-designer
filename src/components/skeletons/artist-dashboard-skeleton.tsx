import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export function ArtistDashboardSkeleton() {
  return (
    <div className="bg-background min-h-screen">
      <main>
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
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
              {/* Recent Products Skeleton */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-lg" />
                      <div className="min-w-0 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="mt-2 h-3 w-1/4" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Sales Skeleton */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-4 w-2/4" />
                        <Skeleton className="mt-2 h-3 w-3/4" />
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="mt-2 h-5 w-16" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Reviews Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="mt-2 h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="border-b pb-4 last:border-b-0">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <Skeleton className="h-4 w-1/2" />
                        <div className="mt-1 flex items-center space-x-1">
                          {[...Array(5)].map((_, j) => (
                            <Skeleton key={j} className="h-3 w-3" />
                          ))}
                        </div>
                      </div>
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                    <Skeleton className="mb-2 h-8 w-full" />
                    <div className="flex items-center justify-between text-xs">
                      <Skeleton className="h-3 w-1/3" />
                      <Skeleton className="h-3 w-1/3" />
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
