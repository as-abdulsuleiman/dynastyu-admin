/** @format */

"use client";

import { Icons } from "@/components/Icons";
import CountCard from "@/components/count-card";
import { useRootStore } from "@/mobx";
import {
  GetSchoolsQuery,
  SchoolWhereInput,
  useGetSchoolsQuery,
} from "@/services/graphql";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
interface indexProps {
  whereClause: SchoolWhereInput;
  title: string;
}

const SchoolsCount: FC<indexProps> = ({ whereClause, title }) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    schoolStore: { setSchools, schools: schoolCount },
  } = useRootStore();

  const {
    data: schools,
    loading,
    refetch,
  } = useGetSchoolsQuery({
    variables: {
      where: { ...whereClause },
    },
    onCompleted: (data: GetSchoolsQuery) => {
      setSchools(data.schools as any);
    },
  });

  useEffect(() => {
    refetch({
      where: {
        ...whereClause,
      },
    });
  }, [refetch, whereClause]);

  const activeSchool = `Active ${title?.toLowerCase()}s`;

  return (
    <CountCard
      activeLegend={`Active ${title?.toLowerCase()}s`}
      dataCount={schoolCount?.length || 0}
      title={`Total ${title}s`}
      loading={loading}
      categoryValues={[schoolCount.length || 0]}
      categories={[activeSchool]}
      onClick={() => router.push("/schools")}
      showIcon={pathname === "/schools"}
      icon={
        <Icons.school className="h-4 w-4 stroke-tremor-content-teal dark:stroke-dark-tremor-content-teal" />
      }
    />
    // <Card>
    //   {loading ? (
    //     <div className="flex items-center justify-center h-full w-full mx-auto my-auto">
    //       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    //       <span>Loading...</span>
    //     </div>
    //   ) : (
    //     <>
    //       <Flex alignItems="start">
    //         <div className="truncate">
    //           <Text>Total Schools</Text>
    //           <Metric className="truncate mt-1">
    //             {schools?.schools?.length}
    //           </Metric>
    //         </div>
    //         {/* <Icon
    //       icon={item.icon}
    //       variant="simple"
    //       tooltip="Shows sales performance per employee"
    //     /> */}
    //         <BadgeDelta
    //           className="cursor-pointer"
    //           onClick={() => router.push("/schools")}
    //           deltaType="moderateIncrease"
    //         >
    //           View
    //         </BadgeDelta>
    //       </Flex>
    //       <ProgressBar value={15.9} className="mt-2" />
    //     </>
    //   )}
    // </Card>
  );
};

export default observer(SchoolsCount);
