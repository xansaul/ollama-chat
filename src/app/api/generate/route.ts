"use server";


import { NextResponse } from "next/server";
import { CoreMessage, streamText } from "ai";
import prisma from "@/lib/db";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { createOllama } from 'ollama-ai-provider';
import { revalidatePath } from "next/cache";

const messageSchema = z.object({
  content: z.string(),
  role: z.enum(["user", "assistant"]),
});

const schema = z.object({
  messages: z.array(messageSchema).min(1),
  chatId: z.string().uuid(),
});

const ollama = createOllama({baseURL:process.env.OLLAMA_API})

export async function POST(req: Request) {
  const { error, data } = schema.safeParse(await req.json());
  const signal = req.signal;

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }

  const coreMessages: CoreMessage[] = data.messages.map((msg) => ({
    content: msg.content,
    role: msg.role === "user" ? "user" : "assistant",
  }));

  const lastMessage = coreMessages.at(-1);

  const userMessage = await prisma.message.create({
    data: {
      chatId: data.chatId,
      role: "USER",
      message: lastMessage!.content as string,
    },
  });
  revalidatePath(`/chat/${data.chatId}`);

  const botMessage = {
    id: uuidv4(),
    message: "",
    role: "BOT",
  };
  
  const { textStream } = await streamText({
    model: ollama("llama3.1:latest",{

    }),
    messages: coreMessages,
    abortSignal: signal,
  });

  const encoder = new TextEncoder();
  

  const readableStream = new ReadableStream({
    async start(controller) {
      try {
        for await (const partOfText of textStream) {
          const chunkData = encoder.encode(
            `${JSON.stringify({ botMessage: { ...botMessage, message: partOfText }, userMessage })}`
          );
          botMessage.message += partOfText;
          controller.enqueue(chunkData);
        }


      } catch (error) {
        controller.error(error);
      } finally {
        await prisma.message.create({
          data: {
            message: botMessage.message,
            id: botMessage.id,
            role: "BOT",
            chatId: data.chatId
          },
        });
        revalidatePath(`/chat/${data.chatId}`);
        controller.close();

      }
    },
  });

  return new NextResponse(readableStream, {
    headers: { "Content-Type": "text/plain" },
  });
}
