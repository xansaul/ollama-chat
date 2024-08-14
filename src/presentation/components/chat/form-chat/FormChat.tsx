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

    const { handleAbort, handleSendMessage, isLoading, message, setMessage } = useFormChat();

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
                            className="self-end animate-fade animate-duration-[600ms]"
                        >
                            <Square />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="ml-auto gap-1.5 w-full animate-fade animate-duration-[600ms]"
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
