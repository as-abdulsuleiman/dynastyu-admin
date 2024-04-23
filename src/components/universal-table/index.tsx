/** @format */

"use client";

import { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { observer } from "mobx-react-lite";
import { Icons } from "../Icons";
import { Card, CardContent } from "../ui/card";

interface UniversalTableProps {
  items: any[];
  loading: boolean;
  headerItems: HeaderItems[];
  title: string;
  renderItems: ({ item, id }: { item: {}; id: number }) => React.ReactNode;
}

type HeaderItems = {
  name: string;
};

const renderEmptyItems = (colSpan: number) => {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={colSpan || 0} className="p-0 ont-TTHovesRegular">
        <div className="flex items-center justify-center h-full w-full mx-auto my-auto py-9">
          <span className="text-base font-TTHovesRegular">No Result Found</span>
        </div>
      </TableCell>
    </TableRow>
  );
};

const UniversalTable: FC<UniversalTableProps> = ({
  items,
  loading,
  headerItems,
  title,
  renderItems,
}) => {
  return (
    <Card className="mt-5 w-full overflow-x-scroll">
      <CardContent className="p-2">
        {/* <Title>{title}</Title> */}
        {/* <TableCaption>{title}</TableCaption> */}

        <Table className="mt-3 w-full p-0 text-base">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {headerItems.map((item, id) => {
                const firstElem = id !== 0 ? "text-center" : "";
                return (
                  <TableHead className={`${firstElem} py-6`} key={id}>
                    <div className="text-base font-normal font-TTHovesDemiBold">
                      {item?.name}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody className="text-base w-full font-TTHovesRegular">
            {loading ? (
              <TableRow className="py-4 hover:bg-transparent">
                <TableCell
                  colSpan={headerItems?.length || 0}
                  className="p-0 font-TTHovesRegular"
                >
                  <div className="flex items-center justify-center h-full w-full mx-auto my-auto py-9">
                    <Icons.Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    <span className="text-sm font-normal">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : items?.length ? (
              <>
                {items?.map((item, id) => {
                  return <>{renderItems({ item, id })}</>;
                })}
              </>
            ) : (
              <>{renderEmptyItems(headerItems?.length)}</>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default observer(UniversalTable);
