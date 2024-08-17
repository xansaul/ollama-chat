"use server";

import { MessageEntity } from "@/domain/entities";
import { MessageMapper } from "@/infrastructure/mappers/message-mappers/MessageMapper";
import prisma from "@/lib/db";
import { Message } from "@prisma/client";

export async function getMessagesById(id: string): Promise<MessageEntity[]> {
  const messages = await prisma.message.findMany({ where: { chatId: id }, orderBy: { createdAt: 'asc' } });
  return messages.map((message: Message) =>
    MessageMapper.fromDatabaseMessageToMessageEntity(message)
  );
}
