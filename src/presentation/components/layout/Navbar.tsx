"use client";

import { BotMessageSquare, EllipsisVertical, Trash2 } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/presentation/components/ui/navigation-menu";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r w-56">
      <div className="border-b pt-3 flex flex-col items-center">
        <BotMessageSquare />

        <NavigationMenu className="py-3 min-w-full">
          <NavigationMenuList>
            <NavigationMenuItem className="">
              <NavigationMenuLink
                href="/"
                className={navigationMenuTriggerStyle()}
              >
                New chat
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="w-full overflow-hidden">
        <NavigationMenu className="py-3 min-w-full">
          <NavigationMenuList>
            <NavigationMenuItem
              className={cn(
                navigationMenuTriggerStyle(),
                "w-7 flex min-w-52 justify-between gap-1 "
              )}
            >
              <NavigationMenuLink
                href="/"
              >
                <span className="block w-40 overflow-hidden">test chat</span>
              </NavigationMenuLink>
              <Popover>
                <PopoverTrigger>
                  <EllipsisVertical size="16" />
                </PopoverTrigger>
                <PopoverContent className="w-auto">
                  <Button variant="ghost" className="text-red-400">
                    <Trash2 className="mr-2 h-4 w-4" /> Eliminate
                  </Button>
                </PopoverContent>
              </Popover>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </aside>
  );
};
