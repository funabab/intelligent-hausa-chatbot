import dayjs from "dayjs";
import { Chat } from "../typings";
import { ThreeDots } from "react-loader-spinner";
import sanitizeHTML from "sanitize-html";

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

        <div className="chat-bubble pb-4">
          {props.chat.isLoading ? (
            <ThreeDots
              height="40"
              width="40"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          ) : (
            <span
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(
                  props.chat.message
                    ?.replace(/\n/g, "<br />")
                    .replace(/(\w+):/g, "<b>$1</b>:") || ""
                ),
              }}
            ></span>
          )}
        </div>
      </div>
      <div className="flex gap-x-2 items-center justify-start ml-2">
        <strong className="text-neutral">Bot</strong>
        <span className="text-xs">
          {dayjs(props.chat.date).format("hh:mm")}
        </span>
      </div>
    </div>
  );
}
