/** @format */

import { FC, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2Icon } from "../Icons";

interface PromptAlertProps {
  content?: string;
  title?: string;
  showPrompt: boolean;
  handleHidePrompt: () => void;
  handleConfirmPrompt?: () => void;
  loading?: boolean;
  customElement?: ReactNode;
  disable?: boolean;
}

const PromptAlert: FC<PromptAlertProps> = ({
  title,
  content,
  loading,
  showPrompt,
  handleHidePrompt,
  handleConfirmPrompt,
  customElement,
  disable,
}) => {
  return (
    <AlertDialog defaultOpen={false} open={showPrompt}>
      <AlertDialogOverlay />
      <AlertDialogContent className="w-[95%] max-w-2xl md:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {content ||
              "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {customElement ? <> {customElement}</> : null}

        <AlertDialogFooter className="flex flex-row items-end ml-auto">
          <AlertDialogCancel disabled={loading} onClick={handleHidePrompt}>
            Cancel
          </AlertDialogCancel>
          {disable ? (
            <AlertDialogAction
              className="ml-[8px]"
              disabled={disable || loading}
              onClick={handleConfirmPrompt}
            >
              {loading ? (
                <div className="flex flex-row items-center justify-center">
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              className="ml-[8px]"
              disabled={loading}
              onClick={handleConfirmPrompt}
            >
              {loading ? (
                <div className="flex flex-row items-center justify-center">
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PromptAlert;
