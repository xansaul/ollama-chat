"use client";

import { Plus } from "lucide-react";
import React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/presentation/components/ui/navigation-menu";

import Image from "next/image";
import { useParams } from "next/navigation";
import { NavItem } from "./NavItem";

interface Props {
  chats: {
    id: string;
    title: string;
  }[];
}

export const Navbar = ({ chats }: Props) => {
  const { id } = useParams<{ id: string }>();

  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r w-56">
      <div className="border-b pt-3 flex flex-col items-center">
        <Image
          src="/ollama.svg"
          alt="ollama"
          width={24}
          height={24}
          className="pt-3 w-12 h-12"
          priority
        />

        <NavigationMenu className="py-2 min-w-full">
          <NavigationMenuList>
            <NavigationMenuItem className="">
              <NavigationMenuLink
                href="/"
                className={navigationMenuTriggerStyle()}
              >
                <Plus className="mr-1 w-5 h-5" /> New chat
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="w-full overflow-hidden">
        <NavigationMenu className="py-3 min-w-full">
          <NavigationMenuList className=" flex flex-col gap-1">
            {chats.map((chat) => (
              <NavItem
                id={chat.id}
                title={chat.title}
                key={chat.id}
                isActive={id === chat.id}
              />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </aside>
  );
};
