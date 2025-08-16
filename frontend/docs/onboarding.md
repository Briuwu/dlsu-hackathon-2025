# Onboarding Feature

This document provides an overview of the user onboarding feature in the PulsePH frontend application.

## Overview

The onboarding process is the second and final step for users after they have successfully authenticated their phone number. The primary goal of onboarding is to have the user select a location (municipality) for which they want to receive local government unit (LGU) announcements.

## Core Components

### 1. Onboarding Page (`app/onboarding/page.tsx`)

This is the main page for the onboarding flow. It orchestrates the entire process, from location selection to confirmation and completion.

**Key Features:**

-   **Authentication Check:** On mount, it verifies that the user is authenticated. If not, it redirects them to the `/auth` page.
-   **Step Management:** It manages the current step of the onboarding process, which can be `location`, `confirmation`, or `complete`.
-   **Geolocation:** It uses the `useGeolocation` hook to attempt to automatically detect the user's location and suggest a nearby municipality.
-   **State Handling:** It manages the user's selected locations, loading states, and any errors that may occur during the process.
-   **API Integration:** On completion, it calls the `createUser` API to save the user's selected locations to the backend.
-   **Profile Management:** After a successful API call, it updates the user's profile in `localStorage` to mark onboarding as complete using the `saveUserProfile` utility.
-   **Completion:** Once onboarding is complete, it displays a success message and triggers the initial fetching of messages for the user's selected location.

### 2. Onboarding Header (`components/onboarding/OnboardingHeader.tsx`)

This is a simple presentational component that displays a consistent header for the onboarding screens, including the application name and a brief description of the current step.

### 3. Location Selector (`components/onboarding/LocationSelector.tsx`)

This component provides the user interface for selecting a municipality.

**Key Features:**

-   **Location Loading:** It uses the `useLocationNames` hook to fetch a list of available municipalities from the API.
-   **Auto-detection Display:** If a location is auto-detected via geolocation, it is prominently displayed as a suggestion.
-   **Search and Filter:** It includes a searchable combobox that allows users to easily find their desired municipality from the list.
-   **Selection Management:** It allows the user to select one location. The current implementation is for a single location selection.
-   **Selected Location Preview:** It displays the currently selected location, making it clear to the user what they have chosen.

### 4. Location Confirmation (`components/onboarding/LocationConfirmation.tsx`)

This component is the final step before completing the onboarding process. It summarizes the user's selected location and explains the types of notifications they will receive.

**Key Features:**

-   **Summary:** It clearly displays the location the user has selected.
-   **Notification Examples:** It shows examples of the types of announcements the user can expect, such as class suspensions, local announcements, and emergency alerts.
-   **Confirmation Action:** It provides the final confirmation button that, when clicked, triggers the API call to save the user's preferences.
-   **Go Back Option:** It allows the user to go back to the location selection step if they want to make a change.

## Onboarding Flow

1.  After successful authentication, the user is redirected to the `/onboarding` page.
2.  The application attempts to get the user's geolocation to suggest a nearby municipality.
3.  The user is presented with the `LocationSelector` component, where they can either choose the auto-detected location or manually search for and select a different one.
4.  Once a location is selected, the user clicks "Continue", which takes them to the `LocationConfirmation` step.
5.  The user reviews their selected location and the types of notifications they will receive.
6.  The user clicks "Start Receiving Notifications" to complete the process.
7.  The application saves the user's location preferences to the backend and updates their local profile.
8.  The onboarding is marked as complete, and the user is shown a success message.
9.  The application then begins to fetch messages for the newly subscribed location.
