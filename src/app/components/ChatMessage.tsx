import dayjs from "dayjs";
import { ChatMessage } from "../typings";

interface Props {
  chat: ChatMessage;
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
          {props.chat.content}
        </div>
      </div>
      <div className="flex gap-x-2 items-center justify-end mr-12">
        <strong className="text-primary">User</strong>
        <span className="text-xs">
          {dayjs(props.chat.createdAt).format("hh:mm")}
        </span>
      </div>
    </div>
  );
}
