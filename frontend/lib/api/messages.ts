import { Message, MessageApiResponse, ApiMessageData } from "@/types/message";
import { cleanMobileNumber } from "@/lib/utils/phone";

// API Configuration
const API_BASE_URL = "http://localhost:8000"; // TODO: Use env variable for production

// Mock data that would come from the API
let mockApiMessages: Message[] = [];

// Using shared utility function from @/lib/utils/phone

/**
 * Validates if API data has all required fields
 */
function isValidApiMessageData(apiData: unknown): apiData is ApiMessageData {
  if (!apiData || typeof apiData !== "object" || apiData === null) {
    return false;
  }

  const data = apiData as Record<string, unknown>;

  return (
    "_id" in data &&
    "sms_message" in data &&
    "created_at" in data &&
    typeof data._id === "string" &&
    data._id.trim() !== "" &&
    typeof data.sms_message === "string" &&
    data.sms_message.trim() !== "" &&
    typeof data.created_at === "string" &&
    data.created_at.trim() !== ""
  );
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

    // Remove + sign for messages API endpoints
    const numberForMessagesAPI = cleanedNumber.replace(/^\+/, "");
    console.log("Cleaned number for messages API:", numberForMessagesAPI);

    // Real API call to your backend (+ sign removed from URL)
    const response = await fetch(
      `${API_BASE_URL}/messages/${numberForMessagesAPI}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiResponse: MessageApiResponse = await response.json();

    // Transform the API data to our internal format
    if (apiResponse.data && isValidApiMessageData(apiResponse.data)) {
      const transformedMessage = transformApiDataToMessage(apiResponse.data);
      return [transformedMessage];
    }

    // Log when invalid or empty data is received for debugging
    if (apiResponse.data) {
      console.log("Invalid API message data received:", apiResponse.data);
    }

    // Return empty array if no valid data or empty object received
    return [];
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

/**
 * Reset API state for testing (clears messages and flags)
 */
export function resetApiState(): void {
  mockApiMessages = [];
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

    // Remove + sign for messages API endpoints
    const numberForMessagesAPI = cleanedNumber.replace(/^\+/, "");

    // Real API call to mark messages as read (+ sign removed from URL)
    const response = await fetch(
      `${API_BASE_URL}/messages/${numberForMessagesAPI}/read`,
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
