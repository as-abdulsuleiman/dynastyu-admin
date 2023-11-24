/** @format */
"use client";
import { FC, useEffect, useMemo, useState } from "react";
import {
  Title,
  Text,
  Divider,
  TabGroup,
  TabPanels,
  TabPanel,
  Flex,
  Grid,
  BadgeDelta,
  TabList,
  Tab,
  AreaChart,
  Card,
  Metric,
  DeltaType,
  ProgressBar,
  Icon,
} from "@tremor/react";
import { useRouter } from "next/navigation";
import { SortOrder, useGetUsersQuery } from "@/services/graphql";
import { InformationCircleIcon } from "@heroicons/react/solid";
import UsersTable from "@/components/users-table";
import { Loader2 } from "lucide-react";
import SelectCard from "@/components/select";

interface UsersProps {}

type Kpi = {
  title: string;
  metric: string | number;
  progress: number;
  target: string;
  delta: string;
  deltaType: DeltaType;
  path: string;
  loading: boolean;
};

const Users: FC<UsersProps> = ({}) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const {
    data: usersData,
    loading: loadingUsers,
    refetch,
  } = useGetUsersQuery({
    variables: {
      where: {
        isActive: {
          equals: true,
        },
      },
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  useEffect(() => {
    if (!value || value === "") {
      setValue("Active");
    }
    if (value && value === "Active") {
      refetch({
        where: {
          isActive: {
            equals: true,
          },
        },
      });
    } else {
      refetch({
        where: {
          isActive: {
            equals: false,
          },
        },
      });
    }
  }, [value]);

  const kpiData: Kpi[] = [
    {
      title: `${value} Users`,
      metric: usersData?.users?.length || 0,
      progress: 15.9,
      target: "80,000",
      delta: "13.2%",
      deltaType: "moderateIncrease",
      path: "/users",
      loading: loadingUsers,
    },
  ];

  return (
    <main className="w-full h-full">
      <Title>Users</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <Divider></Divider>

      <TabGroup className="mt-6">
        {/* <TabList>
          <Tab>Overview</Tab>
          <Tab>Detail</Tab>
        </TabList> */}
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={1} numItemsLg={2} className="mt-6 gap-6">
              {kpiData?.map((item) => (
                <Card key={item.title}>
                  {item.loading ? (
                    <div className="flex items-center justify-center h-full w-full mx-auto my-auto">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <>
                      <Flex alignItems="start">
                        <div className="truncate">
                          <Text>{item.title}</Text>
                          <Metric className="truncate mt-1">
                            {item.metric}
                          </Metric>
                        </div>
                        {/* <Icon
                      icon={item.icon}
                      variant="simple"
                      tooltip="Shows sales performance per employee"
                    /> */}
                        <BadgeDelta deltaType={item.deltaType}>
                          {item.delta}
                        </BadgeDelta>
                      </Flex>
                      <Flex className="mt-4 space-x-2">
                        {/* <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text> */}
                        {/* <Text className="truncate">{item.target}</Text> */}
                      </Flex>
                      <ProgressBar value={item.progress} className="mt-2" />
                    </>
                  )}
                </Card>
              ))}

              <SelectCard
                className="max-w-3xl w-full ml-auto h-14 mt-4 self-center"
                items={[
                  { name: "Active", value: "Active" },
                  { name: "Inactive", value: "Inactive" },
                ]}
                selectedItem={value}
                onValueChange={(e) => {
                  console.log("e", e);
                  setValue(e);
                }}
              />
            </Grid>
          </TabPanel>
          {/* <TabPanel>
            <div className="mt-6">
              <Card>
                <>
                  <div>
                    <Flex
                      className="space-x-0.5"
                      justifyContent="start"
                      alignItems="center"
                    >
                      <Title> Performance History </Title>
                      <Icon
                        icon={InformationCircleIcon}
                        variant="simple"
                        tooltip="Shows sales performance per employee"
                      />
                    </Flex>
                  </div>
                  <div className="flex space-x-2">
                    <MultiSelect
                      className="max-w-full sm:max-w-xs"
                      onValueChange={setSelectedNames}
                      placeholder="Select Salespeople..."
                    >
                      {salesPeople.map((item) => (
                        <MultiSelectItem key={item.name} value={item.name}>
                          {item.name}
                        </MultiSelectItem>
                      ))}
                    </MultiSelect>
                    <Select
                      className="max-w-full sm:max-w-xs"
                      defaultValue="all"
                      onValueChange={setSelectedStatus}
                    >
                      <SelectItem value="all">All Performances</SelectItem>
                      <SelectItem value="overperforming">
                        Overperforming
                      </SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="underperforming">
                        Underperforming
                      </SelectItem>
                    </Select>
                  </div>
                  <Table className="mt-6">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Leads
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Sales ($)
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Quota ($)
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Variance
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Region
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Status
                        </TableHeaderCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {salesPeople
                        .filter((item) => isSalesPersonSelected(item))
                        .map((item) => (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">
                              {item.leads}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.sales}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.quota}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.variance}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.region}
                            </TableCell>
                            <TableCell className="text-right">
                              <BadgeDelta
                                deltaType={deltaTypes[item.status]}
                                size="xs"
                              >
                                {item.status}
                              </BadgeDelta>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </>
              </Card>
            </div>
          </TabPanel> */}
        </TabPanels>
      </TabGroup>
      <UsersTable users={usersData?.users} />
    </main>
  );
};

export default Users;
