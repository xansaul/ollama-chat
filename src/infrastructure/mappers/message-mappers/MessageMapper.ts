import { MessageEntity } from "@/domain/entities";
import type { CoreMessage, Message } from "ai";

export class MessageMapper {
    public static fromIaMessageToMessageEntity(message: Message): MessageEntity{
        return {
            id: message.id,
            message: message.content,
            from: message.role !== 'user'? 'bot':'user'
        }
    }
    
    public static fromMessageEntityToIaMessage(message: MessageEntity): CoreMessage{
        return {
            content: message.message,
            role: message.from === 'user' ? 'user': 'assistant',
        }
    }
}