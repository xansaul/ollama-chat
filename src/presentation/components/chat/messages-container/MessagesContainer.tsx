"use client";

import { useMessagesStore } from "@/presentation/store";
import { Message } from "../messages/Message";
import { useEffect, useRef, useState } from "react";

export const MessagesContainer = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messages =  useMessagesStore(state=>state.messages);
  const [isUserScroll, setIsUserScroll] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current && !isUserScroll) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isUserScroll]);

  const handleScrollUser = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const divHeight = event.currentTarget.scrollHeight - event.currentTarget.clientHeight;
    const offset = divHeight - event.currentTarget.scrollTop;
    
    if (event.currentTarget.scrollTop<divHeight){
      setIsUserScroll(true);
    }

    if(offset <= 20){
      setIsUserScroll(false);
    }

  }

  return (
    <div className="mb-2 relative min-h-[80vh] max-h-[80vh] overflow-y-auto rounded-xl bg-secondary/40 p-4 lg:col-span-2 flex flex-col" ref={chatContainerRef} onScroll={handleScrollUser}>
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
