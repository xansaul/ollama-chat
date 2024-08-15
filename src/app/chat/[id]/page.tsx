import { MessagesContainer } from "@/presentation/components";

interface Props {
    params: { id: string }
}


export default function ChatPage({ params }:Props) {
    const {id} = params;
    return (
        <main>
            <MessagesContainer messages={[{ from: 'bot', message: "asd", id: "asdasd" }]} />
        </main>
    );
}