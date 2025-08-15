import { type Municipality } from "./philippines-data";

export interface UserAuth {
  phoneNumber: string;
  isAuthenticated: boolean;
  authenticatedAt: string;
}

export interface UserProfile extends UserAuth {
  locations?: Municipality[];
  onboardingCompleted?: boolean;
  onboardingCompletedAt?: string;
}

export const AUTH_STORAGE_KEY = "pulsePhAuth";
export const PROFILE_STORAGE_KEY = "pulsePhUserProfile";
export const LOCATION_STORAGE_KEY = "pulsePhLocation"; // This is legacy, locations are in profile

/**
 * Get authentication data from localStorage
 */
export const getAuthData = (): UserAuth | null => {
  if (typeof window === "undefined") return null;

  try {
    const authData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!authData) return null;

    const parsed = JSON.parse(authData);

    // Validate the structure
    if (
      parsed?.isAuthenticated &&
      parsed?.phoneNumber &&
      parsed?.authenticatedAt
    ) {
      return parsed as UserAuth;
    }

    return null;
  } catch (error) {
    console.error("Error parsing auth data:", error);
    return null;
  }
};

/**
 * Get user profile data from localStorage
 */
export const getUserProfile = (): UserProfile | null => {
  if (typeof window === "undefined") return null;

  try {
    const profileData = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!profileData) return null;

    return JSON.parse(profileData) as UserProfile;
  } catch (error) {
    console.error("Error parsing profile data:", error);
    return null;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const authData = getAuthData();
  return authData?.isAuthenticated === true;
};

/**
 * Check if user has completed onboarding
 */
export const hasCompletedOnboarding = (): boolean => {
  const profile = getUserProfile();
  return profile?.onboardingCompleted === true;
};

/**
 * Save authentication data
 */
export const saveAuthData = (authData: UserAuth): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
};

/**
 * Save user profile data
 */
export const saveUserProfile = (profileData: UserProfile): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
};

/**
 * Clear all authentication and profile data
 */
export const clearAuthData = (): void => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(PROFILE_STORAGE_KEY);
  localStorage.removeItem(LOCATION_STORAGE_KEY);
};

/**
 * Get the appropriate redirect URL based on user state
 */
export const getRedirectUrl = (): string => {
  if (!isAuthenticated()) {
    return "/auth";
  }

  if (!hasCompletedOnboarding()) {
    return "/onboarding";
  }

  // In a real app, this would be the dashboard
  return "/dashboard";
};
