import { NewChatResponse } from "@/infrastructure/interfaces/chat-responses/ChatResponses";
import { MessageEntity } from "../entities";
import { MessageMapper } from "@/infrastructure/mappers/message-mappers/MessageMapper";



export const createNewChatUseCase = async(title: string) => {
    try {
        const req = await fetch('/api/new-chat', {
            method: 'POST',
            body: JSON.stringify({title}),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if(!req.ok){
            throw new Error("");
        }

        const data: NewChatResponse = await req.json();

        return {
            ...data,
        };
    } catch (error) {
        console.error('Error in fetch operation', error);
        return null;
    }
}