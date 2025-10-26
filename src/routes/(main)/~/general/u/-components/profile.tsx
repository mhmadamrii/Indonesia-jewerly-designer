import { useState } from "react";
import { UserById } from "~/actions/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  Calendar,
  Camera,
  CheckCircle,
  Crown,
  Gem,
  HardDrive,
  Mail,
  Settings,
  Shield,
  User,
  XCircle,
  Zap,
} from "lucide-react";

const mockUser = {
  id: "user_123",
  name: "Elena Rodriguez",
  email: "elena.rodriguez@example.com",
  role: "artist",
  boostCredit: 85,
  userStorageLimit: 41943040, // ~40MB
  userStorageUsage: 25165824, // ~24MB
  emailVerified: true,
  image: "/placeholder-img.jpg?height=120&width=120",
  createdAt: new Date("2023-06-15"),
  updatedAt: new Date("2024-01-15"),
  // Additional jewelry marketplace stats
  totalProducts: 24,
  totalSales: 156,
  totalRevenue: 12450,
  followers: 342,
};

export function UserProfile({ userById }: { userById: UserById | undefined }) {
  console.log("userById", userById);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
  });

  const storagePercentage = (mockUser.userStorageUsage / mockUser.userStorageLimit) * 100;
  const formatBytes = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="mt-1">Manage your account and preferences</p>
          </div>
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="border-0 bg-gradient-to-r from-purple-50 to-indigo-50 shadow-lg dark:from-purple-900 dark:to-indigo-900 dark:shadow-indigo-900/50">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <AvatarImage
                        src={userById?.image || "/placeholder-img.jpg"}
                        alt={mockUser.name}
                      />
                      <AvatarFallback className="bg-purple-100 text-xl font-semibold text-purple-700">
                        {userById?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {!isEditing && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full p-0"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      {isEditing ? (
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <h2 className="flex items-center gap-2 text-2xl font-bold">
                            {userById?.name}
                            {mockUser.role === "artist" && (
                              <Crown className="h-5 w-5 text-amber-500" />
                            )}
                          </h2>
                          <p className="mt-1 flex items-center gap-2 text-slate-200">
                            <Mail className="h-4 w-4" />
                            {userById?.email}
                            {userById?.emailVerified ? (
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </p>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="gap-1">
                        <Shield className="h-3 w-3" />
                        {mockUser.role.charAt(0).toUpperCase() + mockUser.role.slice(1)}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Calendar className="h-3 w-3" />
                        Member since {formatDate(mockUser.createdAt)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-purple-100 p-2">
                      <Zap className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm">Boost Credits</p>
                      <p className="text-xl font-bold">{mockUser.boostCredit}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <HardDrive className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm">Storage Used</p>
                      <p className="text-xl font-bold">{storagePercentage.toFixed(0)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-emerald-100 p-2">
                      <Gem className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm">Products</p>
                      <p className="text-xl font-bold">{mockUser.totalProducts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-amber-100 p-2">
                      <User className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm">Followers</p>
                      <p className="text-xl font-bold">{mockUser.followers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            {/* Account Details */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Your account details and verification status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>User ID</Label>
                    <p className="rounded bg-slate-100 p-2 font-mono text-sm">
                      {mockUser.id}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Account Role</Label>
                    <Badge variant="secondary" className="gap-1">
                      <Shield className="h-3 w-3" />
                      {mockUser.role.charAt(0).toUpperCase() + mockUser.role.slice(1)}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label>Email Verification</Label>
                    <div className="flex items-center gap-2">
                      {mockUser.emailVerified ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm text-emerald-600">Verified</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-red-600">Not Verified</span>
                          <Button size="sm" variant="outline">
                            Verify Now
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Last Updated</Label>
                    <p className="text-sm">{formatDate(mockUser.updatedAt)}</p>
                  </div>
                </div>

                <Separator />

                {/* Storage Usage */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Storage Usage</Label>
                    <span className="text-sm">
                      {formatBytes(mockUser.userStorageUsage)} of{" "}
                      {formatBytes(mockUser.userStorageLimit)}
                    </span>
                  </div>
                  <Progress value={storagePercentage} className="h-2" />
                  <p className="text-xs text-slate-500">
                    You're using {storagePercentage.toFixed(1)}% of your available storage
                  </p>
                </div>

                <Separator />

                {/* Boost Credits */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Boost Credits</Label>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-purple-600" />
                      <span className="font-semibold">{mockUser.boostCredit}</span>
                    </div>
                  </div>
                  <p className="text-sm">
                    Use boost credits to promote your jewelry listings and increase
                    visibility
                  </p>
                  <Button variant="outline" size="sm">
                    Purchase More Credits
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            {/* Marketplace Stats */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">
                    {mockUser.totalProducts}
                  </div>
                  <p className="mt-1 text-sm">Active jewelry listings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-600">
                    {mockUser.totalSales}
                  </div>
                  <p className="mt-1 text-sm">Completed transactions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    ${mockUser.totalRevenue.toLocaleString()}
                  </div>
                  <p className="mt-1 text-sm">Total earnings</p>
                </CardContent>
              </Card>
            </div>

            {/* Artist Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Artist Performance</CardTitle>
                <CardDescription>
                  Your marketplace activity and engagement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Follower Count</Label>
                    <div className="text-2xl font-bold">{mockUser.followers}</div>
                    <p className="text-sm">People following your work</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Average Rating</Label>
                    <div className="text-2xl font-bold">4.8</div>
                    <p className="text-sm">Based on customer reviews</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-base">Quick Actions</Label>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm">
                      Add New Product
                    </Button>
                    <Button variant="outline" size="sm">
                      View Analytics
                    </Button>
                    <Button variant="outline" size="sm">
                      Manage Reviews
                    </Button>
                    <Button variant="outline" size="sm">
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
