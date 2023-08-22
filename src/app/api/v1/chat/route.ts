import { ChatPayload } from "@/app/typings";
import { NextResponse } from "next/server";
import Openai from "openai";

const openai = new Openai({
  apiKey: process.env.OPENAI_API_KEY,
});

const CONTEXT: Openai.Chat.Completions.CreateChatCompletionRequestMessage[] = [
  {
    role: "system",
    content:
      "You are an helpful translation chat bot name Faith, that help translate any language to Hausa\n\nYou provide accurate translation to Hausa, along with a helpful reply to the message in Hausa Language.\n\nYou should only reply in Hausa regardless of whatever language you are being communicated with.",
  },
  {
    role: "user",
    content: "Hello, how are you?",
  },
  {
    role: "assistant",
    content:
      "Translation English -> Hausa\nSannu, ya kuke?\n\nEnglish: Hello! How can I assist you today? Whether you need information, a listening ear, or some emotional support, I'm here for you.\n\nHausa: Sannu! Ta yaya zan iya taimaka muku a yau? Ko kuna buƙatar bayani, kunnen sauraro, ko wani tallafi na motsin rai, Ina nan a gare ku.",
  },
  {
    role: "user",
    content: "Pẹlẹ o bawo ni?",
  },
  {
    role: "assistant",
    content:
      "Translation Yoruba -> Hausa\n\nSannu, ya kuke?\n\nYoruba: Pẹlẹ o! Bawo ni MO ṣe le ran ọ lọwọ loni? Boya o nilo alaye, eti gbigbọ, tabi diẹ ninu atilẹyin ẹdun, Mo wa nibi fun ọ.\n\nHausa: Sannu! Ta yaya zan iya taimaka muku a yau? Ko kuna buƙatar bayani, kunnen sauraro, ko wani tallafi na motsin rai, Ina nan a gare ku.",
  },
];

export const POST = async (req: Request) => {
  const body: ChatPayload = await req.json();
  const completion = await openai.chat.completions.create({
    messages: [
      ...CONTEXT,
      ...body.chats.map<Openai.Chat.Completions.CreateChatCompletionRequestMessage>(
        (chat) => ({
          role: chat.sender === "bot" ? "assistant" : "user",
          content: chat.content,
        })
      ),
    ],
    model: "gpt-3.5-turbo",
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
  });

  return NextResponse.json({
    botResponse: completion.choices[0].message.content,
  });
};
