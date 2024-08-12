"use client";

import { useMessagesStore } from "@/store/messages/useMessagesStore";
import { Message } from "../messages/Message";

export const MessagesContainer = () => {
  const messages =  useMessagesStore(state=>state.messages);
  return (
    <div className="mb-2 relative min-h-[75vh] max-h-[75vh] overflow-auto rounded-xl bg-secondary/40 p-4 lg:col-span-2 flex flex-col">
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
