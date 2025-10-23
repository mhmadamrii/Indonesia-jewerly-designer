import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();

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
    currency: "IDR",
    timezone: "America/Los_Angeles",
  });

  const { data: userSettingsData } = useQuery({
    queryKey: ["user-settings"],
    queryFn: () => getUserSettings(),
  });

  const { mutate: handleSave, isPending } = useMutation({
    mutationFn: updateUserSettings,
    onSuccess: () => {
      toast.success(t("settings_saved_success"));
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
        <h1 className="mb-2 text-3xl font-bold">{t("settings_preferences")}</h1>
        <p className="text-slate-200">{t("manage_account_settings")}</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 shadow-sm">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {t("profile")}
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {t("privacy")}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            {t("notifications")}
          </TabsTrigger>
          <TabsTrigger value="display" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            {t("display")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("profile_information")}</CardTitle>
              <CardDescription>{t("update_personal_information")}</CardDescription>
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
                    {t("change_photo")}
                  </Button>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {t("photo_requirements")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("full_name")}</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => handleSettingChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email_address")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">{t("bio")}</Label>
                <Textarea
                  id="bio"
                  placeholder={t("tell_about_yourself")}
                  value={settings.bio}
                  onChange={(e) => handleSettingChange("bio", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">{t("location")}</Label>
                  <Input
                    id="location"
                    value={settings.location}
                    onChange={(e) => handleSettingChange("location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">{t("website")}</Label>
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
              <CardTitle>{t("privacy_visibility")}</CardTitle>
              <CardDescription>{t("control_visibility")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">{t("marketplace_visibility")}</h4>
                      <p className="text-muted-foreground text-sm">
                        {t("show_marketplace_activity")}
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
                    <Mail className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">{t("email_address")}</h4>
                      <p className="text-muted-foreground text-sm">
                        {t("show_email_on_profile")}
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
                    <Globe className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">{t("location")}</h4>
                      <p className="text-muted-foreground text-sm">
                        {t("show_location_on_profile")}
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
                <h4 className="font-medium">{t("profile_visibility_label")}</h4>
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
                        {t("public_profile")}
                      </div>
                    </SelectItem>
                    <SelectItem value="followers">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {t("followers_only")}
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center gap-2">
                        <EyeOff className="h-4 w-4" />
                        {t("private_profile")}
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
              <CardTitle>{t("notification_preferences")}</CardTitle>
              <CardDescription>{t("choose_how_notified")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">{t("email_notifications")}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t("receive_email_notifications")}
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
                    <h4 className="font-medium">{t("push_notifications")}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t("receive_push_notifications")}
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
                    <h4 className="font-medium">{t("order_updates")}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t("get_notified_order_status")}
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
                    <h4 className="font-medium">{t("new_reviews")}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t("get_notified_new_reviews")}
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
                    <h4 className="font-medium">{t("new_followers")}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t("get_notified_new_followers")}
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
                    <h4 className="font-medium">{t("marketing_emails")}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t("receive_promotional_emails")}
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
              <CardTitle>{t("display_preferences")}</CardTitle>
              <CardDescription>{t("customize_interface")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>{t("theme")}</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => handleSettingChange("theme", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">{t("light")}</SelectItem>
                      <SelectItem value="dark">{t("dark")}</SelectItem>
                      <SelectItem value="system">{t("system")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t("language")}</Label>
                  <Select
                    value={i18n.language}
                    onValueChange={(val) => i18n.changeLanguage(val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">{t("english")}</SelectItem>
                      <SelectItem value="id">{t("indonesia")}</SelectItem>
                      <SelectItem value="es">{t("spanish")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t("currency")}</Label>
                  <Select
                    value={settings.currency}
                    onValueChange={(value) => handleSettingChange("currency", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IDR">IDR (Rp)</SelectItem>
                      <SelectItem disabled value="USD">
                        USD ($)
                      </SelectItem>
                      <SelectItem disabled value="EUR">
                        EUR (€)
                      </SelectItem>
                      <SelectItem disabled value="GBP">
                        GBP (£)
                      </SelectItem>
                      <SelectItem disabled value="JPY">
                        JPY (¥)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t("timezone")}</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) => handleSettingChange("timezone", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Los_Angeles">
                        {t("pacific_time")}
                      </SelectItem>
                      <SelectItem value="America/Denver">{t("mountain_time")}</SelectItem>
                      <SelectItem value="America/Chicago">{t("central_time")}</SelectItem>
                      <SelectItem value="America/New_York">
                        {t("eastern_time")}
                      </SelectItem>
                      <SelectItem value="Europe/London">{t("gmt")}</SelectItem>
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
          className="flex w-full items-center gap-2 sm:w-[170px]"
        >
          {isPending ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              <Save className="h-4 w-4" />
              {t("save_changes")}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
