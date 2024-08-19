import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../../../ui/sheet'
import { Button } from '../../../ui/button'
import { Menu, Plus } from 'lucide-react'
import Image from 'next/image'
import { Nav } from '../nav/Nav'
import Link from 'next/link'
import { navigationMenuTriggerStyle } from '@/presentation/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Separator } from '@/presentation/components/ui/separator'

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

                <Sheet >
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="lg:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="min-w-64 max-w-64 px-2 w-auto">
                        <SheetHeader>
                            <SheetTitle className="text-center">Chats</SheetTitle>
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

                        <div className="w-full">
                            <Nav chats={chats} />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

        </header>
    )
}
