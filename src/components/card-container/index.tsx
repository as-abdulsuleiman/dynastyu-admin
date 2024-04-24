/** @format */

import { FC, ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: ReactNode;
  cardClassName?: string;
}

const CardContainer: FC<CardProps> = ({
  className,
  children,
  cardClassName,
}) => {
  return (
    <Card className={cardClassName}>
      <CardContent className={cn("p-2 md:p-6", className)}>
        {children}
      </CardContent>
    </Card>
  );
};

export default CardContainer;
