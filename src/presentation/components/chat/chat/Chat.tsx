
import { FormChat } from "../form-chat/FormChat";
import { MessagesContainer } from "../messages-container/MessagesContainer";
import { getMessagesById } from "@/actions/get-messages-by-id.action";


interface Props {
  id: string
}

export const Chat = async({ id }:Props) => {

  const messages = await getMessagesById(id);

  return (
    <div className="sm:px-2 h-screen flex flex-col justify-center items-center">
      <div className="w-11/12 xl:w-8/12">
          <MessagesContainer messagesDatabase={messages} />
          <FormChat />
      </div>
    </div>
  );
};
