import { MessageEntity } from '@/domain/entities';
import { create } from 'zustand';

interface MessageStoreState {
    messages: MessageEntity[];
    createMessage: (messageEntity:MessageEntity)=>MessageEntity[];
    createOrUpdateMessageStream: (message: MessageEntity) =>void;
    isBotTyping: boolean;
    setBotIsTyping: (isTyping: boolean)=>void;
    setMessages: (messages: MessageEntity[]) => void;
    abortController: AbortController;
    handleAbort: () => void;
}

export const useMessagesStore = create<MessageStoreState>()((set, get)=>({
    messages: [],
    createMessage: (messageEntity:MessageEntity)=>{

        set(state=>({
            messages: [...state.messages, messageEntity]
        }));
        return get().messages;
    },
    createOrUpdateMessageStream: (messageToCreateOrUpdate: MessageEntity)=>{
        const message = get().messages.find(messageStore=>messageStore.id===messageToCreateOrUpdate.id);

        if(!message){
            set(state=>({messages: [...state.messages, messageToCreateOrUpdate]}));
            return;
        }
        message.message += messageToCreateOrUpdate.message;
        const newMessages = get().messages.map(messageSotore=>{
            if(message.id === messageSotore.id){
                return message;
            }
            return messageSotore;
        })
        set(()=>({messages: newMessages}));
    },
    setBotIsTyping:(isTyping: boolean)=>{
        set({isBotTyping:isTyping})
    },
    isBotTyping: false,
    setMessages: (messages: MessageEntity[])=>{
        set({messages})
    },
    abortController: new AbortController(),
    handleAbort: () => {
        if (get().abortController) {
            get().abortController.abort("User request");
            set({abortController:new AbortController()})
        }
    }
     
}));