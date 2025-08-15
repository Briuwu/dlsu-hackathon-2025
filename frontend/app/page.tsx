"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotification } from "@/contexts/NotificationContext";
import { useNotificationSystem } from "@/hooks/useNotificationSystem";

export default function HomePage() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const {
    requestNotificationPermission,
    isNotificationSupported,
    notificationPermission,
  } = useNotificationSystem();

  const [permissionGranted, setPermissionGranted] = useState(
    isNotificationSupported && notificationPermission === "granted"
  );

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setPermissionGranted(granted);

    if (granted) {
      // Show a test notification
      showNotification({
        title: "PulsePH",
        message:
          "🎉 Notifications enabled! You'll now receive real-time updates.",
        clickAction: "navigate",
        navigateTo: "/messages",
        duration: 4000,
      });
    }
  };

  const handleTestNotification = () => {
    showNotification({
      title: "PulsePH",
      message: "🚨 Test Alert: This is a sample notification from PulsePH.",
      clickAction: "navigate",
      navigateTo: "/messages",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-surface">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-text mb-2">
            Welcome to PulsePH
          </CardTitle>
          <p className="text-text-secondary">
            Real-time notifications for your community
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center space-y-3">
            <p className="text-sm text-text-secondary">
              Get instant alerts about important announcements in your area
            </p>

            {isNotificationSupported ? (
              <>
                {!permissionGranted ? (
                  <Button
                    onClick={handleEnableNotifications}
                    className="w-full bg-accent hover:bg-accent-light text-white"
                  >
                    Enable Notifications
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-success">
                      ✅ Notifications enabled!
                    </p>
                    <Button
                      onClick={handleTestNotification}
                      variant="outline"
                      className="w-full"
                    >
                      Test Notification
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-warning">
                ⚠️ Your browser doesn&apos;t support notifications
              </p>
            )}

            <div className="pt-4 space-y-2">
              <Button
                onClick={() => router.push("/auth")}
                className="w-full bg-accent hover:bg-accent-light text-white"
              >
                Get Started
              </Button>

              <Button
                onClick={() => router.push("/messages")}
                variant="outline"
                className="w-full"
              >
                View Messages
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
