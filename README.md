# Intelligent Hausa Chatbot

A streaming chat assistant that answers in Hausa, whatever language you write to it in.

Built in August 2023 to get hands-on with the OpenAI streaming API and prompt design. One Next.js app, one
API route, no framework between the UI and the model.

## How it works

- `src/app/api/v1/chat/route.ts` forwards the conversation to `gpt-3.5-turbo` with `stream: true` and returns
  tokens as they arrive, using `OpenAIStream` and `StreamingTextResponse` from the Vercel AI SDK.
- The persona lives in `src/app/_utils/constants.ts`: a system prompt that fixes the assistant's name, its job
  (translate to Hausa, reply in Hausa) and a handful of seeded user/assistant turns that demonstrate the
  answer format.
- `Chat`, `ChatMessage` and `ChatResponse` render tokens as they stream, and the model output is passed
  through `sanitize-html` before it is injected into the bubble.

## Stack

Next.js 13 (app router), TypeScript, Vercel AI SDK, OpenAI, Tailwind CSS with daisyUI.

## Running it

```bash
npm install
echo "OPENAI_API_KEY=sk-..." > .env.local
npm run dev
```

## Notes

No retrieval, no evaluation harness, no guardrails beyond the system prompt. It is a prompt-engineering
exercise rather than a production assistant, and the interesting part is how much of the behaviour comes
from the seeded examples rather than from the instructions.
