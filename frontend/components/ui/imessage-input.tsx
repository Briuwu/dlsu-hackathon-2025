import React, { useState } from "react";
import { Camera, Mic, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface iMessageInputProps {
  onSendMessage?: (message: string) => void;
  onCameraClick?: () => void;
  onMicClick?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const IMessageInput: React.FC<iMessageInputProps> = ({
  onSendMessage,
  onCameraClick,
  onMicClick,
  placeholder = "iMessage",
  disabled = false,
  className,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        "flex items-center px-4 py-3 bg-white border-t border-gray-200",
        className
      )}
    >
      {/* Camera Button */}
      <button
        onClick={onCameraClick}
        disabled={disabled}
        className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
      >
        <Camera className="w-6 h-6" />
      </button>

      {/* Message Input Container */}
      <div className="flex-1 mx-3 relative">
        <div className="flex items-center bg-gray-100 rounded-full border border-gray-200 focus-within:border-blue-300 transition-colors">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="flex-1 px-4 py-2 bg-transparent border-none outline-none resize-none text-base placeholder-gray-500 min-h-[36px] max-h-[100px]"
            style={{
              height: "auto",
              minHeight: "36px",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = target.scrollHeight + "px";
            }}
          />

          {/* Send/Mic Button */}
          {message.trim() ? (
            <button
              onClick={handleSend}
              disabled={disabled}
              className="flex items-center justify-center w-8 h-8 mr-2 text-blue-500 hover:text-blue-700 transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onMicClick}
              disabled={disabled}
              className="flex items-center justify-center w-8 h-8 mr-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
