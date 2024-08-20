'use client';
import React from 'react'
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '../../../ui/navigation-menu'
import { deleteChatByid } from '@/actions/delete-chat-by-id.action'
import { cn } from '@/lib/utils'
import { EllipsisVertical, Trash2 } from 'lucide-react'
import { Button } from '../../../ui/button'
import Link from 'next/link'
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover'
import { useMessagesStore } from '@/presentation/store';
import { useParams } from 'next/navigation';

interface Props {
    id: string;
    title: string;
}


export const NavItem = ({id, title}:Props) => {
    const handleAbort = useMessagesStore(state=>state.handleAbort);
    const { id: currentPathId } = useParams<{ id: string }>();
    const handleDelete= ()=>{
        deleteChatByid(id, currentPathId === id)
    }

    return (
        <NavigationMenuItem
            className={cn(
                navigationMenuTriggerStyle(),
                "min-w-full max-w-full flex overflow-hidden justify-between gap-1 ", {
                "bg-accent text-accent-foreground": currentPathId === id
            }
            )}
        >
            <Link href={`/chat/${id}`} legacyBehavior passHref>
                <NavigationMenuLink>
                    <span onClick={handleAbort} className="block min-w-40 max-w-40 overflow-hidden text-nowrap ">{title}</span>
                </NavigationMenuLink>
            </Link>
            <Popover>
                <PopoverTrigger>
                    <EllipsisVertical size="18" />
                </PopoverTrigger>
                <PopoverContent className="w-auto">
                    <Button variant="ghost" className="text-red-400" onClick={handleDelete}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                </PopoverContent>
            </Popover>
        </NavigationMenuItem>

    )
}
