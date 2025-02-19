"use client";

import React from "react";
import { Card, CardContent } from "../../ui/card";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { CustomMarkdown } from "../markdown/CustomMarkdown";


const messageVariants = cva(
  `
    w-fit max-w-full border-primary/20 my-2
  `,{
    variants: {
      variant: {
        bot: "bg-primary/10 self-start",
        user: "bg-blue-700 self-end"
      }
    },
    defaultVariants: {
      variant: "user"
    }
  });


interface Props extends VariantProps<typeof messageVariants> {
  message: string;
  className?: string;
}

  
export const Message = ({  message, variant, className  }: Props) => {

  if (message === ""){
    return null;
  }

  return (
    <Card className={cn(messageVariants({variant, className}))}>
      <CardContent className="p-0 py-2 px-3">  
        <CustomMarkdown markdown={message} />
      </CardContent>
    </Card> 
  );

};
