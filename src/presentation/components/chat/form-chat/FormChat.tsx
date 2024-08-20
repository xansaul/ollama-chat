"use client";

import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@radix-ui/react-tooltip";
import { Paperclip, Mic, CornerDownLeft, Square } from "lucide-react";
import { Button, Label, Textarea } from "../..";
import { useFormChat } from "@/presentation/hooks/components/useFormChat";



export const FormChat = () => {

    const { handleAbort, handleSendMessage, isBotTyping, message, setMessage } = useFormChat();

    return (
        <div
            className="relative overflow-y-visible h-auto rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        >

            <div className="grid grid-cols-1 md:grid-cols-12 h-auto">
                <div className="col-span-9 h-auto">
                    <Label htmlFor="message" className="sr-only">
                        Message
                    </Label>

                    <Textarea
                        id="message"
                        placeholder="Type your message here..."
                        className="min-h-24 resize-none border-0 p-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        onChange={(event) => setMessage(event.target.value)}
                        value={message}

                    />
                </div>

                <div className="flex flex-col col-span-3 p-2 ">
                    {isBotTyping ? (
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={handleAbort}
                            className="self-end animate-fade"
                        >
                            <Square />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSendMessage}
                            className="gap-1 w-full"
                            disabled={isBotTyping}
                        >
                            Send Message
                            <CornerDownLeft className="w-4" />
                        </Button>
                    )
                    }

                </div>


            </div>
        </div>
    );
};
