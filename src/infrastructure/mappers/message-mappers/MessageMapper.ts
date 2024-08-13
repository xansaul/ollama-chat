import { MessageEntity } from "@/domain/entities";
import type { Message } from "ai";

export class MessageMapper {
    public static iaMessageToMessageEntity(message: Message): MessageEntity{
        return {
            message: message.content,
            from: message.role !== 'user'? 'bot':'user'
        }
    }
}