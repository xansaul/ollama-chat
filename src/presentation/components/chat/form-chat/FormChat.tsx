"use client";

import React, { useRef, useState } from "react";

import { useMessagesStore } from "@/presentation/store";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@radix-ui/react-tooltip";
import { Paperclip, Mic, CornerDownLeft, Square } from "lucide-react";
import { Button, Label, Textarea } from "../..";
import { sendMessageUseCase } from "@/domain/use-cases/send-message.use-case";

export const FormChat = () => {
    const createMessage = useMessagesStore((state) => state.createMessage);
    const [message, setMessage] = useState("");
    const updateMessageStream = useMessagesStore(
        (state) => state.updateMessageStream
    );
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

        createMessage({
            message,
            from: "user",
        });

        setIsLoading(true);
        createMessage({ from: "bot", message: "" });
        const stream = sendMessageUseCase(message, abortController.current.signal);

        for await (const text of stream) {
            updateMessageStream(text);
        }

        setIsLoading(false);

        isRunning.current = false;
    };

    const handleAbort = async () => {
        if (abortController.current) {
            await abortController.current.abort("User request");
            abortController.current = new AbortController();
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSendMessage}
            className="relative overflow-y-visible h-auto rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        >

            <div className="grid grid-cols-1 lg:grid-cols-12 h-auto">
                <div className="col-span-10 h-auto">
                    <Label htmlFor="message" className="sr-only">
                        Message
                    </Label>

                    <Textarea
                        id="message"
                        placeholder="Type your message here..."
                        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        onChange={(event) => setMessage(event.target.value)}
                        value={message}

                    />
                </div>

                <div className="flex flex-col col-span-2 p-2 ">
                    {isLoading ? (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleAbort}
                            className="self-end"
                        >
                            <Square />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="ml-auto gap-1.5 w-full "
                            disabled={isLoading}
                        >
                            Send Message
                            <CornerDownLeft className="size-3.5" />
                        </Button>
                    )
                    }

                </div>


            </div>
            <div className="flex items-center p-2 pt-0">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Paperclip className="size-4" />
                            <span className="sr-only">Attach file</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Mic className="size-4" />
                            <span className="sr-only">Use Microphone</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>

            </div>
        </form>
    );
};
