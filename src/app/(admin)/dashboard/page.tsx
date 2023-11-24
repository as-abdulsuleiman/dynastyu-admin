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

type IconProps = {
  className: string;
  color: string;
};

const usNumberformatter = (number: number, decimals = 0) =>
  Intl.NumberFormat("us", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(Number(number))
    .toString();

const formatters: { [key: string]: any } = {
  Sales: (number: number) => `$ ${usNumberformatter(number)}`,
  Profit: (number: number) => `$ ${usNumberformatter(number)}`,
  Customers: (number: number) => `${usNumberformatter(number)}`,
  Delta: (number: number) => `${usNumberformatter(number, 2)}%`,
};

const Kpis = {
  Sales: "Sales",
  Profit: "Profit",
  Customers: "Customers",
};

const kpiList = [Kpis.Sales, Kpis.Profit, Kpis.Customers];

export type DailyPerformance = {
  date: string;
  Sales: number;
  Profit: number;
  Customers: number;
};

export type SalesPerson = {
  name: string;
  leads: number;
  sales: string;
  quota: string;
  variance: string;
  region: string;
  status: string;
};

export const salesPeople: SalesPerson[] = [
  {
    name: "Peter Doe",
    leads: 45,
    sales: "1,000,000",
    quota: "1,200,000",
    variance: "low",
    region: "Region A",
    status: "overperforming",
  },
  {
    name: "Lena Whitehouse",
    leads: 35,
    sales: "900,000",
    quota: "1,000,000",
    variance: "low",
    region: "Region B",
    status: "average",
  },
  {
    name: "Phil Less",
    leads: 52,
    sales: "930,000",
    quota: "1,000,000",
    variance: "medium",
    region: "Region C",
    status: "underperforming",
  },
  {
    name: "John Camper",
    leads: 22,
    sales: "390,000",
    quota: "250,000",
    variance: "low",
    region: "Region A",
    status: "overperforming",
  },
  {
    name: "Max Balmoore",
    leads: 49,
    sales: "860,000",
    quota: "750,000",
    variance: "low",
    region: "Region B",
    status: "overperforming",
  },
];

const deltaTypes: { [key: string]: DeltaType } = {
  average: "unchanged",
  overperforming: "moderateIncrease",
  underperforming: "moderateDecrease",
};

export default function Home() {
  const {
    authStore: { user },
  } = useRootStore();
  const router = useRouter();
  const [value, setValue] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedKpi = kpiList[selectedIndex];
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const isSalesPersonSelected = (salesPerson: SalesPerson) =>
    (salesPerson.status === selectedStatus || selectedStatus === "all") &&
    (selectedNames.includes(salesPerson.name) || selectedNames.length === 0);

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

  const performance: DailyPerformance[] = [
    {
      date: "2023-05-01",
      Sales: 900.73,
      Profit: 173,
      Customers: 73,
    },
    {
      date: "2023-05-02",
      Sales: 1000.74,
      Profit: 174.6,
      Customers: 74,
    },
    {
      date: "2023-05-03",
      Sales: 1100.93,
      Profit: 293.1,
      Customers: 293,
    },
    {
      date: "2023-05-04",
      Sales: 1200.9,
      Profit: 290.2,
      Customers: 29,
    },
  ];

  const chartdata = useMemo(() => {
    return userData?.users?.map((a) => {
      return {
        date: format(new Date(a?.createdAt), "MMM dd"),
        "2022": "50",
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
                      <Text> Daily change per domain </Text>
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
