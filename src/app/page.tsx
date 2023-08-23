import Link from 'next/link'
import Chat from './_components/Chat'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full relative">
      <header className="shrink-0">
        <div className="navbar shadow bg-primary-focus text-primary-content">
          <div className="container mx-auto">
            <Link
              href="/"
              className="btn btn-ghost normal-case text-xl flex items-center gap-x-4"
            >
              <Image
                src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Shadow`}
                alt="Bot Avatar image"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>Intelligent Hausa Chatbot</span>
            </Link>
          </div>
        </div>
      </header>
      <Chat />
    </div>
  )
}
