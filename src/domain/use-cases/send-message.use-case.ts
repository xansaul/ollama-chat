import { MessageMapper } from "@/infrastructure/mappers/message-mappers/MessageMapper";
import { MessageEntity } from "../entities";


export async function* sendMessageUseCase(messages: MessageEntity[], abortSignal: AbortSignal) {
    console.log(messages.map(message=>MessageMapper.fromMessageEntityToIaMessage(message)))
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ 
                messages: messages.map(message=>MessageMapper.fromMessageEntityToIaMessage(message))
             }),
            headers: {
                'Content-Type': 'application/json'
            },
            signal: abortSignal
        });

        if (!response.body) {
            console.error('No body in response');
            return;
        }
    
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let messageResponse = '';

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                messageResponse += decoder.decode(value, { stream: true });
                yield messageResponse;
            }
        } catch (error) {
            return null;
        } finally {
            reader.releaseLock();
        }
    } catch (error) {
        console.error('Error in fetch operation', error);
        return null;
    }
};