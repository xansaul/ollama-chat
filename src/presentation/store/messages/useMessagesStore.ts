import { MessageEntity } from '@/domain/entities';
import { create } from 'zustand';

interface MessageStoreState {
    messages: MessageEntity[];
    createMessage: (messageEntity:MessageEntity)=>MessageEntity[];
    updateMessageStream: (message: string) =>void;
}

export const useMessagesStore = create<MessageStoreState>()((set, get)=>({
    messages: [],
    createMessage: (messageEntity:MessageEntity)=>{

        set(state=>({
            messages: [...state.messages, messageEntity]
        }));
        return get().messages;
    },
    updateMessageStream: (message: string)=>{
        const lastMessageIndex = get().messages.length-1;
        const newMessages = [...get().messages];
        newMessages[lastMessageIndex].message = message;

        set(()=>({
            messages: newMessages
        }));
    }
}));