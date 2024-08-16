import React from 'react'
import { MessagesContainer } from '../messages-container/MessagesContainer'
import { FormChat } from '../form-chat/FormChat'

export const NewChat = () => {
  return (
    <div className="sm:px-2 h-screen flex flex-col justify-center items-center">
    <div className="w-11/12 xl:w-8/12">
          <MessagesContainer messagesDatabase={[]} />
          <FormChat />
    </div>
  </div>
  )
}
