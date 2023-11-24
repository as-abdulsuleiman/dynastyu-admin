/** @format */

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
import { CalculatorIcon } from "@heroicons/react/outline";
import { Select, SelectItem } from "@tremor/react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UsersTableProps {
  users: any;
}

const UsersTable: FC<UsersTableProps> = ({ users }) => {
  return (
    <Card className="mt-5 w-full">
      <Title>Users List</Title>
      <Table className="mt-5 ">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.users?.map((item: User) => {
            if (item.accountType)
              return (
                <TableRow key={item?.id}>
                  <TableCell>
                    <Flex alignItems="center" justifyContent="start">
                      <Avatar>
                        <AvatarImage src={item?.avatar || ""} alt="@shadcn" />
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
                  <TableCell>
                    <Text>{item.accountType?.role?.title}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{item?.email}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge color="emerald" icon={StatusOnlineIcon}>
                      {item?.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default UsersTable;
