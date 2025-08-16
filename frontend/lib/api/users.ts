// API Configuration
const API_BASE_URL = "http://localhost:8000"; // TODO: Use env variable for production

// Types for the API
export interface CreateUserPayload {
  number: string;
  subscribed_lgus: string[];
}

export interface CreateUserResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

/**
 * Creates a new user with their subscribed LGUs
 * @param payload - User data containing phone number and subscribed LGUs
 * @returns Promise with the API response
 */
export async function createUser(
  payload: CreateUserPayload
): Promise<CreateUserResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error creating user:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create user",
    };
  }
}
