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
    const getMessages = useMessagesStore(state => state.getMessages);
    
    const createOrUpdateMessageStream = useMessagesStore(
        (state) => state.createOrUpdateMessageStream
    );
    const { id } = useParams<{ id: string }>()
    
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const abortController = useRef<AbortController>(new AbortController());
    const isRunning = useRef(false);

    const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message === "") return;

        setMessage("");
        setIsLoading(true);
       
        const messages = getMessages();
        
        if (!id) {
            await createNewChat({ from: "user", message });
            return;
        }

        generateMessage([...messages, {from: "user", message, id: uuidv4() }], id);
        
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
            abortController.current.signal
        );

        createMessage(messages.at(-1)!);
        
        setBotIsTyping(true);
        for await (const text of stream) {
            const data = JSON.parse(text);
    
            createOrUpdateMessageStream({
                from: "bot",
                message: data.botMessage.message,
                id: data.botMessage.id
            });
        }

        setBotIsTyping(false);
        setIsLoading(false);

        isRunning.current = false;

    }

    const handleAbort = () => {
        if (abortController.current) {
            abortController.current.abort("User request");
            abortController.current = new AbortController();
            setIsLoading(false);
        }
    };


    return {
        handleSendMessage,
        handleAbort,
        isLoading,
        setMessage,
        message,
        isBotTyping
    }
}