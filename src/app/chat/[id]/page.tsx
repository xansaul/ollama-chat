
import { getChatById } from "@/actions/find-chat-by-id.action";
import { getMessagesById } from "@/actions/get-messages-by-id.action";
import { MessagesContainer } from "@/presentation/components";
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

    const messages = await getMessagesById(id);

    return (
        <MessagesContainer messagesDatabase={messages} />
    );
}