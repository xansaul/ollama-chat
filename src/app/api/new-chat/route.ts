import prisma from "@/lib/db";
import { z } from "zod";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";


const schema = z.object({
  title: z.string().min(2),
});

export async function POST(req: Request) {
  const { error, data } = schema.safeParse(await req.json());

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }

  try {
    const newChat = await prisma.chat.create({
      data: {
        title: data.title,
      },
    });
    revalidatePath('/', 'layout');
    return NextResponse.json({chat: newChat }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Check server logs" }, { status: 500 });
  }
}
