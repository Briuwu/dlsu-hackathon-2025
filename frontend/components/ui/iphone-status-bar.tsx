import React from "react";

interface iPhoneStatusBarProps {
  carrier?: string;
  connectionType?: string;
  time?: string;
  batteryLevel?: number;
  showBatteryPercentage?: boolean;
}

export const IPhoneStatusBar: React.FC<iPhoneStatusBarProps> = ({
  carrier = "Sprint",
  connectionType = "LTE",
  time = "4:08 PM",
  batteryLevel = 75,
  showBatteryPercentage = true,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-2 bg-white text-black text-sm font-medium h-11">
      {/* Left side - Carrier and Signal */}
      <div className="flex items-center space-x-1">
        <div className="flex items-center space-x-1">
          {/* Signal bars */}
          <div className="flex items-end space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-2 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-4 bg-black rounded-full"></div>
            <div className="w-1 h-4 bg-black rounded-full"></div>
          </div>
          <span className="text-black font-normal">{carrier}</span>
          <span className="text-black font-normal">{connectionType}</span>
        </div>
      </div>

      {/* Center - Time */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <span className="text-black font-semibold">{time}</span>
      </div>

      {/* Right side - Battery */}
      <div className="flex items-center space-x-1">
        {showBatteryPercentage && (
          <span className="text-black font-normal">{batteryLevel}%</span>
        )}
        <div className="relative">
          <div className="w-6 h-3 border border-black rounded-sm">
            <div
              className="h-full bg-black rounded-sm transition-all"
              style={{ width: `${batteryLevel}%` }}
            ></div>
          </div>
          <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-black rounded-r"></div>
        </div>
      </div>
    </div>
  );
};
