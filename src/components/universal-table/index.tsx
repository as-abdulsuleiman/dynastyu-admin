/** @format */
"use client";

import { FC } from "react";
import {
  Badge,
  Card,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import { User } from "@/services/graphql";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

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

const renderEmptyItems = () => {
  return (
    <TableRow>
      <TableCell colSpan={4}>
        <div className="flex items-center justify-center h-full w-full mx-auto my-auto py-4">
          <span>No Result Found</span>
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
  const router = useRouter();

  return (
    <Card className="mt-5 w-full overflow-x-scroll">
      <Title>{title}</Title>
      <Table className="mt-3 w-full ">
        <TableHead>
          <TableRow>
            {headerItems.map((a, id) => {
              const firstElem = id !== 0 ? "text-center" : "";
              return (
                <TableHeaderCell className={firstElem} key={id}>
                  {a?.name}
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Loading...</span>
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
            <>{renderEmptyItems()}</>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default UniversalTable;
