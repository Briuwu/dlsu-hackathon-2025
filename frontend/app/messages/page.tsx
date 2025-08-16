"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IPhoneStatusBar } from "@/components/ui/iphone-status-bar";
import { IMessageHeader } from "@/components/ui/imessage-header";
import { Conversation } from "@/components/ui/message-bubble";
import { IMessageInput } from "@/components/ui/imessage-input";
import { useMessages } from "@/hooks/useMessages";
import { getMobileNumber } from "@/lib/auth-utils";

export default function MessagesPage() {
  const router = useRouter();

  // Get mobile number from localStorage
  const mobileNumber = getMobileNumber();

  // Redirect to auth if no mobile number is found
  useEffect(() => {
    if (!mobileNumber) {
      router.push("/auth");
    }
  }, [mobileNumber, router]);

  // Use the custom hook for message management
  const { messages, error, isPolling, refetch } = useMessages({
    mobileNumber,
    pollInterval: 5000, // Fetch every 5 seconds
    autoMarkAsRead: false, // Don't auto-mark as read for demo
    showNotifications: false, // Disable notifications when on messages page
  });

  const [currentTime, setCurrentTime] = useState("4:08 PM");

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (message: string) => {
    // For now, just log the message since we're focusing only on fetching
    console.log("Message to send:", message);
    // In the future, this would use the sendNewMessage function from the hook
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleDetailsClick = () => {
    // Manually refetch messages
    refetch();
  };

  const handleCameraClick = () => {
    console.log("Camera clicked");
  };

  const handleMicClick = () => {
    console.log("Mic clicked");
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-sm mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg">
      {/* iPhone Status Bar */}
      <IPhoneStatusBar
        carrier="Sprint"
        connectionType="LTE"
        time={currentTime}
        batteryLevel={75}
        showBatteryPercentage={true}
      />

      {/* iMessage Header with polling indicator */}
      <IMessageHeader
        contactName={`PulsePH ${isPolling ? "🟢" : "🔴"}`}
        onBackClick={handleBackClick}
        onDetailsClick={handleDetailsClick}
      />

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-2 mx-4 mt-2 rounded-md">
          <p className="text-red-700 text-xs">{error}</p>
          <button
            onClick={refetch}
            className="text-red-600 text-xs underline mt-1"
          >
            Retry
          </button>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-white">
        <Conversation messages={messages} />
      </div>

      {/* Input Area */}
      <IMessageInput
        onSendMessage={handleSendMessage}
        onCameraClick={handleCameraClick}
        onMicClick={handleMicClick}
        placeholder="Message"
      />
    </div>
  );
}
