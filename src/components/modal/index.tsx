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
  children: React.ReactNode;
  contentClass?: string;
  label?: string;
  isModal?: boolean;
}

const ModalCard: FC<ModalProps> = ({
  label,
  trigger,
  children,
  isOpen,
  isModal = true,
  contentClass,
  onOpenChange,
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
      modal={isModal}
      defaultOpen={false}
    >
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        onOpenAutoFocus={(event) => event?.preventDefault()}
        onInteractOutside={(event) => event?.preventDefault()}
        className={cn(
          "w-[95%] max-w-2xl  container md:max-w-lg lg:max-w-xl xl:max-w-xl m-auto rounded-2xl z-50 bg-background bg-gradient-to-bl from-primary-black via-primary-black/5 to-primary-black px-[16px] md:px-[2rem] py-[2rem]",
          contentClass
        )}
      >
        {label ? (
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
          </DialogHeader>
        ) : null}
        <div className="p-4 pb-0">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCard;
