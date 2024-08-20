"use client";
import {
  NavigationMenu,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/presentation/components/ui/navigation-menu";
import React from "react";
import { NavItem } from "./NavItem";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Separator } from "@/presentation/components/ui/separator";
import { useMessagesStore } from "@/presentation/store";

interface Props {
  chats: {
    id: string;
    title: string;
  }[]
}

export const Nav = ({ chats }: Props) => {
  
  const handleAbort = useMessagesStore(state=>state.handleAbort);
  return (
    <NavigationMenu className="py-3 min-w-full max-w-full px-1">
      <NavigationMenuList className="flex flex-col gap-1">
        <Link
          href="/"
          className={cn(navigationMenuTriggerStyle(), "w-auto")}
        >
          <span onClick={handleAbort} className="flex">
            <Plus className="mr-1 w-5 h-5" /> New chat
          </span>
        </Link>
        <Separator className="my-4" />
        {chats.map((chat) => (
          <NavItem id={chat.id} title={chat.title} key={chat.id} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
