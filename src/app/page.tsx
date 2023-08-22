import Link from "next/link";
import Chat from "./components/Chat";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full relative">
      <header className="shrink-0">
        <div className="navbar shadow bg-primary-focus text-primary-content">
          <div className="container mx-auto">
            <Link href="/" className="btn btn-ghost normal-case text-xl">
              <img
                src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Shadow`}
                alt="Bot Avatar image"
                className="h-10 rounded-full"
              />
              Intelligent Hausa Chatbot
            </Link>
          </div>
        </div>
      </header>
      <Chat />
    </div>
  );
}
