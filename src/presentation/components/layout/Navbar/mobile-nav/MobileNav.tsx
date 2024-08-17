"use client";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../../../ui/sheet'
import { Button } from '../../../ui/button'
import { Menu, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { NavItem } from './NavItem'

interface Props {
    chats: {
        id: string;
        title: string;
    }[]
}

export const MobileNav = ({ chats }: Props) => {

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:static lg:h-auto lg:border-0 lg:bg-transparent lg:px-6">
            <div>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="lg:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="min-w-64 max-w-64">
                        <SheetHeader className="mb-5">
                            <SheetTitle>Chats</SheetTitle>
                            <Image
                                src="/ollama.svg"
                                alt="ollama"
                                width={24}
                                height={24}
                                className="my-10 mx-auto w-16 h-16"
                                priority
                                />
                                <SheetDescription></SheetDescription>
                        </SheetHeader>
                        <nav className="grid gap-1 text-lg font-medium">
                            <Link href={'/'} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground mb-5">
                                <Plus className="mr-1 w-5 h-5" /> New chat
                            </Link>
                            {chats.map((chat) => (
                                <NavItem key={chat.id} id={chat.id} title={chat.title} />
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>

        </header>
    )
}
