import {
  NavigationMenu,
  NavigationMenuList,
} from "@/presentation/components/ui/navigation-menu";
import React from "react";
import { NavItem } from "../aside-nav/NavItem";

interface Props {
    chats: {
        id: string;
        title: string;
    }[]
}

export const Nav = ({chats}:Props) => {
  return (
    <NavigationMenu className="py-3 min-w-full max-w-full px-1">
      <NavigationMenuList className="flex flex-col gap-1">
        {chats.map((chat) => (
          <NavItem id={chat.id} title={chat.title} key={chat.id} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
