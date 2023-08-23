'use client'

import React, { FormEvent, useEffect, useMemo, useRef } from 'react'
import ChatResponse from './ChatResponse'
import ChatMessage from './ChatMessage'
import { AiOutlineSend } from 'react-icons/ai'
import { ChatMessage as IChatMessage } from '@/app/_typings'
import { useChat } from 'ai/react'
import { CHAT_CONTEXT } from '@/app/_utils/constants'

export default function Chat() {
  const avatarSeed = useMemo(() => Math.floor(Math.random() * 10000), [])
  const { append, messages, isLoading } = useChat({
    api: '/api/v1/chat',
    initialMessages: CHAT_CONTEXT,
  })
  const scrollElRef = useRef<HTMLDivElement>(null)

  const handleSubmitChat = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const message = form.message.value
    form.reset()

    await append({
      role: 'user',
      content: message,
    })
  }

  useEffect(() => {
    if (isLoading) {
      scrollElRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isLoading, messages])

  return (
    <main className="flex min-h-0 flex-col flex-1 relative py-10 pb-5 md:pb-10">
      <div className="flex-1 grow relative overflow-y-auto">
        <div className="container mx-auto flex flex-col px-2 md:px-0">
          {messages.map((message: IChatMessage) => (
            <React.Fragment key={message.id}>
              {!message.system && message.role === 'user' && (
                <ChatMessage chat={message} avatarSeed={avatarSeed} />
              )}

              {!message.system && message.role === 'assistant' && (
                <ChatResponse chat={message} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div ref={scrollElRef}></div>
      </div>
      <div className="shrink-0 container mx-auto mt-5 px-2 md:px-0">
        <form onSubmit={handleSubmitChat}>
          <div className="relative">
            <input
              name="message"
              className="input input-bordered input-primary w-full"
              disabled={isLoading}
            />
            <button
              className="btn btn-primary btn-circle btn-sm text-lg absolute right-4 top-2 btn-ghost"
              disabled={isLoading}
            >
              <AiOutlineSend />
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
