/** @format */
"use client";
import { useRootStore } from "@/mobx";
import { MailIcon } from "@heroicons/react/solid";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { UsersIcon } from "@heroicons/react/solid";
import { useRouter } from "next/navigation";
import {
  AreaChart,
  BadgeDelta,
  Divider,
  Card,
  Color,
  DeltaType,
  Flex,
  Grid,
  Icon,
  Metric,
  MultiSelect,
  MultiSelectItem,
  ProgressBar,
  Select,
  SelectItem,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
  LineChart,
} from "@tremor/react";
import { useMemo, useState } from "react";
import {
  SortOrder,
  useGetAthletesQuery,
  useGetCoachesQuery,
  useGetSchoolsQuery,
  useGetUsersQuery,
} from "@/services/graphql";
import { BarChart, Loader2, LucideIcon, School } from "lucide-react";
import format from "date-fns/format";

type Kpi = {
  title: string;
  metric: string | number;
  progress: number;
  target: string;
  delta: string;
  deltaType: DeltaType;
  icon: unknown;
  path: string;
  loading: boolean;
};

export default function Home() {
  const {
    authStore: { user },
  } = useRootStore();
  const router = useRouter();
  const [value, setValue] = useState(null);

  const { data: coachesData, loading: loadingCoaches } = useGetCoachesQuery({});
  const { data: atheletesData, loading: loadingAtheletes } =
    useGetAthletesQuery({});

  const { data: schoolsData, loading: loadingSchoolData } = useGetSchoolsQuery({
    variables: {
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const { data: userData, loading: loadingUsers } = useGetUsersQuery({
    variables: {
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });
  const { data: FanData, loading: loadingFans } = useGetUsersQuery({
    variables: {
      where: {
        accountType: {
          is: {
            role: {
              is: {
                title: {
                  equals: "Fan",
                },
              },
            },
          },
        },
      },
    },
  });
  const kpiData: Kpi[] = [
    {
      title: "Total Users",
      metric: userData?.users?.length || 0,
      progress: 15.9,
      target: "80,000",
      delta: "13.2%",
      deltaType: "moderateIncrease",
      icon: UsersIcon,
      path: "/users",
      loading: loadingUsers,
    },
    {
      title: "Total Atheletes",
      metric: atheletesData?.athleteProfiles?.length || 0,
      progress: 15.9,
      target: "80,000",
      delta: "13.2%",
      deltaType: "moderateIncrease",
      icon: UsersIcon,
      path: "/atheletes",
      loading: loadingAtheletes,
    },
    {
      title: "Total Coaches",
      metric: coachesData?.coachProfiles?.length || 0,
      progress: 36.5,
      target: "125,000",
      delta: "23.9%",
      deltaType: "moderateIncrease",
      icon: UsersIcon,
      path: "/coaches",
      loading: loadingCoaches,
    },
    {
      title: "Total Schools",
      metric: schoolsData?.schools.length || 0,
      progress: 53.6,
      target: "2,000",
      delta: "10.1%",
      deltaType: "moderateDecrease",
      icon: "",
      path: "/schools",
      loading: loadingSchoolData,
    },
    {
      title: "Total Fans",
      metric: FanData?.users?.length || 0,
      progress: 53.6,
      target: "2,000",
      delta: "10.1%",
      deltaType: "moderateIncrease",
      icon: "",
      path: "/fans",
      loading: loadingFans,
    },
  ];

  const chartdata: any = useMemo(() => {
    return userData?.users?.map((a) => {
      return {
        date: format(new Date(a?.createdAt), "MMM dd"),
        "2022": 50,
        "2023": 78,
      };
    });
  }, [userData?.users]);

  return (
    <main className="w-full h-full">
      <Title>Dashboard Overview</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <Divider></Divider>
      <TabGroup className="mt-6">
        {/* <TabList>
          <Tab>Overview</Tab>
          <Tab>Detail</Tab>
        </TabList> */}
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={4} className="mt-6 gap-6">
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
                        <BadgeDelta
                          className="cursor-pointer"
                          onClick={() => router.push(item.path)}
                          deltaType={item.deltaType}
                        >
                          View
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
            </Grid>
            <div className="mt-6">
              <Card>
                <>
                  <div className="md:flex justify-between">
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
                          tooltip="Shows daily increase or decrease of particular domain"
                        />
                      </Flex>
                      <Text>Daily change per user </Text>
                    </div>
                  </div>
                  <LineChart
                    className="h-72 mt-4"
                    data={chartdata}
                    index="date"
                    categories={["2022", "2023"]}
                    colors={["emerald", "indigo"]}
                    yAxisWidth={30}
                    onValueChange={(v) => {
                      setValue(v);
                      console.log("v", v);
                    }}
                    connectNulls={true}
                  />
                </>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
