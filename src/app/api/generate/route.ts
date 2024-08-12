"use server";

import ollama from 'ollama';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { message } = await req.json();
    try {
        const messageObject = { role: 'user', content: message };
        const response = await ollama.chat({ model: 'llama3.1:latest', messages: [messageObject], stream: true });

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const part of response) {
                        if (part.message && part.message.content) {
                            controller.enqueue(part.message.content);
                        }
                    }
                    controller.close();
                } catch (error) {
                    controller.error(error);
                }
            }
        });

        return new NextResponse(stream, {
            headers: { 'Content-Type': 'text/plain' }
        });
        
    } catch (error) {
        console.error('Error processing request', error);
        return new NextResponse('Error processing request', { status: 500 });
    }
}
