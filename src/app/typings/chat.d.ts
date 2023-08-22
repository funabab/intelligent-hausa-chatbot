export type ChatSender = "user" | "bot";

export interface ChatPayload {
  chats: {
    content: string;
    sender: ChatSender;
  }[];
}

export interface Chat {
  id: string;
  message?: string;
  sender: ChatSender;
  date: Date;
  isLoading?: boolean;
}
