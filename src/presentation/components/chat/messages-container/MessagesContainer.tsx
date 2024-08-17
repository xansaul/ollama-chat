"use client";

import { useMessagesStore } from "@/presentation/store";
import { Message } from "../messages/Message";
import { useEffect, useRef, useState } from "react";
import { Brain } from "lucide-react";
import Image from "next/image";
import { MessageEntity } from "@/domain/entities";

interface Props {
  messagesDatabase?: MessageEntity[];

}

export const MessagesContainer = ({ messagesDatabase = [] }: Props) => {
  const isBotTyping = useMessagesStore(state => state.isBotTyping);
  const messages = useMessagesStore(state => state.messages);
  const setMessages = useMessagesStore(state => state.setMessages);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [isUserScroll, setIsUserScroll] = useState(false);

  useEffect(() => {
    setMessages(messagesDatabase);
  }, [messagesDatabase, setMessages]);

  useEffect(() => {
    if (chatContainerRef.current && !isUserScroll) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isUserScroll]);

  const handleScrollUser = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const divHeight = event.currentTarget.scrollHeight - event.currentTarget.clientHeight;
    const offset = divHeight - event.currentTarget.scrollTop;

    if (event.currentTarget.scrollTop < divHeight) {
      setIsUserScroll(true);
    }

    if (offset <= 20) {
      setIsUserScroll(false);
    }

  }

  return (
    <div className="mb-2 relative min-h-[65vh] max-h-[65vh] lg:min-h-[80vh]  lg:max-h-[80vh] overflow-y-auto overflow-x-hidden rounded-xl bg-secondary/40 p-4 lg:col-span-2 flex flex-col" ref={chatContainerRef} onScroll={handleScrollUser}>

      {
        messages.length <= 0  && (
          <div className="flex-1 flex flex-col justify-center items-center gap-7 opacity-50 ">
            <Image
              src={"/ollama.svg"}
              alt={"ollama"}
              width={50}
              height={50}
              className="w-36 h-auto"
              priority
            />
            <p className="text-xl font-semibold">Welcome, let&apos;s chat!!!</p>
          </div>
        )
      }

      {
        messages.map((message) => {

          return message.from === 'user' ?
            (<Message key={message.id} {...message} />) :
            (<Message key={message.id} {...message} variant="bot" />)
        }
        )
      }
      {
        isBotTyping && (<div className="flex flex-col w-full">
          <div className="self-start">
            <Brain className="animate-pulse animate-infinite animate-duration-[1600ms] animate-ease-linear" absoluteStrokeWidth size="19" />
          </div>
        </div>)
      }
    </div>
  )
}
