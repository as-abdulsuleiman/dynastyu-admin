/** @format */

"use client";

import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionCardProps {
  value: string;
  trigger: React.ReactNode | JSX.Element | string;
  content?: React.ReactNode | JSX.Element | string;
}

const AccordionCard: FC<AccordionCardProps> = ({ trigger, content, value }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={value}>
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionCard;
