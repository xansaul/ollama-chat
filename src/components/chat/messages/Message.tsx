import React from "react";
import { Card, CardContent } from "../../ui/card";

interface Props {
  message: string;
  from: string;
}

export const Message = ({ from, message }: Props) => {
  return (
    <Card className="bg-primary/5 w-fit border-primary/20">
      <CardContent className="flex justify-start items-center p-0 py-4 px-3 ">
        <span>{message}</span>
      </CardContent>
    </Card>
  );
};
