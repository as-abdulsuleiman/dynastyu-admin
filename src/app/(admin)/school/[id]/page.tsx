/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  QueryMode,
  SortOrder,
  useGetAthletesQuery,
  useGetAthletesWithSkillsQuery,
  useGetCoachesQuery,
  useGetSchoolQuery,
  useGetSkillTypesQuery,
  useUpdateSchoolMutation,
} from "@/services/graphql";
import { useRouter } from "next/navigation";
import { Title, Text, Grid } from "@tremor/react";
import AthletesInterested from "@/components/athletes-interested";
import SchoolCard from "@/components/school-card";
import { observer } from "mobx-react-lite";
import { Separator } from "@/components/ui/separator";
import ComboboxCard from "@/components/combobox-card";
import { CheckIcon } from "lucide-react";
import { CommandItem } from "@/components/ui/command";
import UserAvatar from "@/components/user-avatar";
import { useDebouncedValue } from "@mantine/hooks";
import { cn, formatDate } from "@/lib/utils";
import PromptAlert from "@/components/prompt-alert";
import { toast } from "@/hooks/use-toast";
import SchoolCoaches from "@/components/school-coaches";
import { PromptStatusEnum } from "@/lib/enums/updating-profile.enum";
import ContentHeader from "@/components/content-header";
import { getPermission } from "@/lib/helpers";
import { useRootStore } from "@/mobx";
import AccessControl from "@/components/accesscontrol";
import TabCard from "@/components/tab-card";
import UniversalTable, { HeaderItems } from "@/components/universal-table";
import { TableCell, TableRow } from "@/components/ui/table";
import Accesscontrol from "@/components/accesscontrol";
import MenubarCard from "@/components/menubar";
import { MoreHorizontalIcon } from "@/components/Icons";

interface PageProps {
  params: {
    id: number;
  };
}

const headerItems = [
  { name: "Title" },
  { name: "Number of users" },
  { name: "Account type" },
  { name: "Permissions" },
  { name: "Created At" },
  { name: "Updated At" },
];

