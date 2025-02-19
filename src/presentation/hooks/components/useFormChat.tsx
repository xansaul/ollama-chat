import { MessageEntity } from "@/domain/entities";
import { createNewChatUseCase, sendMessageUseCase } from "@/domain";
import { useMessagesStore } from "@/presentation/store";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useParams, useRouter } from 'next/navigation'

export const useFormChat = () => {

    const router = useRouter();

    const createMessage = useMessagesStore((state) => state.createMessage);
    const setBotIsTyping = useMessagesStore((state) => state.setBotIsTyping);
    const isBotTyping = useMessagesStore((state) => state.isBotTyping);
    const abortController = useMessagesStore(state => state.abortController);
    const handleAbort = useMessagesStore(state => state.handleAbort);
    
    const createOrUpdateMessageStream = useMessagesStore(
        (state) => state.createOrUpdateMessageStream
    );
    const { id } = useParams<{ id: string }>()
    
    const [message, setMessage] = useState("");
    
    const isRunning = useRef(false);


    const handleSendMessage = async () => {
        if (message === "") return;
        if (isRunning.current) return;

        setMessage("");

       
        const messages = createMessage({from: "user", message, id: uuidv4() });
        
        
        if (!id) {
            await createNewChat(messages.at(0)!);
            return;
        }
        console.log("entré")
        

        generateMessage([...messages ], id);
        
    };

    const createNewChat = async (message: MessageEntity) => {
        const data = await createNewChatUseCase(message.message);
        if (data === null) {
            console.error("Error creating chat");
            return null;
        }

        const { chat } = data;
        
        
        router.push(`/chat/${chat.id}`);
        router.refresh();
        await generateMessage([message], chat.id);
    }

    const generateMessage = async (messages: MessageEntity[], chatId: string) => {

        const stream = sendMessageUseCase(
            { messages, chatId },
            abortController.signal
        );

        isRunning.current = true;

        setBotIsTyping(true);
        for await (const text of stream) {
            try {
                
                const data = JSON.parse(text);
        
                createOrUpdateMessageStream({
                    from: "bot",
                    message: data.botMessage.message,
                    id: data.botMessage.id
                });
            } catch (error) {
                console.log(error);
                console.log(`Character: ${text}`);
            }
        }

        setBotIsTyping(false);


        isRunning.current = false;
        router.refresh();
    }


    return {
        handleSendMessage,
        handleAbort,
        setMessage,
        message,
        isBotTyping
    }
}