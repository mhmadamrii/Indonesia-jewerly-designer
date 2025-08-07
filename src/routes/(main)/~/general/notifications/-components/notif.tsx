import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

import {
  Bell,
  Calendar,
  Check,
  Clock,
  CreditCard,
  Gift,
  Heart,
  MessageSquare,
  Package,
  Shield,
  Sparkles,
  Users,
  X,
} from "lucide-react";

interface Notification {
  id: string;
  type: "order" | "promotion" | "appointment" | "system" | "community" | "payment";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: "low" | "medium" | "high";
  actionUrl?: string;
  image?: string;
}

export function Notif() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "order",
      title: "Cincin Custom Anda Sudah Selesai!",
      message:
        "Cincin emas 18K dengan berlian 0.5 karat telah selesai dibuat. Siap untuk pengiriman hari ini.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false,
      priority: "high",
    },
    {
      id: "2",
      type: "promotion",
      title: "Flash Sale 30% - Koleksi Tradisional",
      message:
        "Dapatkan diskon hingga 30% untuk semua perhiasan tradisional Indonesia. Berlaku sampai akhir bulan!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      priority: "medium",
    },
    {
      id: "3",
      type: "appointment",
      title: "Reminder: Konsultasi Besok",
      message:
        "Jangan lupa konsultasi desain perhiasan Anda besok pukul 14:00 di showroom Kemang.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isRead: true,
      priority: "high",
    },
    {
      id: "4",
      type: "system",
      title: "Profil Anda Telah Diperbarui",
      message: "Informasi kontak dan preferensi desain Anda berhasil disimpan.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      isRead: true,
      priority: "low",
    },
    {
      id: "5",
      type: "community",
      title: "Desain Baru: Koleksi Nusantara",
      message:
        "Lihat koleksi terbaru kami yang terinspirasi dari keindahan alam Indonesia.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      isRead: false,
      priority: "medium",
    },
    {
      id: "6",
      type: "payment",
      title: "Pembayaran Berhasil Diterima",
      message:
        "Terima kasih! Pembayaran untuk pesanan #JD2024001 sebesar Rp 15.500.000 telah kami terima.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      priority: "medium",
    },
    {
      id: "7",
      type: "order",
      title: "Pesanan Dalam Proses Pembuatan",
      message:
        "Kalung custom Anda sedang dalam tahap setting batu mulia. Estimasi selesai 5 hari lagi.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isRead: true,
      priority: "low",
    },
    {
      id: "8",
      type: "promotion",
      title: "Program Loyalitas Baru!",
      message:
        "Bergabunglah dengan program VIP kami dan dapatkan benefit eksklusif serta diskon khusus.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      isRead: false,
      priority: "medium",
    },
  ]);

  const [filter, setFilter] = useState<
    | "all"
    | "unread"
    | "order"
    | "promotion"
    | "appointment"
    | "system"
    | "community"
    | "payment"
  >("all");

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package className="h-5 w-5" />;
      case "promotion":
        return <Gift className="h-5 w-5" />;
      case "appointment":
        return <Calendar className="h-5 w-5" />;
      case "system":
        return <Shield className="h-5 w-5" />;
      case "community":
        return <Users className="h-5 w-5" />;
      case "payment":
        return <CreditCard className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "order":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "promotion":
        return "bg-green-100 text-green-600 border-green-200";
      case "appointment":
        return "bg-purple-100 text-purple-600 border-purple-200";
      case "system":
        return "bg-gray-100  border-gray-200";
      case "community":
        return "bg-orange-100 text-orange-600 border-orange-200";
      case "payment":
        return "bg-emerald-100 text-emerald-600 border-emerald-200";
      default:
        return "bg-gray-100  border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} menit yang lalu`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} jam yang lalu`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} hari yang lalu`;
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.isRead;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div className="mx-10 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="rounded-full bg-blue-100 p-3">
                  <Bell className="h-8 w-8 text-blue-600" />
                </div>
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
                    <span className="text-xs font-bold text-white">{unreadCount}</span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold">Notifikasi</h1>
                <p className="">
                  {unreadCount > 0
                    ? `${unreadCount} notifikasi belum dibaca`
                    : "Semua notifikasi sudah dibaca"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <Check className="mr-2 h-4 w-4" />
                Tandai Semua Dibaca
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className="relative"
            >
              Semua
              <Badge variant="secondary" className="ml-2 text-xs">
                {notifications.length}
              </Badge>
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
              className="relative"
            >
              Belum Dibaca
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
            <Button
              variant={filter === "order" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("order")}
            >
              <Package className="mr-1 h-4 w-4" />
              Pesanan
            </Button>
            <Button
              variant={filter === "promotion" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("promotion")}
            >
              <Gift className="mr-1 h-4 w-4" />
              Promo
            </Button>
            <Button
              variant={filter === "community" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("community")}
            >
              <Users className="mr-1 h-4 w-4" />
              Komunitas
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="py-12 text-center">
              <CardContent>
                <Bell className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold">Tidak Ada Notifikasi</h3>
                <p className="">
                  {filter === "unread"
                    ? "Semua notifikasi sudah dibaca"
                    : "Belum ada notifikasi untuk kategori ini"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  !notification.isRead ? "border-l-4 border-l-blue-500" : ""
                }`}
                onClick={() => !notification.isRead && markAsRead(notification.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`rounded-full border p-3 ${getNotificationColor(notification.type)}`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <h3
                              className={`font-semibold ${!notification.isRead ? "" : ""}`}
                            >
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            )}
                            <div
                              className={`h-2 w-2 rounded-full ${getPriorityColor(notification.priority)}`}
                            ></div>
                          </div>
                          <p
                            className={`text-sm leading-relaxed ${!notification.isRead ? "" : ""}`}
                          >
                            {notification.message}
                          </p>
                          <div className="mt-3 flex items-center gap-4">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              {formatTimeAgo(notification.timestamp)}
                            </div>
                            <Badge variant="outline" className="text-xs capitalize">
                              {notification.type}
                            </Badge>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              className="h-8 w-8 p-0"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        {filteredNotifications.length > 0 && (
          <div className="mt-8">
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-blue-900">Aksi Cepat</h3>
                      <p className="text-sm text-blue-700">
                        Kelola notifikasi Anda dengan mudah
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Favorit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Feedback
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
