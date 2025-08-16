"use client";

import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Loader2, CheckCircle } from "lucide-react";
import { LocationSelector } from "@/components/onboarding/LocationSelector";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { LocationConfirmation } from "@/components/onboarding/LocationConfirmation";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useNotification } from "@/contexts/NotificationContext";
import { useMessages } from "@/hooks/useMessages";
import { findNearestMunicipality } from "@/lib/location-utils";
import { createUser } from "@/lib/api/users";
import {
  getAuthData,
  saveUserProfile,
  getUserProfile,
  hasCompletedOnboarding,
  getMobileNumber,
  type UserAuth,
  type UserProfile,
} from "@/lib/auth-utils";

type OnboardingStep = "location" | "confirmation" | "complete";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("location");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userAuth, setUserAuth] = useState<UserAuth | null>(null);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [autoDetectedLocation, setAutoDetectedLocation] = useState<
    string | null
  >(null);
  const [notificationShown, setNotificationShown] = useState(false);
  const [shouldFetchMessages, setShouldFetchMessages] = useState(false);

  const { showNotification } = useNotification();

  // Get mobile number from localStorage
  const mobileNumber = getMobileNumber();

  // Only fetch messages after onboarding is submitted
  const { messages: fetchedMessages } = useMessages({
    mobileNumber: shouldFetchMessages && mobileNumber ? mobileNumber : "", // Use mobile number from localStorage if available
    pollInterval: 60000, // Very slow polling (1 minute) - essentially one-time fetch for testing
    autoMarkAsRead: false,
    showNotifications: false, // Don't show notifications on onboarding
  });

  const {
    coordinates,
    error: geoError,
    loading: geoLoading,
    getCurrentLocation,
  } = useGeolocation();

  // Check authentication state on mount
  useEffect(() => {
    const authData = getAuthData();
    if (!authData) {
      window.location.href = "/auth";
      return;
    }

    setUserAuth(authData);

    if (hasCompletedOnboarding()) {
      setIsReturningUser(true);
      const existingProfile = getUserProfile();
      if (existingProfile?.locations && existingProfile.locations.length > 0) {
        // Ensure locations are strings (handle legacy Municipality objects)
        const locationStrings = existingProfile.locations.map((location) => {
          // If it's a string, return as-is; if it's a Municipality object, extract the name
          if (typeof location === "string") {
            return location;
          } else if (
            typeof location === "object" &&
            location !== null &&
            "name" in location
          ) {
            return (location as { name: string }).name;
          } else {
            return String(location);
          }
        });
        setSelectedLocations(locationStrings);
        setCurrentStep("confirmation");
      }
    }
  }, []);

  // Auto-detect location when coordinates are available
  useEffect(() => {
    if (coordinates) {
      const nearest = findNearestMunicipality(
        coordinates.latitude,
        coordinates.longitude
      );
      // Extract just the name from the Municipality object
      setAutoDetectedLocation(nearest ? nearest.name : null);
    }
  }, [coordinates]);

  // Handle completion flow: show notification with real data after 2s (no auto-redirect)
  useEffect(() => {
    if (
      currentStep === "complete" &&
      fetchedMessages.length > 0 &&
      !notificationShown
    ) {
      // Show notification after 2 seconds, but only if we have real messages and haven't shown it yet
      const notificationTimer = setTimeout(() => {
        // Get the latest message (most recent one)
        const latestMessage = fetchedMessages[fetchedMessages.length - 1];

        showNotification({
          title: "PulsePH",
          message: latestMessage.text,
          time: latestMessage.timestamp || "now",
          clickAction: "navigate",
          navigateTo: "/messages",
          duration: 6000, // Show longer since no auto-redirect
        });

        setNotificationShown(true); // Mark as shown to prevent duplicates
      }, 2000);

      return () => {
        clearTimeout(notificationTimer);
      };
    }
  }, [currentStep, fetchedMessages, showNotification, notificationShown]);

  const handleGoToConfirmation = () => {
    if (selectedLocations.length === 0) {
      setError("Please select at least one location.");
      return;
    }
    setError("");
    setCurrentStep("confirmation");
  };

  const handleComplete = async () => {
    if (selectedLocations.length === 0 || !userAuth) return;

    setLoading(true);
    setError("");

    try {
      // Call the API to create/update user with subscribed LGUs
      const apiResponse = await createUser({
        number: userAuth.phoneNumber,
        subscribed_lgus: selectedLocations,
      });

      if (!apiResponse.success) {
        throw new Error(apiResponse.message || "Failed to save user data");
      }

      // Save profile locally after successful API call
      const userProfile: UserProfile = {
        ...userAuth,
        locations: selectedLocations,
        onboardingCompleted: true,
        onboardingCompletedAt: new Date().toISOString(),
      };

      saveUserProfile(userProfile);

      // Start fetching messages now that onboarding is complete
      setShouldFetchMessages(true);

      setCurrentStep("complete");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to save profile. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRetryLocation = () => {
    setError("");
    getCurrentLocation();
  };

  if (!userAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-0 bg-surface">
          <CardContent className="text-center py-12">
            <Loader2 className="w-8 h-8 text-accent mx-auto mb-4 animate-spin" />
            <p className="text-text-secondary">Checking authentication...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === "complete") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-0 bg-surface">
          <CardContent className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-text mb-2">All Set!</h2>
            <p className="text-text-secondary mb-6">
              You&apos;ll now receive notifications for your selected locations.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <OnboardingHeader />

        <Card className="shadow-lg border-0 bg-surface">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-xl text-text">
              <MapPin className="w-5 h-5" />
              {currentStep === "location"
                ? isReturningUser
                  ? "Update Your Locations"
                  : "Choose Your Locations"
                : "Confirm Locations"}
            </CardTitle>
            <CardDescription className="text-text-secondary">
              {currentStep === "location"
                ? "Select a municipality to receive relevant local announcements."
                : "We'll send you notifications for this location."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="bg-error/10 border border-error/20 rounded-md p-3 text-sm text-error">
                {error}
              </div>
            )}

            {geoError && (
              <div className="bg-warning/10 border border-warning/20 rounded-md p-3">
                <p className="text-sm text-warning mb-2">
                  📍 Location access denied or unavailable
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRetryLocation}
                  className="text-xs border-border text-text hover:bg-surface-raised"
                >
                  Try Again
                </Button>
              </div>
            )}

            {currentStep === "location" ? (
              <>
                <LocationSelector
                  selectedLocations={selectedLocations}
                  onSelectedLocationsChange={setSelectedLocations}
                  autoDetectedLocation={autoDetectedLocation}
                  isLoadingGeo={geoLoading}
                />

                <Button
                  onClick={handleGoToConfirmation}
                  disabled={selectedLocations.length === 0}
                  className="w-full bg-accent hover:bg-accent-light text-white"
                >
                  Continue
                </Button>
              </>
            ) : (
              <LocationConfirmation
                locations={selectedLocations}
                phone={userAuth?.phoneNumber || ""}
                onConfirm={handleComplete}
                onGoBack={() => setCurrentStep("location")}
                loading={loading}
                isReturningUser={isReturningUser}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
