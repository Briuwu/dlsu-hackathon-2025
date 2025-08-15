import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface IOSNotificationProps {
  show: boolean;
  onHide?: () => void;
  title?: string;
  message: string;
  appIcon?: string;
  time?: string;
  duration?: number;
  className?: string;
}

export const IOSNotification: React.FC<IOSNotificationProps> = ({
  show,
  onHide,
  title = "PulsePH",
  message,
  appIcon,
  time = "now",
  duration = 4000,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 50);

      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          setIsVisible(false);
          onHide?.();
        }, 300);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      // Reset state when show becomes false
      setIsVisible(false);
      setIsAnimating(false);
    }
  }, [show, duration, onHide]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div
        className={cn(
          "bg-white rounded-2xl shadow-lg border border-gray-200 max-w-sm w-full mx-4 transition-all duration-300 transform",
          isAnimating
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-full opacity-0 scale-95",
          className
        )}
        style={{
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <div className="p-4">
          <div className="flex items-start space-x-3">
            {/* App Icon */}
            <div className="flex-shrink-0">
              {appIcon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={appIcon} alt={title} className="w-8 h-8 rounded-lg" />
              ) : (
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">P</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {title}
                </p>
                <span className="text-xs text-gray-500 ml-2">{time}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
            </div>
          </div>
        </div>

        {/* Bottom border accent */}
        <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-2xl opacity-20"></div>
      </div>
    </div>
  );
};

interface NotificationManagerProps {
  notifications: Array<{
    id: string;
    title?: string;
    message: string;
    appIcon?: string;
    time?: string;
    duration?: number;
  }>;
  onNotificationHide?: (id: string) => void;
}

export const NotificationManager: React.FC<NotificationManagerProps> = ({
  notifications,
  onNotificationHide,
}) => {
  return (
    <>
      {notifications.map((notification, index) => (
        <IOSNotification
          key={notification.id}
          show={true}
          title={notification.title}
          message={notification.message}
          appIcon={notification.appIcon}
          time={notification.time}
          duration={notification.duration}
          onHide={() => onNotificationHide?.(notification.id)}
          className={`mt-${index * 2}`}
        />
      ))}
    </>
  );
};
