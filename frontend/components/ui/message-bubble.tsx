import React from "react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: string;
  timestamp?: string;
  isFromUser?: boolean;
  isDelivered?: boolean;
  isRead?: boolean;
  className?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  timestamp,
  isFromUser = false,
  isDelivered = true,
  isRead = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isFromUser ? "justify-end" : "justify-start",
        className
      )}
    >
      <div className="max-w-[70%] min-w-0">
        <div
          className={cn(
            "px-4 py-2 rounded-2xl text-base leading-relaxed",
            isFromUser
              ? "bg-blue-500 text-white rounded-br-md"
              : "bg-gray-200 text-black rounded-bl-md"
          )}
        >
          {message}
        </div>

        {timestamp && (
          <div
            className={cn(
              "text-xs text-gray-500 mt-1 px-2",
              isFromUser ? "text-right" : "text-left"
            )}
          >
            {timestamp}
            {isFromUser && (
              <span className="ml-1">
                {isRead ? "Read" : isDelivered ? "Delivered" : "Sending..."}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface ConversationProps {
  messages: {
    id: string;
    text: string;
    timestamp?: string;
    isFromUser?: boolean;
    isDelivered?: boolean;
    isRead?: boolean;
  }[];
  className?: string;
}

export const Conversation: React.FC<ConversationProps> = ({
  messages,
  className,
}) => {
  // Ensure messages is always an array
  const safeMessages = Array.isArray(messages) ? messages : [];

  return (
    <div className={cn("flex flex-col px-4 py-4 space-y-2", className)}>
      {safeMessages
        .filter((message) => message && message.id && message.text)
        .map((message) => (
          <MessageBubble
            key={message.id}
            message={message.text}
            timestamp={message.timestamp}
            isFromUser={message.isFromUser}
            isDelivered={message.isDelivered}
            isRead={message.isRead}
          />
        ))}
    </div>
  );
};
