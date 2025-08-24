type NotificationType =
  | "order"
  | "promotion"
  | "appointment"
  | "system"
  | "community"
  | "sold"
  | "payment";

export function createNotificationMessage(
  type: NotificationType,
  message: string,
  from_user: string,
) {
  switch (type) {
    case "order":
      return `Order: ${from_user} orders ${message}`;

    case "promotion":
      return `Promotion: 🎉 Congratulations! You have received a ${message} promotion 🎉`;

    case "appointment":
      return `Appointment: ${message}`;

    case "system":
      return `System: ${message}`;

    case "community":
      return `Community: ${message}`;

    case "sold":
      return `Sold: ${from_user} buys ${message}`;

    case "payment":
      return `Payment: ${message}`;

    default:
      return `Notification: ${message}`;
  }
}
