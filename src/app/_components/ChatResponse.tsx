import dayjs from 'dayjs'
import sanitizeHTML from 'sanitize-html'
import { ChatMessage } from '@/app/_typings'

interface Props {
  chat: ChatMessage
}

export default function ChatResponse(props: Props) {
  return (
    <div className="w-full md:w-1/2 my-5">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-16 rounded-full">
            <img
              src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Shadow`}
              alt="Bot Avatar image"
            />
          </div>
        </div>

        <div className="chat-bubble pb-4">
          <span
            dangerouslySetInnerHTML={{
              __html: sanitizeHTML(
                props.chat.content
                  ?.replace(/\n/g, '<br />')
                  .replace(/(\w+):/g, '<b>$1</b>:') || ''
              ),
            }}
          ></span>
        </div>
      </div>
      <div className="flex gap-x-2 items-center justify-start ml-2">
        <strong className="text-neutral">Bot</strong>
        <span className="text-xs">
          {dayjs(props.chat.createdAt).format('hh:mm')}
        </span>
      </div>
    </div>
  )
}
