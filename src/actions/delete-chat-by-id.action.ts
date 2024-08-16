"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function deleteChatByid(id:string){
    await prisma.message.deleteMany({
        where: {chatId: id}
    });

    await prisma.chat.delete({
        where: {id}
    });
    revalidatePath('/', 'layout');
    redirect("/");
}