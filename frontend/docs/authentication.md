# Authentication Feature

This document provides an overview of the authentication feature in the PulsePH frontend application.

## Overview

The authentication system is based on phone number verification using a one-time password (OTP). It is designed to be simple and secure, providing a seamless login experience for users in the Philippines.

## Core Components

### 1. Authentication Page (`app/auth/page.tsx`)

This is the main user interface for the authentication flow. It is a client-side component that handles both phone number input and OTP verification.

**Key Features:**

-   **Phone Number Input:**
    -   Validates that the phone number is a valid Philippine mobile number (starts with `+63 9`).
    -   Formats the phone number as the user types for better readability.
    -   Prevents submission of invalid phone numbers.
-   **OTP Verification:**
    -   After a valid phone number is submitted, the UI switches to an OTP input screen.
    -   A 6-digit OTP is simulated and displayed in the console for testing purposes.
    -   The user enters the OTP to complete the verification.
-   **State Management:**
    -   The component manages the current step of the authentication flow (`phone` or `otp`).
    -   It also handles loading states and displays relevant error messages to the user.
-   **Redirection:**
    -   Upon successful OTP verification, the user's authentication data is saved, and they are redirected to the `/onboarding` page.

### 2. Authentication Utilities (`lib/auth-utils.ts`)

This module provides a set of utility functions for managing authentication and user profile data in `localStorage`.

**Data Structures:**

-   `UserAuth`: An interface defining the basic authentication data, including `phoneNumber`, `isAuthenticated`, and `authenticatedAt`.
-   `UserProfile`: An extension of `UserAuth` that includes additional user data like `locations` and `onboardingCompleted`.

**Key Functions:**

-   `getAuthData()`: Retrieves and validates the user's authentication data from `localStorage`.
-   `getUserProfile()`: Retrieves the user's profile data from `localStorage`.
-   `saveAuthData(authData)`: Saves the user's authentication data to `localStorage`.
-   `saveUserProfile(profileData)`: Saves the user's profile data to `localStorage`.
-   `clearAuthData()`: Clears all authentication and profile data from `localStorage`, effectively logging the user out.
-   `isAuthenticated()`: A boolean function to quickly check if the user is authenticated.
-   `hasCompletedOnboarding()`: A boolean function to check if the user has completed the onboarding process.
-   `getRedirectUrl()`: Determines the appropriate page to redirect the user to based on their authentication and onboarding status.

## Authentication Flow

1.  A new or unauthenticated user is directed to the `/auth` page.
2.  The user enters their Philippine mobile number.
3.  The application simulates sending an OTP to the user's phone. In the current implementation, the OTP is logged to the console for demonstration purposes.
4.  The user enters the 6-digit OTP.
5.  If the OTP is correct, the `saveAuthData` function is called to store the authentication state in `localStorage`.
6.  The user is then redirected to the `/onboarding` page to complete their profile setup.

## Storage

Authentication and user profile data are stored in the browser's `localStorage` under the following keys:

-   `pulsePhAuth`: Stores the `UserAuth` object.
-   `pulsePhUserProfile`: Stores the `UserProfile` object.

This allows the application to persist the user's session across browser tabs and sessions.
