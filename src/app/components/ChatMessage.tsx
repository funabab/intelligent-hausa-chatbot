import dayjs from "dayjs";
import { Chat } from "./Chat";

interface Props {
  chat: Chat;
  avatarSeed: number | string;
}

export default function ChatMessage(props: Props) {
  return (
    <div className="w-1/2 self-end">
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-16 rounded-full">
            <img
              src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${props.avatarSeed}`}
              alt="Bot Avatar image"
            />
          </div>
        </div>

        <div className="chat-bubble chat-bubble-primary">
          {props.chat.message}
        </div>
      </div>
      <div className="flex gap-x-2 items-center ml-10 justify-end mr-12">
        <strong className="text-primary">User</strong>
        <span className="text-xs">
          {dayjs(props.chat.date).format("hh:mm")}
        </span>
      </div>
    </div>
  );
}
