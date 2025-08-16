# Notifications Feature

This document provides an overview of the notification system in the PulsePH frontend application. The system is designed to display iOS-style notifications within the application and leverage the browser's native Web Notifications API.

## Overview

The notification system has two main parts:

1.  **In-App Notifications:** An iOS-style notification component that appears at the top of the screen. This is managed via a React Context.
2.  **Browser Notifications:** Integration with the native `Notification` API of the browser to show notifications even when the application tab is not in focus.

## Core Components

### 1. `NotificationProvider` (`contexts/NotificationContext.tsx`)

This is a React Context provider that manages the state of in-app notifications. It should wrap the entire application (or at least the parts that need to show notifications).

**Key Features:**

-   **State Management:** It maintains an array of active notifications.
-   **`showNotification` Function:** A function that allows any component within the provider to trigger a new notification. It accepts the notification content, duration, and click actions.
-   **`hideNotification` Function:** A function to remove a notification from the screen.
-   **Click Handling:** It can handle clicks on notifications, either by navigating to a specific route using `next/router` or by executing a custom callback function.
-   **Rendering:** It is responsible for rendering the `IOSNotification` components for each active notification.

### 2. `useNotification` Hook (`contexts/NotificationContext.tsx`)

This custom hook provides a simple way for components to access the `NotificationContext` and use its functions (`showNotification`, `hideNotification`). It abstracts the `useContext` logic and ensures the hook is used within a `NotificationProvider`.

### 3. `IOSNotification` Component (`components/ui/ios-notification.tsx`)

This is a presentational component that renders a single notification with an iOS-like appearance.

**Key Features:**

-   **Styling:** It is styled to mimic the look and feel of a native iOS notification, including the app icon, title, message, and time.
-   **Animations:** It includes slide-in and slide-out animations for a smooth user experience.
-   **Auto-hide:** The notification automatically hides itself after a specified duration.
-   **Clickable:** It can be configured to be clickable, which is handled by the `NotificationProvider`.

### 4. `useNotificationSystem` Hook (`hooks/useNotificationSystem.ts`)

This hook provides an interface to the browser's native **Web Notifications API**.

**Key Features:**

-   **`showMessageNotification` Function:** This function creates and displays a native browser notification.
-   **Permission Handling:** It checks for the user's permission to show notifications. If permission has not been granted or denied, it will request it from the user.
-   **Click-to-Navigate:** It can be configured so that clicking the native notification navigates the user to a specific page within the application and focuses the window.
-   **Permission Status:** It exposes the current permission status (`granted`, `denied`, or `default`) and a function to request permission explicitly.

## Notification Flow

### In-App Notifications

This flow is typically used when new messages arrive while the user is actively using the application, but not on the messages page itself.

1.  The `useMessages` hook fetches new messages.
2.  If there are new messages and the `showNotifications` option is enabled, the hook calls the `showNotification` function from the `useNotification` hook.
3.  The `NotificationProvider` adds the new notification to its state.
4.  The provider renders a new `IOSNotification` component with the message content.
5.  The notification is displayed at the top of the screen with an animation.
6.  If the user clicks the notification, the `handleNotificationClick` function in the provider navigates them to the `/messages` page.
7.  After its duration expires, the notification is automatically removed.

### Browser (Web) Notifications

This system is intended for showing notifications when the app is not the active browser tab. The `useNotificationSystem` hook is available for this purpose, although it is not fully integrated with the `useMessages` hook in the current implementation.

1.  A component or hook calls `showMessageNotification` from the `useNotificationSystem` hook.
2.  The hook checks for notification permissions.
3.  If permission is granted, it uses `new Notification(...)` to create a native browser notification.
4.  The browser then displays the notification to the user, typically in the corner of their screen.
5.  If the user clicks the notification, the associated `onclick` handler is triggered, which can navigate the user within the app.
