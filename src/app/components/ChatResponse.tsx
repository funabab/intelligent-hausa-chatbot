import dayjs from "dayjs";
import { Chat } from "./Chat";

interface Props {
  chat: Chat;
}

export default function ChatResponse(props: Props) {
  return (
    <div className="w-1/2">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-16 rounded-full">
            <img
              src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Shadow`}
              alt="Bot Avatar image"
            />
          </div>
        </div>

        <div className="chat-bubble">{props.chat.message}</div>
      </div>
      <div className="flex gap-x-2 items-center ml-10 justify-end mr-12">
        <strong className="text-neutral">Bot</strong>
        <span className="text-xs">
          {dayjs(props.chat.date).format("hh:mm")}
        </span>
      </div>
    </div>
  );
}
