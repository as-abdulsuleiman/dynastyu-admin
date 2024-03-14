/** @format */

import { FC } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface MenubarCardProps {
  trigger: React.ReactNode | JSX.Element;
  items: Item[];
}
type Item = {
  name: string;
  onClick?: () => void;
};

const MenubarCard: FC<MenubarCardProps> = ({ trigger, items }) => {
  return (
    <Menubar className="bg-transparent border-0 hover:bg-transparent focus:bg-transparent px-0">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer px-0 data-[state=open]:bg-transparent hover:bg-transparent focus:bg-transparent bg-transparent focus-within:bg-transparent focus-visible:bg-transparent active:bg-transparent">
          {trigger}
          {/* <Icons.moreHorizontal className="cursor-pointer" /> */}
        </MenubarTrigger>
        <MenubarContent
          side="bottom"
          align="start"
          sideOffset={-2}
          alignOffset={-150}
          className="rounded-tremor-default cursor-pointer bg-background dark:bg-dark-background"
        >
          {items?.map((val, id) => {
            return (
              <MenubarItem
                onClick={val?.onClick}
                key={id}
                className="cursor-pointer tremor-SelectItem-root flex justify-start items-center text-tremor-default ui-selected:text-tremor-content-strong ui-selected:bg-tremor-background-muted text-tremor-content-emphasis dark:ui-active:bg-dark-tremor-background-muted dark:ui-active:text-dark-tremor-content-strong dark:ui-selected:text-dark-tremor-content-strong dark:ui-selected:bg-dark-tremor-background-muted dark:text-dark-tremor-content-emphasis px-2.5 py-2.5"
              >
                {val?.name}
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenubarCard;
