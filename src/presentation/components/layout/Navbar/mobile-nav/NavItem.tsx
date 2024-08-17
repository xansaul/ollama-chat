"use client";
import Link from "next/link";
import React from "react";
import { navigationMenuTriggerStyle } from "../../../ui/navigation-menu";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { deleteChatByid } from "@/actions/delete-chat-by-id.action";
import { Button } from "@/presentation/components/ui/button";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/presentation/components/ui/popover";
import { useMessagesStore } from "@/presentation/store";

interface Props {
  title: string;
  id: string;
}

export const NavItem = ({ id, title }: Props) => {
  const handleAbort = useMessagesStore(state=>state.handleAbort);
  const { id: currentPathId } = useParams<{ id: string }>();
  const handleDelete= ()=>{
    deleteChatByid(id, currentPathId === id)
  }

  return (
    <Link
      key={id}
      href={`/chat/${id}`}
      onClick={handleAbort}
      className={cn(
        navigationMenuTriggerStyle(),
        "flex w-auto overflow-hidden justify-between gap-1 px-4 py-6",
        {
          "bg-accent text-accent-foreground": id === currentPathId,
        }
      )}
    >
      <span className="text-nowrap overflow-hidden">{title}</span>
      <Popover>
                <PopoverTrigger>
                    <EllipsisVertical size="18" />
                </PopoverTrigger>
                <PopoverContent className="w-auto">
                    <Button variant="ghost" className="text-red-400" onClick={handleDelete}>
                        <Trash2 className="mr-2 h-4 w-4" /> Eliminate
                    </Button>
                </PopoverContent>
            </Popover>
    </Link>
  );
};
