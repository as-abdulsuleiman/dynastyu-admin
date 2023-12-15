/** @format */
"use client";

import { FC } from "react";
import { StatusOnlineIcon } from "@heroicons/react/outline";
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

interface UsersTableProps {
  users: any;
  loading: boolean;
  headerItems: HeaderItems[];
  title: string;
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

const UsersTable: FC<UsersTableProps> = ({
  users,
  loading,
  headerItems,
  title,
}) => {
  const router = useRouter();

  return (
    <Card className="mt-5 w-full">
      <Title>{title}</Title>
      <Table className="mt-5 w-full">
        <TableHead>
          <TableRow className="">
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
              <TableCell colSpan={4}>
                <div className="flex items-center justify-center h-full w-full mx-auto my-auto py-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : users?.users?.length ? (
            <>
              {users?.users?.map((item: User) => {
                return (
                  <TableRow key={item?.id}>
                    <TableCell>
                      <Flex
                        alignItems="center"
                        justifyContent="start"
                        onClick={() => router.push(`/user/${item?.id}`)}
                      >
                        <Avatar>
                          <AvatarImage
                            src={item?.avatar || ""}
                            alt={`${item?.username || item?.firstname}`}
                          />
                          <AvatarFallback>
                            {item?.firstname?.charAt(0)}
                            {item?.surname?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <Text className="ml-2">
                          {item?.firstname} {item?.surname}
                        </Text>
                      </Flex>
                    </TableCell>
                    <TableCell className="text-center">
                      <Text>{item.accountType?.role?.title}</Text>
                    </TableCell>
                    <TableCell className="text-center">
                      <Text>{item?.email}</Text>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        size="xs"
                        className="cursor-pointer"
                        color={item?.isActive ? "emerald" : "rose"}
                        // tooltip="decrease"
                        icon={StatusOnlineIcon}
                        datatype="moderateDecrease"
                      >
                        {item?.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
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

export default UsersTable;
