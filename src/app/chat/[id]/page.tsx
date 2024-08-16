import { getChatById } from "@/actions/find-chat-by-id.action";
import { Chat } from "@/presentation/components/chat/chat/Chat";
import { redirect } from 'next/navigation'


interface Props {
    params: { id: string }
}

export default async function ChatPage({ params }:Props) {
    const {id} = params;
    const chat = await getChatById(id);

    if(!chat){
        redirect("/");
    }

    return (
        <Chat id={id} />
    );
}