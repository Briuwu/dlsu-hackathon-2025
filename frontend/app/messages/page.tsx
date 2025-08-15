"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IPhoneStatusBar } from "@/components/ui/iphone-status-bar";
import { IMessageHeader } from "@/components/ui/imessage-header";
import { Conversation } from "@/components/ui/message-bubble";
import { IMessageInput } from "@/components/ui/imessage-input";

interface Message {
  id: string;
  text: string;
  timestamp?: string;
  isFromUser?: boolean;
  isDelivered?: boolean;
  isRead?: boolean;
}

export default function MessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "🚨 CLASS SUSPENSION ALERT: All classes in Marikina City are suspended for today, November 15, 2024 due to heavy rainfall and flooding in several areas. Stay safe! - PulsePH",
      timestamp: "2:30 PM",
      isFromUser: false,
      isDelivered: true,
      isRead: false,
    },
    {
      id: "2",
      text: "📚 SCHOLARSHIP OPPORTUNITY: Marikina City is now accepting applications for the Academic Excellence Scholarship Program. Deadline: November 25, 2024. Apply at City Hall. - PulsePH",
      timestamp: "3:45 PM",
      isFromUser: false,
      isDelivered: true,
      isRead: false,
    },
    {
      id: "3",
      text: "Walang pasok ya uwi kana - PulsePH automated message or sum shi",
      timestamp: "4:07 PM",
      isFromUser: false,
      isDelivered: true,
      isRead: false,
    },
  ]);

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
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      timestamp: currentTime,
      isFromUser: true,
      isDelivered: true,
      isRead: false,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleDetailsClick = () => {
    // Simulate a new PulsePH notification for demo purposes
    simulateNotification();
  };

  const handleCameraClick = () => {
    console.log("Camera clicked");
  };

  const handleMicClick = () => {
    console.log("Mic clicked");
  };

  // Simulate receiving new PulsePH notifications
  const simulateNotification = () => {
    const sampleNotifications = [
      "🌊 FLOOD WARNING: Marikina River water level is rising. Residents near riverbanks please prepare for possible evacuation. - PulsePH",
      "💉 VACCINATION SCHEDULE: Free COVID-19 boosters available at Marikina Sports Center, Nov 16-18. Bring valid ID. - PulsePH",
      "🚧 ROAD CLOSURE: JP Rizal Bridge will be closed for maintenance from 10PM-5AM tonight. Use alternate routes. - PulsePH",
      "🎓 JOB FAIR: Marikina City Job Fair on November 20, 2024 at Riverbanks Mall. 100+ job opportunities available! - PulsePH",
      "⚡ POWER INTERRUPTION: Scheduled power maintenance in Barangay Sta. Elena tomorrow 8AM-12PM. - PulsePH",
    ];

    const randomNotification =
      sampleNotifications[
        Math.floor(Math.random() * sampleNotifications.length)
      ];
    const newMessage: Message = {
      id: Date.now().toString(),
      text: randomNotification,
      timestamp: currentTime,
      isFromUser: false,
      isDelivered: true,
      isRead: false,
    };
    setMessages((prev) => [...prev, newMessage]);
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

      {/* iMessage Header */}
      <IMessageHeader
        contactName="PulsePH"
        onBackClick={handleBackClick}
        onDetailsClick={handleDetailsClick}
      />

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
