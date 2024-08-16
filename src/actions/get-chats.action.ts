import prisma from "@/lib/db";

export async function getChats(){
    const chats = await prisma.chat.findMany({});
    
    return chats;
}