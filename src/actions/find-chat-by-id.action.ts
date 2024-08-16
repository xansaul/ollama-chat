"use server";
import prisma from "@/lib/db";

export async function getChatById(id:string){
    const chat = await prisma.chat.findFirst({
        where: {id}
    });

    return chat;
}