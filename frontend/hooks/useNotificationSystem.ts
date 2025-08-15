import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface NotificationOptions {
  title?: string;
  message: string;
  time?: string;
  duration?: number;
  clickToNavigate?: string;
  onCustomClick?: () => void;
}

/**
 * Hook for showing notifications that can be used anywhere in the app
 * Provides a simple interface for triggering notifications
 */
export function useNotificationSystem() {
  const router = useRouter();

  const showMessageNotification = useCallback(
    (options: NotificationOptions) => {
      // For browsers that support Web Notifications
      if ("Notification" in window) {
        // Check permission
        if (Notification.permission === "granted") {
          const notification = new Notification(options.title || "PulsePH", {
            body: options.message,
            icon: "/favicon.ico", // You can customize this
            tag: "pulse-ph-message", // Prevents multiple notifications
          });

          notification.onclick = () => {
            notification.close();
            if (options.clickToNavigate) {
              router.push(options.clickToNavigate);
            } else if (options.onCustomClick) {
              options.onCustomClick();
            }
            // Focus the window
            window.focus();
          };

          // Auto close after duration
          setTimeout(() => {
            notification.close();
          }, options.duration || 5000);
        } else if (Notification.permission !== "denied") {
          // Request permission
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              // Retry showing notification
              showMessageNotification(options);
            }
          });
        }
      }
    },
    [router]
  );

  const requestNotificationPermission = useCallback(async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return false;
  }, []);

  return {
    showMessageNotification,
    requestNotificationPermission,
    isNotificationSupported: "Notification" in window,
    notificationPermission:
      "Notification" in window ? Notification.permission : "unsupported",
  };
}
