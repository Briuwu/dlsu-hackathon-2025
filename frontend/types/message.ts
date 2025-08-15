export interface Message {
  id: string;
  text: string;
  timestamp?: string;
  isFromUser?: boolean;
  isDelivered?: boolean;
  isRead?: boolean;
  createdAt?: string;
}

// API Response types matching your backend
export interface ApiMessageData {
  _id: string;
  sms_message: string;
  subscribed_numbers: string[];
  created_at: string;
}

export interface MessageApiResponse {
  message: string;
  data: ApiMessageData;
}

export interface SendMessageRequest {
  text: string;
  mobileNumber: string;
}

export interface SendMessageResponse {
  message: Message;
  success: boolean;
}
