import React, { createContext, useContext, useState } from "react";

export interface Message {
  id: string;
  sender: "patient" | "pharmacy";
  senderName: string;
  content: string;
  timestamp: Date;
}

export interface Conversation {
  patientId: string;
  patientName: string;
  messages: Message[];
}

interface MessagingContextType {
  conversations: Conversation[];
  addMessage: (
    patientId: string,
    patientName: string,
    sender: "patient" | "pharmacy",
    senderName: string,
    content: string,
  ) => void;
  getConversation: (patientId: string) => Conversation | undefined;
}

const MessagingContext = createContext<MessagingContextType | undefined>(
  undefined,
);

export function MessagingProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const addMessage = (
    patientId: string,
    patientName: string,
    sender: "patient" | "pharmacy",
    senderName: string,
    content: string,
  ) => {
    setConversations((prev) => {
      const existingConversation = prev.find((c) => c.patientId === patientId);

      if (existingConversation) {
        return prev.map((c) =>
          c.patientId === patientId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  {
                    id: Date.now().toString(),
                    sender,
                    senderName,
                    content,
                    timestamp: new Date(),
                  },
                ],
              }
            : c,
        );
      } else {
        return [
          ...prev,
          {
            patientId,
            patientName,
            messages: [
              {
                id: Date.now().toString(),
                sender,
                senderName,
                content,
                timestamp: new Date(),
              },
            ],
          },
        ];
      }
    });
  };

  const getConversation = (patientId: string) => {
    return conversations.find((c) => c.patientId === patientId);
  };

  return (
    <MessagingContext.Provider
      value={{ conversations, addMessage, getConversation }}
    >
      {children}
    </MessagingContext.Provider>
  );
}

export function useMessaging() {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error("useMessaging must be used within MessagingProvider");
  }
  return context;
}
