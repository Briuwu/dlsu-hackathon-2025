import { useState, useEffect, useCallback, useRef } from "react";
import { Message } from "@/types/message";
import { fetchMessages, markMessagesAsRead } from "@/lib/api/messages";
import { useNotification } from "@/contexts/NotificationContext";

interface UseMessagesOptions {
  mobileNumber: string;
  pollInterval?: number; // in milliseconds, default 5000 (5 seconds)
  autoMarkAsRead?: boolean;
  showNotifications?: boolean; // Whether to show notifications for new messages
}

interface UseMessagesReturn {
  messages: Message[];
  loading: boolean;
  error: string | null;
  markAsRead: (messageIds: string[]) => Promise<void>;
  refetch: () => Promise<void>;
  isPolling: boolean;
  startPolling: () => void;
  stopPolling: () => void;
}

/**
 * Helper function to merge new messages with existing ones, filtering out duplicates by _id
 * @param existingMessages - Current messages array
 * @param newMessages - New messages to potentially add
 * @returns Merged array without duplicates, sorted by creation date
 */
function mergeMessagesWithoutDuplicates(
  existingMessages: Message[],
  newMessages: Message[]
): Message[] {
  // Create a Set of existing message IDs for efficient lookup
  const existingIds = new Set(existingMessages.map((msg) => msg.id));

  // Filter out messages that already exist
  const uniqueNewMessages = newMessages.filter(
    (msg) => !existingIds.has(msg.id)
  );

  // Combine existing and new unique messages
  const combinedMessages = [...existingMessages, ...uniqueNewMessages];

  // Sort by creation date (oldest first) to maintain consistent ordering
  return combinedMessages.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateA - dateB;
  });
}

export function useMessages(options: UseMessagesOptions): UseMessagesReturn {
  const {
    mobileNumber,
    pollInterval = 5000,
    autoMarkAsRead = false,
    showNotifications = false,
  } = options;

  const { showNotification } = useNotification();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialLoadRef = useRef(true);
  const previousMessageCountRef = useRef(0);

  // Fetch messages function
  const fetchMessagesData = useCallback(async () => {
    try {
      if (isInitialLoadRef.current) {
        setLoading(true);
      }

      setError(null);
      const fetchedMessages = await fetchMessages(mobileNumber);

      setMessages((prevMessages) => {
        // Merge messages without duplicates
        const mergedMessages = mergeMessagesWithoutDuplicates(
          prevMessages,
          fetchedMessages
        );

        // Only update if messages have actually changed
        if (JSON.stringify(prevMessages) !== JSON.stringify(mergedMessages)) {
          // Find truly new messages by comparing with previous state
          const existingIds = new Set(prevMessages.map((msg) => msg.id));
          const newMessages = fetchedMessages.filter(
            (msg) => !existingIds.has(msg.id)
          );

          // Check for new messages and show notifications
          if (
            showNotifications &&
            !isInitialLoadRef.current &&
            newMessages.length > 0
          ) {
            newMessages.forEach((message) => {
              // Only show notifications for messages from PulsePH (not user messages)
              if (!message.isFromUser) {
                showNotification({
                  title: "PulsePH",
                  message: message.text,
                  time: message.timestamp || "now",
                  clickAction: "navigate",
                  navigateTo: "/messages",
                  duration: 6000, // Show for 6 seconds
                });
              }
            });
          }

          // Update the previous message count to the total merged count
          previousMessageCountRef.current = mergedMessages.length;

          return mergedMessages;
        }
        return prevMessages;
      });

      // Auto mark as read if enabled - work with the latest merged messages
      if (autoMarkAsRead) {
        // Get the current messages state to find unread messages
        setMessages((currentMessages) => {
          const unreadMessages = currentMessages.filter(
            (msg) => !msg.isRead && !msg.isFromUser
          );
          if (unreadMessages.length > 0) {
            // Mark as read asynchronously without blocking the state update
            markMessagesAsRead(
              mobileNumber,
              unreadMessages.map((msg) => msg.id)
            ).catch((err) => {
              console.error("Error auto-marking messages as read:", err);
            });
          }
          return currentMessages; // Return unchanged, markMessagesAsRead will update separately
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch messages";
      setError(errorMessage);
      console.error("Error fetching messages:", err);
    } finally {
      if (isInitialLoadRef.current) {
        setLoading(false);
        isInitialLoadRef.current = false;
      }
    }
  }, [mobileNumber, autoMarkAsRead, showNotifications, showNotification]);

  // Start polling
  const startPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }

    setIsPolling(true);
    pollIntervalRef.current = setInterval(fetchMessagesData, pollInterval);
  }, [fetchMessagesData, pollInterval]);

  // Stop polling
  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    setIsPolling(false);
  }, []);

  // Mark messages as read
  const markAsRead = useCallback(
    async (messageIds: string[]) => {
      try {
        setError(null);
        await markMessagesAsRead(mobileNumber, messageIds);

        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            messageIds.includes(msg.id) ? { ...msg, isRead: true } : msg
          )
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to mark messages as read";
        setError(errorMessage);
        console.error("Error marking messages as read:", err);
      }
    },
    [mobileNumber]
  );

  // Manual refetch
  const refetch = useCallback(async () => {
    await fetchMessagesData();
  }, [fetchMessagesData]);

  // Initial fetch and setup polling
  useEffect(() => {
    if (mobileNumber) {
      fetchMessagesData();
      startPolling();
    }

    return () => {
      stopPolling();
    };
  }, [mobileNumber, fetchMessagesData, startPolling, stopPolling]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  // Handle visibility change to pause/resume polling
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else if (mobileNumber) {
        startPolling();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [mobileNumber, startPolling, stopPolling]);

  return {
    messages,
    loading,
    error,
    markAsRead,
    refetch,
    isPolling,
    startPolling,
    stopPolling,
  };
}
