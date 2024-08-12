import { FormChat } from "@/components/chat/form-chat/FormChat";
import { MessagesContainer } from "@/components/chat/messages-container/MessagesContainer";

import { TooltipProvider } from "@radix-ui/react-tooltip";


export default async function Home() {


  return (
    <main className="px-10 py-5 h-screen flex flex-col justify-center items-center">
      <div className="w-11/12 xl:w-8/12">
        <TooltipProvider>
          <MessagesContainer />
          <FormChat />
        </TooltipProvider>
      </div>
    </main>
  );
}

