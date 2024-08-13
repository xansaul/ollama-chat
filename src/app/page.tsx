
import { FormChat, MessagesContainer } from "@/presentation/components";
import { TooltipProvider } from "@radix-ui/react-tooltip";


export default async function Home() {


  return (
    <main className="sm:px-10 h-screen flex flex-col justify-center items-center">
      <div className="w-11/12 xl:w-8/12">
        
          <MessagesContainer />
          <FormChat />
      </div>
    </main>
  );
}

