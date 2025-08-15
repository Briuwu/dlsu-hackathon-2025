import React from "react";
import { MessageCircle } from "lucide-react";

export function OnboardingHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
        <MessageCircle className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-text">PulsePH</h1>
      <p className="text-sm text-text-secondary mt-2">
        Feel the heartbeat of your local community
      </p>
      <p className="text-xs text-text-muted">
        Step 2 of 2: Choose your location
      </p>
    </div>
  );
}
