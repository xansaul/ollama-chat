"use server";

import { ollama } from 'ollama-ai-provider';
import { NextResponse } from 'next/server';
import { streamText } from 'ai';

export async function POST(req: Request) {
    const { messages } = await req.json();
    const signal = req.signal;
    
    const { textStream } = await streamText({
        model: ollama('llama3.1:latest'),
        messages,
        abortSignal: signal,
    });

    const readableStream = new ReadableStream({
        async start(controller) {
            try {
                for await (const partOfText of textStream) {
                    controller.enqueue(partOfText);
                }
            } catch (error) {
                controller.error(error);
            } finally {
                controller.close();
            }
        }
    });

    return new NextResponse(readableStream, {
        headers: { 'Content-Type': 'text/plain' }
    });

}
