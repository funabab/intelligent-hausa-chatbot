import Link from "next/link";
import Chat from "./components/Chat";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full relative">
      <header className="shrink-0">
        <div className="navbar shadow bg-primary-focus text-primary-content">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            Intelligent Hausa Chatbot
          </Link>
        </div>
      </header>
      <Chat />
    </div>
  );
}
