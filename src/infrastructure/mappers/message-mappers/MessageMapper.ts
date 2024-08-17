import { MessageEntity } from "@/domain/entities";
import { Role } from "@prisma/client";
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
    
    public static fromDatabaseMessageToMessageEntity(message: {
        id: string;
        message: string;
        role: Role;
        chatId: string;
        createdAt: Date
    }): MessageEntity {
        return {
            message: message.message,
            id: message.id,
            from: message.role === 'USER' ? 'user' : 'bot',
            createdAt: message.createdAt
        }
    }
}