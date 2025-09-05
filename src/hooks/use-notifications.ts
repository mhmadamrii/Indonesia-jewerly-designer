import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotification,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "~/actions/notification.action";

export function useNotifications() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["notifications"] });

  const { mutateAsync: markRead } = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: invalidate,
  });

  const { mutateAsync: markAllRead } = useMutation({
    mutationFn: () => markAllNotificationsRead(),
    onSuccess: invalidate,
  });

  const { mutateAsync: remove } = useMutation({
    mutationFn: deleteNotification,
    onSuccess: invalidate,
  });

  const notifications = data?.data ?? [];
  const unreadCount = notifications.filter(
    (n: any) => !n.notification?.isRead && !n.isRead,
  ).length;

  return {
    notifications,
    unreadCount,
    isLoading,
    markRead,
    markAllRead,
    remove,
  };
}
