"use client";

import ChatResponse from "./ChatResponse";
import ChatMessage from "./ChatMessage";
import { AiOutlineSend } from "react-icons/ai";
import React, {
  FormEvent,
  experimental_useOptimistic as useOptimistic,
  useMemo,
  useState,
  useTransition,
} from "react";
import { Chat } from "../typings";

export default function Chat() {
  const [chats, setChats] = useState<Chat[]>([]);
  const avatarSeed = useMemo(() => Math.floor(Math.random() * 10000), []);
  const [isPending, startTransition] = useTransition();
  const [optimisticChats, setOptimisticChats] = useState<Chat[]>(chats);

  const handleSubmitChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const message = form.message.value;
    form.reset();

    const newChats: Chat[] = [
      ...chats,
      {
        id: crypto.randomUUID(),
        message,
        date: new Date(),
        sender: "user",
      },
    ];

    setOptimisticChats(() => [
      ...newChats,
      {
        id: crypto.randomUUID(),
        date: new Date(),
        sender: "bot",
        isLoading: true,
      },
    ]);

    startTransition(async () => {
      try {
        const response = await fetch("/api/v1/chat", {
          cache: "no-cache",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chats: newChats.map((chat) => ({
              content: chat.message,
              sender: chat.sender,
            })),
          }),
        });

        const { botResponse }: { botResponse: string } = await response.json();
        const currentChats: Chat[] = [
          ...newChats,
          {
            id: crypto.randomUUID(),
            message: botResponse,
            date: new Date(),
            sender: "bot",
          },
        ];

        setOptimisticChats(currentChats);
        setChats(currentChats);
      } catch (e) {
        setOptimisticChats(newChats);
      }
    });
  };

  return (
    <main className="flex min-h-0 flex-col flex-1 relative py-10">
      <div className="flex-1 grow relative overflow-y-auto">
        <div className="container mx-auto flex flex-col">
          {optimisticChats.map((chat) => (
            <React.Fragment key={chat.id}>
              {chat.sender === "user" ? (
                <ChatMessage chat={chat} avatarSeed={avatarSeed} />
              ) : (
                <ChatResponse chat={chat} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="shrink-0 container mx-auto mt-5">
        <form onSubmit={handleSubmitChat}>
          <div className="relative">
            <input
              name="message"
              className="input input-bordered input-primary w-full"
              disabled={isPending}
            />
            <button
              className="btn btn-primary btn-circle btn-sm text-lg absolute right-4 top-2 btn-ghost"
              disabled={isPending}
            >
              <AiOutlineSend />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
