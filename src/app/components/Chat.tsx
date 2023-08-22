"use client";

import ChatResponse from "./ChatResponse";
import ChatMessage from "./ChatMessage";
import { AiOutlineSend } from "react-icons/ai";
import React, { FormEvent, useMemo, useState } from "react";

export interface Chat {
  id: string;
  message: string;
  sender: "user" | "bot";
  date: Date;
}

export default function Chat() {
  const [chats, setChats] = useState<Chat[]>([]);
  const avatarSeed = useMemo(() => Math.floor(Math.random() * 10000), []);

  const handleSubmitChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const message = form.message.value;

    setChats((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        message,
        date: new Date(),
        sender: "user",
      },
    ]);

    form.reset();
  };

  return (
    <main className="container flex flex-col flex-1 relative mx-auto py-10">
      <div className="flex flex-1 grow flex-col">
        {chats.map((chat) => (
          <React.Fragment key={chat.id}>
            {chat.sender === "user" ? (
              <ChatMessage chat={chat} avatarSeed={avatarSeed} />
            ) : (
              <ChatResponse chat={chat} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="shrink-0 w-full">
        <form onSubmit={handleSubmitChat}>
          <div className="relative">
            <input
              name="message"
              className="input input-bordered input-primary w-full"
            />
            <button className="btn btn-primary btn-circle btn-sm text-lg absolute right-4 top-2 btn-ghost">
              <AiOutlineSend />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
