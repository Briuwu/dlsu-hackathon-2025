# Messaging Feature

This document provides an overview of the messaging feature in the PulsePH frontend application. This feature is designed to display announcements from local government units (LGUs) in a familiar iMessage-style interface.

## Overview

The messaging feature provides a user-friendly way for users to view the announcements they have subscribed to. It fetches messages from the backend, displays them in a conversation view, and includes functionality for real-time updates through polling.

## Core Components

### 1. Messages Page (`app/messages/page.tsx`)

This is the main page for displaying the message conversation. It simulates the look and feel of the iOS iMessage application.

**Key Features:**

-   **Authentication Check:** It ensures that a user is logged in by checking for a mobile number in `localStorage`. If no number is found, it redirects the user to the `/auth` page.
-   **Message Fetching:** It uses the `useMessages` hook to fetch and manage the messages for the logged-in user.
-   **iMessage UI:** It uses several presentational components to create an iMessage-like interface, including a status bar, header, conversation area, and input box.
-   **Manual Refetch:** The "Details" button in the header can be used to manually trigger a refetch of the messages.
-   **Polling Indicator:** The header displays a green or red dot to indicate whether the application is currently polling for new messages.

### 2. `useMessages` Hook (`hooks/useMessages.ts`)

This custom hook encapsulates all the logic for fetching, managing, and updating messages.

**Key Features:**

-   **Polling:** It periodically fetches new messages from the backend at a configurable interval (`pollInterval`).
-   **State Management:** It manages the state of the messages, loading status, and any potential errors.
-   **Duplicate Prevention:** It ensures that new messages are merged with existing ones without creating duplicates.
-   **Notifications:** When new messages arrive, it can trigger a notification to the user (this can be enabled or disabled).
-   **Mark as Read:** It provides a function to mark messages as read, both locally and by making an API call to the backend.
-   **Visibility Handling:** It automatically stops polling when the page is not visible (e.g., when the tab is in the background) and resumes when it becomes visible again to conserve resources.

### 3. Messages API (`lib/api/messages.ts`)

This module is responsible for all communication with the backend messages API.

**Key Functions:**

-   `fetchMessages(mobileNumber)`: Fetches the latest messages for a given mobile number.
-   `markMessagesAsRead(mobileNumber, messageIds)`: Sends a request to the backend to mark one or more messages as read.
-   **Data Transformation:** It transforms the data received from the API into the `Message` format used throughout the frontend application.

### 4. Message and Conversation UI Components

-   **`IMessageHeader` (`components/ui/imessage-header.tsx`):** The header component for the messages screen, displaying the contact name and back/details buttons.
-   **`IMessageInput` (`components/ui/imessage-input.tsx`):** The input component at the bottom of the screen. While users cannot send messages in this context, it completes the iMessage look.
-   **`MessageBubble` and `Conversation` (`components/ui/message-bubble.tsx`):** These components are responsible for rendering the individual message bubbles and arranging them in a conversation list. The `MessageBubble` component can render messages from the user (not used in this flow) or from the LGU, and it can correctly display timestamps and delivery status.

### 5. Message Type Definition (`types/message.ts`)

This file defines the TypeScript interfaces for the `Message` object used within the application and the API response structures, ensuring type safety and consistency.

## Messaging Flow

1.  The user navigates to the `/messages` page.
2.  The `useMessages` hook is initialized with the user's mobile number.
3.  The hook makes an initial API call to `fetchMessages` to get the user's current messages.
4.  The messages are displayed in the `Conversation` component.
5.  The hook starts polling the `fetchMessages` endpoint every 5 seconds to check for new messages.
6.  If new messages are found, they are added to the message list, and the UI updates automatically.
7.  If the `showNotifications` option is enabled and the page is not active, a notification will be displayed for each new message.
8.  The user can manually refetch messages by clicking the "Details" button in the header.
