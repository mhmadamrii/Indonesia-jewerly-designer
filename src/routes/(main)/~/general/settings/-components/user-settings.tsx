import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserSettings, updateUserSettings } from "~/actions/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  Bell,
  Camera,
  Eye,
  EyeOff,
  Globe,
  Loader,
  Mail,
  Palette,
  Save,
  Shield,
  User,
} from "lucide-react";

export function UserSettings() {
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState({
    // Profile Settings
    name: "",
    email: "",
    bio: "",
    location: "",
    website: "",

    // Privacy Settings
    showMarketplacePublic: true,
    showEmail: false,
    showLocation: true,
    profileVisibility: "public",

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    orderUpdates: true,
    reviewNotifications: true,
    followerNotifications: true,

    // Display Settings
    theme: "system",
    language: "en",
    currency: "USD",
    timezone: "America/Los_Angeles",
  });

  const { data: userSettingsData } = useQuery({
    queryKey: ["user-settings"],
    queryFn: () => getUserSettings(),
  });

  const { mutate: handleSave, isPending } = useMutation({
    mutationFn: updateUserSettings,
    onSuccess: () => {
      toast.success("Settings saved successfully");
      queryClient.invalidateQueries({ queryKey: ["user-settings"] });
    },
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdateSettingsEffect = () => {
    if (userSettingsData) {
      setSettings((prev) => ({
        ...prev,
        name: userSettingsData.data.user.name,
        email: userSettingsData.data.user.email,
        bio: userSettingsData.data.settings?.bio || "",
        location: userSettingsData.data.settings?.location || "",
        website: userSettingsData.data.settings?.site || "",
        showMarketplacePublic: userSettingsData.data.settings?.market_visibility ?? true,
        showEmail: userSettingsData.data.settings?.show_email ?? true,
        showLocation: userSettingsData.data.settings?.show_location ?? true,
        profileVisibility:
          (userSettingsData.data.settings?.profile_visibility as
            | "public"
            | "followers"
            | "private") ?? "public",
        // notifications
        emailNotifications: userSettingsData.data.settings?.receive_email ?? true,
        pushNotifications: userSettingsData.data.settings?.receive_push ?? true,
        orderUpdates: userSettingsData.data.settings?.receive_order ?? true,
        reviewNotifications: userSettingsData.data.settings?.receive_review ?? true,
        followerNotifications: userSettingsData.data.settings?.receive_follower ?? true,
        marketingEmails: userSettingsData.data.settings?.receive_marketing_email ?? true,
      }));
    }
  };

  useEffect(() => {
    handleUpdateSettingsEffect();
  }, [userSettingsData]);

  return (
    <div className="min-h-screen p-4">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Settings & Preferences</h1>
        <p className="text-slate-200">
          Manage your account settings and privacy preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 shadow-sm">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="display" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Display
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={
                      userSettingsData?.data.user.image ||
                      "/placeholder-img.jpg?height=80&width=80"
                    }
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Camera className="h-4 w-4" />
                    Change Photo
                  </Button>
                  <p className="mt-2 text-sm text-slate-500">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => handleSettingChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell people about yourself..."
                  value={settings.bio}
                  onChange={(e) => handleSettingChange("bio", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={settings.location}
                    onChange={(e) => handleSettingChange("location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={settings.website}
                    onChange={(e) => handleSettingChange("website", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Visibility</CardTitle>
              <CardDescription>
                Control who can see your information and marketplace activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-slate-600" />
                    <div>
                      <h4 className="font-medium">Marketplace Section Visibility</h4>
                      <p className="text-sm text-slate-500">
                        Show your marketplace activity to public visitors
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.showMarketplacePublic}
                    onCheckedChange={(checked) =>
                      handleSettingChange("showMarketplacePublic", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-slate-600" />
                    <div>
                      <h4 className="font-medium">Email Address</h4>
                      <p className="text-sm text-slate-500">
                        Show your email on your public profile
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.showEmail}
                    onCheckedChange={(checked) =>
                      handleSettingChange("showEmail", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-slate-600" />
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-sm text-slate-500">
                        Show your location on your public profile
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.showLocation}
                    onCheckedChange={(checked) =>
                      handleSettingChange("showLocation", checked)
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Profile Visibility</h4>
                <Select
                  value={settings.profileVisibility}
                  onValueChange={(value) =>
                    handleSettingChange("profileVisibility", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Public - Anyone can view
                      </div>
                    </SelectItem>
                    <SelectItem value="followers">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Followers Only
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center gap-2">
                        <EyeOff className="h-4 w-4" />
                        Private - Only you can view
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified about activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-slate-500">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("emailNotifications", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-slate-500">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("pushNotifications", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">Order Updates</h4>
                    <p className="text-sm text-slate-500">
                      Get notified about order status changes
                    </p>
                  </div>
                  <Switch
                    checked={settings.orderUpdates}
                    onCheckedChange={(checked) =>
                      handleSettingChange("orderUpdates", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">New Reviews</h4>
                    <p className="text-sm text-slate-500">
                      Get notified when someone reviews your products
                    </p>
                  </div>
                  <Switch
                    checked={settings.reviewNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("reviewNotifications", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">New Followers</h4>
                    <p className="text-sm text-slate-500">
                      Get notified when someone follows you
                    </p>
                  </div>
                  <Switch
                    checked={settings.followerNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("followerNotifications", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">Marketing Emails</h4>
                    <p className="text-sm text-slate-500">
                      Receive promotional emails and updates
                    </p>
                  </div>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) =>
                      handleSettingChange("marketingEmails", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>
                Customize how the interface appears to you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => handleSettingChange("theme", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => handleSettingChange("language", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select
                    value={settings.currency}
                    onValueChange={(value) => handleSettingChange("currency", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) => handleSettingChange("timezone", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="Europe/London">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={() =>
            handleSave({
              data: {
                bio: settings.bio,
                location: settings.location,
                site: settings.website,
                // privacy
                market_visibility: settings.showMarketplacePublic,
                show_email: settings.showEmail,
                show_location: settings.showLocation,
                profile_visibility: settings.profileVisibility as
                  | "public"
                  | "followers"
                  | "private",
                // notifications
                receive_email: settings.emailNotifications,
                receive_push: settings.pushNotifications,
                receive_order: settings.orderUpdates,
                receive_review: settings.reviewNotifications,
                receive_follower: settings.followerNotifications,
                receive_marketing_email: settings.marketingEmails,
              },
            })
          }
          className="flex w-full items-center gap-2 sm:w-[150px]"
        >
          {isPending ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
