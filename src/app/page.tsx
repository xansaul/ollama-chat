import { FormChat } from "@/components/chat/form-chat/FormChat";
import { Message } from "@/components/chat/messages/Message";
import { TooltipProvider } from "@radix-ui/react-tooltip";


export default function Home() {
  return (
    <main className="px-10 py-5 h-screen flex flex-col justify-center items-center">
      <div className="w-10/12">
      
        <TooltipProvider>
          <div className="mb-2 relative min-h-[75vh] rounded-xl bg-muted/20 p-4 lg:col-span-2">
            <Message message="Non aliquip sunt do exercitation aliquip do ullamco eu culpa. Magna ex adipisicing veniam aliqua eu ex ea. Non exercitation pariatur exercitation esse in magna ipsum laboris exercitation mollit." from="me" />
          </div>
          <FormChat />
        </TooltipProvider>
      </div>
    </main>
  );
}
