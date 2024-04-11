/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  QueryMode,
  SortOrder,
  UserWhereInput,
  useGetSchoolQuery,
  useGetUsersQuery,
  useUpdateSchoolMutation,
} from "@/services/graphql";
import { useRouter } from "next/navigation";
import { Title, Text, Grid } from "@tremor/react";
import { Icons } from "@/components/Icons";
import UsersAnalytics from "@/components/analytics/users";
import AthletesInterested from "@/components/athletes-interested";
import SchoolCard from "@/components/school-card";
import SchoolCoaches from "@/components/school-coaches";
import { observer } from "mobx-react-lite";
import { Separator } from "@/components/ui/separator";
import ComboboxCard from "@/components/combobox-card";
import { CheckIcon } from "lucide-react";
import { CommandItem } from "@/components/ui/command";
import UserAvatar from "@/components/user-avatar";
import { useDebouncedValue } from "@mantine/hooks";
import { cn } from "@/lib/utils";
import PromptAlert from "@/components/prompt-alert";
import { toast } from "@/hooks/use-toast";

interface pageProps {
  params: {
    id: number;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  const router = useRouter();
  const [openCoach, setOpenCoach] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>();
  const [selectedCoach, setSelectedCoach] = useState<any | number>({});
  const [debounced] = useDebouncedValue(searchValue, 300);
  const [addCoachPrompt, setAddCoachPrompt] = useState<boolean>(false);
  const {
    data,
    loading,
    refetch: refetchSchool,
  } = useGetSchoolQuery({
    variables: {
      where: {
        id: params?.id,
      },
    },
  });

  const isCollegeType = data?.school?.schoolType?.name === "College";
  // const coachUserId = data?.school?.coaches?.map((coach) => coach.userId);

  const whereClause: UserWhereInput = useMemo(() => {
    if (isCollegeType) {
      return {
        accountType: {
          is: {
            title: {
              equals: "Coach",
            },
          },
        },
      };
    } else {
      return {
        accountType: {
          is: {
            title: {
              equals: "Athlete",
            },
          },
        },
      };
    }
  }, [isCollegeType]);

  const {
    data: userData,
    loading: userLoading,
    refetch,
  } = useGetUsersQuery({
    variables: {
      where: {
        // id: {
        //   notIn: coachUserId || [],
        // },
        ...whereClause,
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const [updateSchool, { loading: SchoolUpdateLoading }] =
    useUpdateSchoolMutation();

  useEffect(() => {
    refetch({
      where: {
        // OR: [
        //   { username: { contains: debounced, mode: QueryMode.Insensitive } },
        //   { firstname: { contains: debounced, mode: QueryMode.Insensitive } },
        //   { surname: { contains: debounced, mode: QueryMode.Insensitive } },
        // ],
        ...whereClause,
      },
    });
  }, [debounced, refetch, userData, whereClause]);

  const schoolCoaches = new Set(
    data?.school?.coaches?.map((item) => item.user.id)
  );

  const filteredUsers = userData?.users?.filter(
    (item) => !schoolCoaches.has(item.id)
  );

  const usersDataOptions = useMemo(() => {
    return filteredUsers?.map((a) => {
      return {
        id: a?.id,
        label: `${a?.firstname} ${a?.surname}`,
        value: a?.username,
        avatar: a?.avatar,
      };
    });
  }, [filteredUsers]);

  const dataList: any = [
    {
      name: "Athletes Interested",
      value: data?.school?._count?.athletesInterested || 0,
      color: "teal",
      icon: () => (
        <Icons.users2 className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Athletes Prospected",
      value: data?.school?._count?.athletesProspected || 0,
      color: "teal",
      icon: () => (
        <Icons.usersRound className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Athletes Recruited",
      color: "teal",
      value: data?.school?._count?.athletesRecruited || 0,
      icon: () => (
        <Icons.athlete className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Coaches",
      color: "teal",
      value: data?.school?._count?.coaches || 0,
      icon: () => (
        <Icons.whistle className="mr-2.5 mb-[-6px] h-5 w-5 fill-teal-600" />
      ),
    },

    {
      name: "Evaluations",
      value: data?.school?._count?.evaluations || 0,
      icon: () => (
        <Icons.clipboardEdit className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Posts",
      value: data?.school?._count?.posts || 0,
      icon: () => (
        <Icons.fileImage className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    // {
    //   name: "Evaluations Created",
    //   color: "teal",
    //   value: data?.school?._count?.evaluationsCreated || 0,
    //   icon: () => (
    //     <Icons.clipboardEdit className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
    //   ),
    // },
    // {
    //   name: "Comments",
    //   color: "teal",
    //   value: data?.school?._count?.comments || 0,
    //   icon: () => (
    //     <Icons.messageCircleCode className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
    //   ),
    // },
  ];

  const selectedCoachUserId = selectedCoach?.id;

  const handleAddCoach = async () => {
    try {
      await updateSchool({
        variables: {
          data: {
            coaches: {
              connect: [{ userId: selectedCoachUserId }],
            },
          },
          where: { id: params?.id },
        },
      });

      refetchSchool();
      toast({
        title: "Coach successfully added.",
        variant: "successfull",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully add coach. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setAddCoachPrompt(false);
      setSelectedCoach({});
    }
  };

  const coachCustomItems = ({ item, id }: { item: any; id: number }) => {
    return (
      <CommandItem
        className="capitalize "
        key={item?.id || id}
        value={selectedCoach}
        onSelect={() => {
          setSelectedCoach({ value: item?.value, id: item?.id });
          setOpenCoach(false);
        }}
      >
        <>
          <div className="flex items-center">
            <UserAvatar
              className="h-[55px] w-[55px] shadow mr-4 "
              fallbackType="name"
              avatar={item?.avatar as string}
              fallback={`${item?.label?.charAt(0)} `}
            />

            <div>
              <div className="text-sm mb-0.5">{item?.label}</div>
              <div className="text-xs">{`@ ${item?.value}`}</div>
            </div>
          </div>
        </>
        <CheckIcon
          className={cn(
            "ml-auto h-4 w-4",
            selectedCoach?.value === item?.value ? "opacity-100" : "opacity-0"
          )}
        />
      </CommandItem>
    );
  };

  return (
    <main className="w-full h-full relative">
      <Button
        variant="destructive"
        className="mb-6"
        onClick={() => router.back()}
      >
        Go Back
      </Button>
      {loading ? (
        <>
          <Skeleton className="w-[100px] h-[20px]" />
          <Skeleton className="w-[100px] h-[20px] mt-4" />
        </>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <div className="ml-0">
              <div className="flex flex-row items-center">
                <Title>
                  {data?.school?.name} {/* {data?.s?.user?.surname} */}
                </Title>
                <Icons.school className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
              </div>
              <Text>
                {data?.school?.schoolType?.name} at {data?.school?.address}
              </Text>
            </div>
            <div className="ml-auto">
              <Button
                variant="ghost"
                onClick={() =>
                  router.push(`/schools/edit?school=${params?.id}`)
                }
              >
                Edit School
              </Button>
            </div>
          </div>
        </div>
      )}
      <Separator className="my-6" />

      <div className="mb-6 w-full  sm:w-1/2 ml-auto flex flex-col">
        <ComboboxCard
          valueKey="value"
          displayKey="label"
          IdKey="value"
          label="Add Coach"
          id="school-coach"
          placeholder={"Select Coach"}
          isOpen={openCoach}
          scrollAreaClass="h-72"
          hasSearch
          searchValue={searchValue}
          handleSearch={(search) => setSearchValue(search)}
          loading={userLoading}
          onClose={() => setOpenCoach(!openCoach)}
          items={usersDataOptions as any}
          selectedValue={selectedCoach}
          customRenderItems={coachCustomItems}
        />

        {Object.keys(selectedCoach).length === 0 ? null : (
          <div className="w-full flex mt-6 ">
            <Button
              size="sm"
              className="ml-auto"
              variant="default"
              onClick={() => {
                setAddCoachPrompt(true);
              }}
            >
              Add Coach
            </Button>
          </div>
        )}
      </div>
      <UsersAnalytics
        loading={loading}
        data={dataList}
        showStatus={false}
        // isActive={data?.school?.user?.isActive || false}
        title={`${data?.school?.name} 
       Analytics`}
      />
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <SchoolCoaches
          loading={loading}
          coaches={(data?.school?.coaches as any) || []}
        />
        <AthletesInterested
          loading={loading}
          athletesInterested={(data?.school?.athletesInterested as any) || []}
        />
      </Grid>
      <Grid numItemsMd={1} numItemsLg={1} className="mt-6 gap-6">
        <SchoolCard loading={loading} school={data?.school as any} />
      </Grid>
      <PromptAlert
        loading={SchoolUpdateLoading}
        content={`This action will add @${selectedCoach?.value} to ${data?.school?.name}.`}
        showPrompt={addCoachPrompt}
        handleHidePrompt={() => {
          setAddCoachPrompt(false);
          setSelectedCoach({});
        }}
        handleConfirmPrompt={() => {
          handleAddCoach();
        }}
      />
    </main>
  );
};

export default observer(Page);
