import { Message, MessageApiResponse, ApiMessageData } from "@/types/message";

// API Configuration
const API_BASE_URL = "http://localhost:8000";

// Mock data that would come from the API
let mockApiMessages: Message[] = [];
let hasOnboardingMessageBeenSent = false;

// Additional mock messages for future use (currently unused for onboarding test)
// const additionalMockMessages: Omit<Message, "id" | "timestamp" | "createdAt">[] = [...];

// Simulate message counter for generating new messages
let messageCounter = mockApiMessages.length;

/**
 * Clean mobile number by removing spaces and other formatting
 */
function cleanMobileNumber(mobileNumber: string): string {
  return mobileNumber.replace(/\s/g, "");
}

/**
 * Transform API data to internal Message format
 */
function transformApiDataToMessage(apiData: ApiMessageData): Message {
  const createdDate = new Date(apiData.created_at);
  return {
    id: apiData._id,
    text: apiData.sms_message,
    timestamp: createdDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    isFromUser: false, // Messages from API are from PulsePH
    isDelivered: true,
    isRead: false,
    createdAt: apiData.created_at,
  };
}

/**
 * Fetches messages for a specific mobile number
 * @param mobileNumber - The mobile number to fetch messages for
 * @returns Promise with array of messages
 */
export async function fetchMessages(mobileNumber: string): Promise<Message[]> {
  try {
    if (!mobileNumber) {
      return [];
    }

    // Clean mobile number by removing any spaces
    const cleanedNumber = cleanMobileNumber(mobileNumber);

    // Real API call to your backend
    const response = await fetch(`${API_BASE_URL}/messages/${cleanedNumber}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiResponse: MessageApiResponse = await response.json();

    // Transform the API data to our internal format
    if (apiResponse.data) {
      const transformedMessage = transformApiDataToMessage(apiResponse.data);
      return [transformedMessage];
    }

    return [];
  } catch (error) {
    console.error("Error fetching messages:", error);

    // Fallback to mock data for testing when API is not available
    if (!hasOnboardingMessageBeenSent && mobileNumber) {
      const now = new Date();
      const onboardingMessage: Message = {
        id: (++messageCounter).toString(),
        text: "🚨 CLASS SUSPENSION ALERT: All classes in Marikina City are suspended for today, November 15, 2024 due to heavy rainfall and flooding in several areas. Stay safe! - PulsePH",
        timestamp: now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        isFromUser: false,
        isDelivered: true,
        isRead: false,
        createdAt: now.toISOString(),
      };

      mockApiMessages.push(onboardingMessage);
      hasOnboardingMessageBeenSent = true;
      return [...mockApiMessages];
    }

    return mockApiMessages;
  }
}

/**
 * Reset API state for testing (clears messages and flags)
 */
export function resetApiState(): void {
  mockApiMessages = [];
  hasOnboardingMessageBeenSent = false;
  messageCounter = 0;
}

/**
 * Marks messages as read
 * @param mobileNumber - The mobile number
 * @param messageIds - Array of message IDs to mark as read
 */
export async function markMessagesAsRead(
  mobileNumber: string,
  messageIds: string[]
): Promise<void> {
  try {
    // Clean mobile number by removing any spaces
    const cleanedNumber = cleanMobileNumber(mobileNumber);

    // Real API call to mark messages as read
    const response = await fetch(
      `${API_BASE_URL}/messages/${cleanedNumber}/read`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageIds }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error marking messages as read:", error);

    // Fallback: Update local mock data if API fails
    mockApiMessages.forEach((message) => {
      if (messageIds.includes(message.id)) {
        message.isRead = true;
      }
    });
  }
}
