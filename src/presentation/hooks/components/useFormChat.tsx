import { sendMessageUseCase } from "@/domain/use-cases/send-message.use-case";
import { useMessagesStore } from "@/presentation/store";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const useFormChat = () => {

    const createMessage = useMessagesStore((state) => state.createMessage);
    const toggleIsBotTyping = useMessagesStore((state) => state.toggleIsBotTyping);
    const updateMessageStream = useMessagesStore(
        (state) => state.updateMessageStream
    );

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const abortController = useRef<AbortController>(new AbortController());
    const isRunning = useRef(false);

    const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message === "") return;

        if (isRunning.current) {
            abortController.current.abort();
            abortController.current = new AbortController();
        }

        setMessage("");

        
        setIsLoading(true);
        toggleIsBotTyping();
        
        const messages = createMessage({
            id: uuidv4(),
            message,
            from: "user",
        });
        
        const stream = sendMessageUseCase(
            messages,
            abortController.current.signal
        );
        createMessage({ from: "bot", message: "", id: uuidv4() });
        for await (const text of stream) {
            updateMessageStream(text);
        }
        
        toggleIsBotTyping();
        setIsLoading(false);

        isRunning.current = false;
    };

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
        message
    }
}