# Location Services

This document provides an overview of the location-based services and utilities used in the PulsePH frontend application. These services are crucial for the onboarding process, where users select a location to receive notifications.

## Overview

Location services in this application are responsible for three main tasks:

1.  Determining the user's current geographical coordinates.
2.  Fetching a list of available municipalities from the backend.
3.  Finding the nearest municipality to the user's current location based on a local dataset.

## Core Components

### 1. `useGeolocation` Hook (`hooks/useGeolocation.ts`)

This hook is a wrapper around the browser's `Geolocation API`. It provides a simple way to get the user's current latitude and longitude.

**Key Features:**

-   **Get Current Location:** It exposes a `getCurrentLocation` function to request the user's current position.
-   **State Management:** It manages the loading state while fetching the location and any errors that occur, such as the user denying the location permission.
-   **Automatic Request:** By default, it requests the user's location as soon as it is mounted.

### 2. `useLocationNames` Hook (`hooks/useLocationNames.ts`)

This hook is responsible for fetching the list of all available LGU (municipality) names from the backend API.

**Key Features:**

-   **API Fetching:** It calls the `fetchLocationNames` API function to get the list of locations.
-   **State Management:** It manages the loading and error states for the API request.
-   **Data Caching:** The fetched location names are stored in the component's state to avoid redundant API calls.

### 3. Locations API (`lib/api/locations.ts`)

This module handles the direct communication with the backend API for location-related data.

**Key Functions:**

-   `fetchLocationNames()`: Makes a `GET` request to the `/lgus/names` endpoint to retrieve a simple array of municipality names.
-   **Fallback Mechanism:** If the API call fails, it returns a hardcoded list of sample locations to ensure the application remains usable.

### 4. Location Utilities (`lib/location-utils.ts`)

This module contains helper functions for performing location-based calculations using a local dataset of Philippine municipalities.

**Key Functions:**

-   `findNearestMunicipality(latitude, longitude)`: This is the core function of the module. It takes a user's coordinates and iterates through the local `philippineMunicipalities` data to find the one with the shortest distance. The distance is calculated using the Haversine formula.
-   `isWithinPhilippines(latitude, longitude)`: A utility function to perform a basic check if the given coordinates are within the geographical bounds of the Philippines.

### 5. Philippines Data (`lib/philippines-data.ts`)

This file contains a sample dataset of Philippine municipalities, including their names, provinces, regions, and, most importantly, their latitude and longitude.

**Key Aspects:**

-   **`Municipality` Interface:** Defines the structure for each municipality object.
-   **`philippineMunicipalities` Array:** A hardcoded array of `Municipality` objects. This dataset is used by `location-utils.ts` to find the nearest municipality without needing an external API for reverse geocoding.
-   **Data Source:** This serves as a local, offline-first database for municipality information.

## Location Services Flow

This flow is primarily used during the **onboarding process**:

1.  The `OnboardingPage` mounts the `useGeolocation` hook, which prompts the user for location access.
2.  If the user grants permission, the hook gets the user's `latitude` and `longitude`.
3.  The `OnboardingPage` then calls `findNearestMunicipality` with the user's coordinates.
4.  This utility function calculates the distance to every municipality in the `philippineMunicipalities` list and returns the closest one.
5.  The name of the nearest municipality is then displayed to the user as a suggestion in the `LocationSelector` component.
6.  Separately, the `LocationSelector` component uses the `useLocationNames` hook to fetch the full list of available municipalities from the backend API to populate the searchable dropdown menu.
