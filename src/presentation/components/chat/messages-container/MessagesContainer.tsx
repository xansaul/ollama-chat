"use client";

import { useMessagesStore } from "@/presentation/store";
import { Message } from "../messages/Message";
import { useEffect, useRef } from "react";

export const MessagesContainer = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messages =  useMessagesStore(state=>state.messages);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="mb-2 relative min-h-[75vh] max-h-[75vh] overflow-auto rounded-xl bg-secondary/40 p-4 lg:col-span-2 flex flex-col" ref={chatContainerRef}>
        {
            messages.map((message, idx)=>{

              return message.from === 'user'?
                 (<Message key={idx} {...message}/>): 
                 (<Message key={idx} {...message} variant="bot" />)
            }
            )
        }
    </div>
  )
}
