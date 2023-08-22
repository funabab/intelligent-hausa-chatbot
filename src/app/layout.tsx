import "./styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intelligent Hausa Chatbot",
  description:
    "An intelligent chatbot for the efficient Hausa language Translation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="emerald" className="w-full h-full">
      <body className={twMerge(inter.className, "w-full h-full bg-base-100")}>
        {children}
      </body>
    </html>
  );
}
