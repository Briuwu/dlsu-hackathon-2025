"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { IOSNotification } from "@/components/ui/ios-notification";

interface NotificationData {
  id: string;
  title?: string;
  message: string;
  appIcon?: string;
  time?: string;
  duration?: number;
  clickAction?: "navigate" | "custom";
  navigateTo?: string;
  onCustomClick?: () => void;
}

interface NotificationContextType {
  showNotification: (notification: Omit<NotificationData, "id">) => void;
  hideNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const showNotification = useCallback(
    (notification: Omit<NotificationData, "id">) => {
      const id = Date.now().toString();
      const newNotification: NotificationData = {
        id,
        ...notification,
      };

      setNotifications((prev) => [...prev, newNotification]);

      // Auto-hide after duration (default 5 seconds)
      const duration = notification.duration || 5000;
      setTimeout(() => {
        hideNotification(id);
      }, duration);
    },
    []
  );

  const hideNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const handleNotificationClick = useCallback(
    (notification: NotificationData) => {
      if (notification.clickAction === "navigate" && notification.navigateTo) {
        router.push(notification.navigateTo);
      } else if (
        notification.clickAction === "custom" &&
        notification.onCustomClick
      ) {
        notification.onCustomClick();
      }
      hideNotification(notification.id);
    },
    [router, hideNotification]
  );

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification,
        clearAllNotifications,
      }}
    >
      {children}

      {/* Render notifications */}
      {notifications.map((notification, index) => (
        <IOSNotification
          key={notification.id}
          show={true}
          title={notification.title}
          message={notification.message}
          appIcon={notification.appIcon}
          time={notification.time}
          duration={notification.duration}
          clickable={!!notification.clickAction}
          onClick={() => handleNotificationClick(notification)}
          onHide={() => hideNotification(notification.id)}
          className={index > 0 ? `mt-${index * 2}` : ""}
        />
      ))}
    </NotificationContext.Provider>
  );
}

export function useNotification(): NotificationContextType {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
