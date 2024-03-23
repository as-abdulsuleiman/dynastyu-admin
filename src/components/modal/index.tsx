/** @format */

import { FC } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  trigger?: React.ReactNode | JSX.Element;
  content: React.ReactNode | JSX.Element;
  contentClass?: string;
  label?: string;
  isModal?: boolean;
}

const ModalCard: FC<ModalProps> = ({
  label,
  trigger,
  content,
  isOpen,
  isModal,
  contentClass,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal={isModal}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          "w-full sm:max-w-[425px] md:max-w-lg m-auto",
          contentClass
        )}
      >
        {label ? (
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
          </DialogHeader>
        ) : null}
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default ModalCard;
