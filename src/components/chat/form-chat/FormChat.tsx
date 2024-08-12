"use client";

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useMessagesStore } from '@/store/messages/useMessagesStore'
import { Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'
import { Paperclip, Mic, CornerDownLeft } from 'lucide-react'
import React, { useState } from 'react'

export const FormChat = () => {
    const [message, setMessage] = useState('');
    const createMessage = useMessagesStore(state=>state.createMessage);
    const updateMessageStream = useMessagesStore(state=>state.updateMessageStream);

    const sendMessage = async (message: string) => {
        
        const response = await fetch('/api/generate',{
            method: 'POST',
            body: JSON.stringify({message}),
            headers: {
                'Content-Type': 'application/json' 
            },
        });

        if (!response.body) {
            console.error('No body in response');
            return;
        }
      
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let messageResponse = '';
        createMessage({from: 'bot', message: messageResponse});
      
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                messageResponse += decoder.decode(value, { stream: true });
                
                updateMessageStream(messageResponse);
            }

        } catch (error) {
            console.error('Error reading stream', error);
        }
      };
      
    const handleSendMessage = () => {
        if (message==='') return;

        createMessage({
            message,
            from: 'user'
        });
        setMessage('');

        sendMessage(message);

    }

    return (
        <div
            className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
        >
            <Label htmlFor="message" className="sr-only">
                Message
            </Label>
            <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                onChange={(event)=>setMessage(event.target.value)}
                value={message}
            />
            <div className="flex items-center p-3 pt-0">
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
                <Button onClick={handleSendMessage} size="sm" className="ml-auto gap-1.5">
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                </Button>
            </div>
        </div>
    )
}
