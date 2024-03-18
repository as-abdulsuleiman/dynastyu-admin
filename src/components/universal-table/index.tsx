/** @format */

"use client";

import { FC } from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";
import { observer } from "mobx-react-lite";
import { Icons } from "../Icons";

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
    <TableRow>
      <TableCell colSpan={colSpan || 0}>
        <div className="flex items-center justify-center h-full w-full mx-auto my-auto py-4">
          <span className="text-base">No Result Found</span>
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
    <Card className="mt-5 w-full overflow-x-scroll bg-background dark:bg-dark-background">
      <Title>{title}</Title>
      <Table className="mt-3 w-full ">
        <TableHead>
          <TableRow>
            {headerItems.map((a, id) => {
              const firstElem = id !== 0 ? "text-center" : "";
              return (
                <TableHeaderCell className={firstElem} key={id}>
                  <div className="text-base font-normal"> {a?.name}</div>
                </TableHeaderCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={headerItems?.length || 0}>
                <div className="flex items-center justify-center h-full w-full mx-auto my-auto py-4">
                  <Icons.Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  <span className="text-sm font-normal">Loading...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : items?.length ? (
            <>
              {items?.map((item, id) => {
                return renderItems({ item, id });
              })}
            </>
          ) : (
            <>{renderEmptyItems(headerItems?.length)}</>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default observer(UniversalTable);
