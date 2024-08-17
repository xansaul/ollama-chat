"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";


export async function deleteChatByid(id:string, isCurrentChat: boolean){
    await prisma.message.deleteMany({
        where: {chatId: id}
    });

    await prisma.chat.delete({
        where: {id}
    });
    revalidatePath('/', 'layout');
    if(isCurrentChat){
        redirect("/", RedirectType.replace);
    }
}