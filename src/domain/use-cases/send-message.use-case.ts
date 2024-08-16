import { MessageMapper } from "@/infrastructure/mappers/message-mappers/MessageMapper";
import { MessageEntity } from "../entities";

export async function* sendMessageUseCase(
  data: {
    messages: MessageEntity[];
    chatId: string;
  },
  abortSignal: AbortSignal
) {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        messages: data.messages.map((message) =>
          MessageMapper.fromMessageEntityToIaMessage(message)
        ),
        chatId: data.chatId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      signal: abortSignal,
    });

    if (!response.body) {
      console.error("No body in response");
      return;
    }

  

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let messageResponse = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        messageResponse = decoder.decode(value, { stream: true });

        yield messageResponse
      }
    } catch (error) {
      return null;
    } finally {
      reader.releaseLock();
    }
  } catch (error) {
    console.error("Error in fetch operation", error);
    return null;
  }
}