const Page: FC<PageProps> = ({ params }) => {
  const {
    authStore: { user },
  } = useRootStore();
  const router = useRouter();
  const [indexTab, setTabIndex] = useState<number>(0);
  const [openCoach, setOpenCoach] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCoach, setSelectedCoach] = useState<any | number>({});
  const [debounced] = useDebouncedValue(searchValue, 300);
  const [promptStatus, setPromptStatus] = useState<PromptStatusEnum | null>();
  const [updateSchool, { loading: SchoolUpdateLoading }] =
    useUpdateSchoolMutation();

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

  const permissionName = getPermission(
    user?.role?.permissions,
    "schools.accesslevel.update"
  );

  const {
    data: schoolCoach,
    loading: loadingSchoolCoach,
    refetch: refetchSchoolCoach,
  } = useGetCoachesQuery({
    variables: {
      where: {
        schoolId: {
          equals: params?.id,
        },
      },
    },
  });

  const coachId = data?.school?.coaches?.map((coach) => coach?.userId);

  const {
    data: coachData,
    loading: userLoading,
    refetch: refetchCoaches,
  } = useGetCoachesQuery({
    variables: {
      where: {
        userId: {
          notIn: coachId,
        },
        OR: [
          {
            user: {
              is: {
                username: { contains: debounced, mode: QueryMode.Insensitive },
              },
            },
          },
          {
            user: {
              is: {
                firstname: { contains: debounced, mode: QueryMode.Insensitive },
              },
            },
          },
          {
            user: {
              is: {
                surname: { contains: debounced, mode: QueryMode.Insensitive },
              },
            },
          },
          {
            user: {
              is: {
                email: { contains: debounced, mode: QueryMode.Insensitive },
              },
            },
          },
        ],
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const { data: athletesData } = useGetAthletesWithSkillsQuery({
    variables: {
      where: {
        schoolId: {
          equals: params?.id,
        },
        verified: { equals: true },
      },
    },
  });

  const { data: skillTypesData } = useGetSkillTypesQuery({
    variables: {
      orderBy: {
        position: SortOrder.Asc,
      },
    },
  });

  const handleOnIndexChange = (index: number) => {
    setTabIndex(index);
  };

  const usersDataOptions = useMemo(() => {
    return coachData?.coachProfiles?.map((a) => {
      return {
        id: a?.user?.id,
        label: `${a?.user?.firstname} ${a?.user?.surname}`,
        value: a?.user?.username,
        avatar: a?.user?.avatar,
      };
    });
  }, [coachData?.coachProfiles]);

  const handleAddCoach = async (selectedCoach: any) => {
    try {
      const res = await updateSchool({
        variables: {
          where: { id: params?.id },
          data: {
            coaches: {
              connect: [{ userId: selectedCoach?.id }],
            },
          },
        },
      });
      if (res?.data?.updateOneSchool) {
        setPromptStatus(null);
        setSelectedCoach({});
        await refetchSchool();
        await refetchSchoolCoach({});
        await refetchCoaches({
          where: {
            userId: {
              notIn: coachId,
            },
          },
        });
        toast({
          title: "Coach successfully added.",
          description: `@${selectedCoach?.value} has been successfully added to ${data?.school?.name}`,
          variant: "successfull",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully add coach. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setPromptStatus(null);
      setSelectedCoach({});
      setSearchValue("");
    }
  };

  const handleRemoveCoach = async (item: any) => {
    setSelectedCoach(item);
    setPromptStatus(PromptStatusEnum.REMOVING);
  };

  const handleConfirmRemoveCoachPrompt = async (selectedCoach: any) => {
    try {
      const response = await updateSchool({
        variables: {
          where: {
            id: params?.id,
          },
          data: {
            coaches: {
              disconnect: [
                {
                  userId: selectedCoach?.user?.id,
                },
              ],
            },
          },
        },
      });
      if (response?.data?.updateOneSchool) {
        setPromptStatus(null);
        setSelectedCoach({});
        await refetchSchool();
        await refetchSchoolCoach({});
        await refetchCoaches({
          where: {
            userId: {
              notIn: coachId,
            },
          },
        });
        toast({
          title: "Coach successfully removed.",
          description: `@${selectedCoach?.user?.username} has been removed from ${data?.school?.name} .`,
          variant: "successfull",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully created a coach. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setPromptStatus(null);
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
              fallbackClassName="h-[55px] w-[55px]"
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

  let schoolLoaction;
  if (data?.school) {
    if (data?.school?.city) {
      schoolLoaction = data?.school?.city;
    }
    if (data?.school?.state) {
      schoolLoaction = `${schoolLoaction}, ${data?.school?.state}`;
    }
  }

  const subHeaderItems = [
    {
      title: "Address:",

      content: data?.school?.address || "N/A",
    },
    {
      title: "Location:",
      content: schoolLoaction || "N/A",
    },
    {
      title: "School Type:",

      content: data?.school?.schoolType?.name || "N/A",
    },
    {
      title: "Updated at:",

      content:
        `${
          data?.school?.updatedAt
            ? formatDate(new Date(data?.school?.updatedAt))
            : ""
        }` || "N/A",
    },
  ];

  const renderSchoolCoaches = () => {
    return (
      <div className="mt-11 mb-24 gap-6">
        <AccessControl name={permissionName}>
          <div className="mb-11 w-full sm:w-1/2 ml-auto flex flex-col">
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
              shouldFilter={false}
              searchValue={searchValue}
              handleSearch={(search) => setSearchValue(search)}
              loading={userLoading}
              onClose={() => setOpenCoach(!openCoach)}
              items={usersDataOptions as any}
              selectedValue={selectedCoach}
              customRenderItems={coachCustomItems}
            />
            {Object?.keys(selectedCoach)?.length === 0 ? null : (
              <div className="w-full flex mt-6 ">
                <Button
                  size="sm"
                  className="ml-auto"
                  variant="default"
                  onClick={() => setPromptStatus(PromptStatusEnum.ADDING)}
                >
                  Add Coach
                </Button>
              </div>
            )}
          </div>
        </AccessControl>
        <SchoolCoaches
          handleClick={handleRemoveCoach}
          loading={loadingSchoolCoach}
          coaches={(schoolCoach?.coachProfiles as any) || []}
        />
      </div>
    );
  };

  const renderSchoolInterestedAthletes = () => {
    return (
      <div className="mt-11 mb-24 gap-6">
        <AthletesInterested
          loading={loading}
          athletesInterested={(data?.school?.athletesInterested as any) || []}
        />
      </div>
    );
  };

  const tableHead = useMemo(() => {
    if (skillTypesData?.skillTypes?.length) {
      return [
        { name: "PT" },
        { name: "Athlete" },
        { name: "Class" },
        ...skillTypesData?.skillTypes.map((a) => ({ name: a?.name })),
        ,
      ];
    } else {
      return [{ name: "PT" }, { name: "Athlete" }, { name: "Class" }];
    }
  }, [skillTypesData]);

  const tableData = useMemo(() => {
    if (athletesData?.athleteProfiles?.length) {
      return athletesData?.athleteProfiles?.map((a, key) => {
        const skills =
          skillTypesData?.skillTypes?.length &&
          skillTypesData?.skillTypes?.map((c) => {
            return a?.skills?.find((d) => d?.skillType?.id === c?.id)?.value
              ? `${a?.skills?.find((d) => d?.skillType?.id === c?.id)?.value} ${
                  c?.unit
                }`
              : 0;
          });

        // console.log("skills", skills);
        return [
          a?.position?.shortName,
          `${a?.user?.firstname} ${a?.user?.surname}`,
          a?.graduationYear,
        ];
      });
    } else {
      return [];
    }
  }, [athletesData, skillTypesData]);

  const checker = athletesData?.athleteProfiles.map((a, key) => {
    const skills: any = skillTypesData?.skillTypes.map((c) => {
      return a.skills.find((d) => d.skillType.id === c.id)?.value
        ? `${a.skills.find((d) => d.skillType.id === c.id)?.value} ${c.unit}`
        : 0;
    });
    return [
      a?.position?.shortName,
      `${a.user.firstname} ${a.user.surname}`,
      a.graduationYear,
      ...skills,
    ];
  });

  console.log("skillTypesData?.skillTypes?.map", skillTypesData?.skillTypes);
  console.log("athletesData", checker);

  // console.log("tableData", tableData);

  // console.log("tableHead", tableHead);

  const renderSchoolTeamPlayers = () => {
    const renderItems = ({ item, id }: { item: any; id: any }) => {
      console.log("item", item);

      return (
        <TableRow key={id} className="text-base">
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item}
            </div>
          </TableCell>
          {/* <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center">
              {item?._count?.users}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center">
              {item?._count?.accountTypes}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center">
              {item?._count?.permissions}
            </div>
          </TableCell>
          <TableCell className="text-center cursor-pointer text-sm">
            <div className="text-right w-100 flex flex-row items-center justify-center">
              {item?.updatedAt
                ? formatDate(new Date(item?.createdAt), "MMMM dd yyyy")
                : ""}
            </div>
          </TableCell>
          <TableCell className="text-center cursor-pointer text-sm">
            <div className="text-right w-100 flex flex-row items-center justify-center">
              {item?.updatedAt
                ? formatDate(new Date(item?.updatedAt), "MMMM dd yyyy")
                : ""}
            </div>
          </TableCell> */}
          {/* <Accesscontrol name={permissionName}>
            <TableCell className="text-center cursor-pointer text-sm">
              <div className="text-right w-100 flex flex-row items-center justify-center">
                <MenubarCard
                  trigger={
                    <Button size="icon" variant="outline">
                      <MoreHorizontalIcon className="cursor-pointer" />
                    </Button>
                  }
                  items={atheleItems}
                />
              </div>
            </TableCell>
          </Accesscontrol> */}
        </TableRow>
      );
    };
    return (
      <div className="mt-11 mb-24 gap-6">
        <UniversalTable
          title="Role List"
          headerItems={tableHead as HeaderItems[]}
          items={tableData as any[]}
          loading={loading}
          renderItems={renderItems}
        />
      </div>
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
                <ContentHeader
                  title={`${data?.school?.name || ""} `}
                  subItems={subHeaderItems}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <TabCard
        tabIndex={indexTab}
        onIndexChange={handleOnIndexChange}
        className="font-TTHovesDemiBold "
        tabClassName="my-11"
        tabs={[
          { name: "Coaches" },
          { name: "Athletes Interested" },
          { name: "Team Players" },
        ]}
        tabContent={[
          { content: renderSchoolCoaches() },
          { content: renderSchoolInterestedAthletes() },
          { content: renderSchoolTeamPlayers() },
        ]}
      />
      <Separator className="my-6 mb-16" />{" "}
      {/* <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <SchoolCoaches
          handleClick={handleRemoveCoach}
          loading={loadingSchoolCoach}
          coaches={(schoolCoach?.coachProfiles as any) || []}
        />
        <AthletesInterested
          loading={loading}
          athletesInterested={(data?.school?.athletesInterested as any) || []}
        />
      </Grid> */}
      <Grid numItemsMd={1} numItemsLg={1} className="mt-6 gap-6">
        <SchoolCard loading={loading} school={data?.school as any} />
      </Grid>
      <PromptAlert
        loading={SchoolUpdateLoading}
        content={`This action will add @${selectedCoach?.value} to ${data?.school?.name}.`}
        showPrompt={promptStatus === PromptStatusEnum.ADDING}
        handleHidePrompt={() => {
          setPromptStatus(null);
          setSelectedCoach({});
        }}
        handleConfirmPrompt={() => handleAddCoach(selectedCoach)}
      />
      <PromptAlert
        loading={SchoolUpdateLoading}
        content={`This action will remove @${selectedCoach?.user?.username} from ${data?.school?.name}.`}
        showPrompt={promptStatus === PromptStatusEnum.REMOVING}
        handleHidePrompt={() => {
          setPromptStatus(null);
          setSelectedCoach({});
        }}
        handleConfirmPrompt={() =>
          handleConfirmRemoveCoachPrompt(selectedCoach)
        }
      />
    </main>
  );
};

export default observer(Page);
