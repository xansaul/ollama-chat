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
                        className="min-h-24 resize-none border-0 p-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        onChange={(event) => setMessage(event.target.value)}
                        value={message}

                    />
                </div>

                <div className="flex flex-col col-span-2 p-2 ">
                    {isBotTyping ? (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleAbort}
                            className="self-end animate-fade"
                        >
                            <Square />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="ml-auto gap-1.5 w-full"
                            disabled={isBotTyping}
                        >
                            Send Message
                            <CornerDownLeft className="size-3.5" />
                        </Button>
                    )
                    }

                </div>


            </div>
        </form>
    );
};
