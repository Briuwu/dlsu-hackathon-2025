import React from "react";
import { ChevronLeft } from "lucide-react";

interface iMessageHeaderProps {
  contactName?: string;
  onBackClick?: () => void;
  onDetailsClick?: () => void;
}

export const IMessageHeader: React.FC<iMessageHeaderProps> = ({
  contactName = "PulsePH",
  onBackClick,
  onDetailsClick,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      {/* Left side - Back button and Messages */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onBackClick}
          className="flex items-center text-blue-500 font-normal"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span className="text-lg">Messages</span>
        </button>
      </div>

      {/* Center - Contact Name */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-black font-semibold text-lg">{contactName}</span>
      </div>

      {/* Right side - Details */}
      <button
        onClick={onDetailsClick}
        className="text-blue-500 font-normal text-lg hover:text-blue-700 transition-colors"
        title="Simulate new notification"
      >
        Details
      </button>
    </div>
  );
};
