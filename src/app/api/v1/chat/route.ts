import { Message, OpenAIStream, StreamingTextResponse } from 'ai'
import Openai from 'openai'

const openai = new Openai({
  apiKey: process.env.OPENAI_API_KEY,
})

export const POST = async (req: Request) => {
  const body: { messages: Message[] } = await req.json()

  const completion = await openai.chat.completions.create({
    messages: body.messages,
    model: 'gpt-3.5-turbo',
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    stream: true,
  })

  const stream = OpenAIStream(completion)
  return new StreamingTextResponse(stream)
}
