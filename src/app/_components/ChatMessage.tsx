import dayjs from 'dayjs'
import { ChatMessage } from '@/app/_typings'
import Image from 'next/image'

interface Props {
  chat: ChatMessage
  avatarSeed: number | string
}

export default function ChatMessage(props: Props) {
  return (
    <div className="w-full md:w-1/2 self-end">
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-16 rounded-full">
            <Image
              src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${props.avatarSeed}`}
              alt="Bot Avatar image"
              width={64}
              height={64}
            />
          </div>
        </div>

        <div className="chat-bubble chat-bubble-primary">
          <span dangerouslySetInnerHTML={{ __html: props.chat.content }}></span>
        </div>
      </div>
      <div className="flex gap-x-2 items-center justify-end mr-12">
        <strong className="text-primary">User</strong>
        <span className="text-xs">
          {dayjs(props.chat.createdAt).format('hh:mm')}
        </span>
      </div>
    </div>
  )
}
