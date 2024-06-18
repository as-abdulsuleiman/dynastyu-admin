/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GetAthletesQuery,
  GetAthletesWithSkillsQuery,
  QueryMode,
  SortOrder,
  useGetAthletesQuery,
  useGetAthletesWithSkillsQuery,
  useGetCoachesQuery,
  useGetPositionsQuery,
  useGetSchoolQuery,
  useGetSkillTypesQuery,
  useUpdateAthleteMutation,
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
import { cn, formatDate, getYears } from "@/lib/utils";
import PromptAlert from "@/components/prompt-alert";
import { toast } from "@/hooks/use-toast";
import SchoolCoaches from "@/components/school-coaches";
import {
  PromptStatusEnum,
  StatusEnum,
} from "@/lib/enums/updating-profile.enum";
import ContentHeader from "@/components/content-header";
import { getPermission } from "@/lib/helpers";
import { useRootStore } from "@/mobx";
import AccessControl from "@/components/accesscontrol";
import TabCard from "@/components/tab-card";
import UniversalTable, { HeaderItems } from "@/components/universal-table";
import { TableCell, TableRow } from "@/components/ui/table";
import Accesscontrol from "@/components/accesscontrol";
import MenubarCard from "@/components/menubar";
import {
  BadgeAlertIcon,
  BadgeCheckIcon,
  MoreHorizontalIcon,
} from "@/components/Icons";
import Pagination from "@/components/pagination";
import athlete from "@/components/Icons/athlete";
import { SearchInput } from "@/components/search-input";
import MultiSelector from "@/components/multi-selector";
import BadgeCard from "@/components/badge-card";
import CompareAthleteCard from "@/components/compare-athlete-card";

interface PageProps {
  params: {
    id: number;
  };
}

const groupIds = {
  defense: [5, 7, 8, 9, 12, 14],
  special: [4],
  offense: [13, 15, 16, 17, 18, 1, 2, 3, 5, 11],
};

const athleteHeaderItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Email" },
  { name: "Position" },
  { name: "Created At" },
  { name: "Updated At" },
  { name: "Actions" },
];

const LockerHeaderItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Email" },
  { name: "Position" },
  { name: "Created At" },
  { name: "Updated At" },
  { name: "Status" },
  { name: "Actions" },
];

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
  const [selectedPosition, setSelectedPosition] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<any[]>([]);
  const [value, setValue] = useState<string>("");
  const [seachVerifyAthlete, setSeachVerifyAthlete] = useState<string>("");
  const [athleteDebounced] = useDebouncedValue(value, 300);
  const [searchLockerAthlete, setSeachLockerAthlete] = useState<string>("");
  const [lockerAthleteDebounced] = useDebouncedValue(searchLockerAthlete, 300);
  const [verifyAthleteDebounced] = useDebouncedValue(seachVerifyAthlete, 300);
  const [indexTab, setTabIndex] = useState<number>(0);
  const [openCoach, setOpenCoach] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCoach, setSelectedCoach] = useState<any | number>({});
  const [debounced] = useDebouncedValue(searchValue, 300);
  const [promptStatus, setPromptStatus] = useState<PromptStatusEnum | null>();
  const [selectedAthlete, setSelectedAthlete] = useState<any | number>({});
  const [isVerifyingAthlete, setIsVerifyingAthlete] = useState<boolean>(false);
  const [isRemovingLockerAthlete, setIsRemovingLockerAthlete] =
    useState<boolean>(false);
  const [updatingProfile, setUpdatingProfile] = useState<StatusEnum | null>();
  const [updateAthlete] = useUpdateAthleteMutation();

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

  console.log("selectedAthlete", selectedAthlete);

  const isHighSchool =
    data?.school?.schoolType?.name === "High School" ?? false;

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

  const groupFilter = useMemo(() => {
    if (selectedGroup.length) {
      return selectedGroup?.map((a) => a?.ids?.flat())?.flat();
    }
    if (selectedPosition.length) {
      return selectedPosition?.map((a) => a?.id);
    }
  }, [selectedPosition, selectedGroup]);

  const {
    data: athletesData,
    refetch: refetchAthletes,
    fetchMore: fetchMoreAthletes,
    loading: LoadingAthletes,
  } = useGetAthletesWithSkillsQuery({
    variables: {
      where: {
        schoolId: {
          equals: params?.id,
        },
        graduationYear: {
          in:
            selectedYear?.length > 0
              ? selectedYear.map((y) => y.value)
              : undefined,
        },
        position: {
          is: {
            id: {
              in: groupFilter || undefined,
            },
          },
        },
        verified: { equals: true },
        OR: [
          {
            user: {
              is: {
                firstname: {
                  contains: athleteDebounced,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            user: {
              is: {
                surname: {
                  contains: athleteDebounced,
                  mode: QueryMode.Insensitive,
                },
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
    skip: !isHighSchool,
  });

  const {
    data: verifyAthleteData,
    loading: LoadingVerifyAthleteData,
    refetch: refetchVerifyAthlete,
    fetchMore: fetchMoreVerifyAthlete,
  } = useGetAthletesQuery({
    variables: {
      take: 10,
      where: {
        verified: { equals: false },
        schoolId: { equals: params?.id },
        OR: [
          {
            user: {
              is: {
                username: {
                  contains: verifyAthleteDebounced,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            user: {
              is: {
                firstname: {
                  contains: verifyAthleteDebounced,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            user: {
              is: {
                surname: {
                  contains: verifyAthleteDebounced,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
    skip: !isHighSchool,
  });

  const {
    data: lockerAthleteData,
    loading: LoadingLockerAthleteData,
    refetch: refetchLockerAthlete,
    fetchMore: fetchMoreLockerAthlete,
  } = useGetAthletesQuery({
    variables: {
      take: 10,
      where: {
        verified: { equals: true },
        schoolId: { equals: params?.id },
        OR: [
          {
            user: {
              is: {
                username: {
                  contains: lockerAthleteDebounced,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            user: {
              is: {
                firstname: {
                  contains: lockerAthleteDebounced,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            user: {
              is: {
                surname: {
                  contains: lockerAthleteDebounced,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
    skip: !isHighSchool,
  });

  const { data: positionsData, loading: loadingPosition } =
    useGetPositionsQuery({
      variables: {
        orderBy: { name: SortOrder.Asc },
      },
      skip: !isHighSchool,
    });

  const positions = useMemo(
    () =>
      positionsData?.positions?.map((position) => ({
        label: position?.name,
        value: position?.id,
        id: position?.id,
      })) || [],
    [positionsData?.positions]
  );

  const years = useMemo(
    () =>
      getYears(5, "add")
        .map((year) => ({
          label: year.toString(),
          value: year.toString(),
          id: year.toString(),
        }))
        .reverse() || [],
    []
  );

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
      const tableHeader = [
        { name: "PT" },
        { name: "Athlete" },
        { name: "Class" },
        ...skillTypesData?.skillTypes.map((a) => ({ name: a?.name })),
      ];
      if (permissionName && isHighSchool) {
        tableHeader?.push({
          name: "Actions",
        });
      }
      return tableHeader;
    } else {
      return [{ name: "PT" }, { name: "Athlete" }, { name: "Class" }];
    }
  }, [isHighSchool, permissionName, skillTypesData?.skillTypes]);

  const tableData = useMemo(() => {
    if (athletesData?.athleteProfiles?.length) {
      return athletesData?.athleteProfiles?.map((a, key) => {
        const skills: any = skillTypesData?.skillTypes?.map((c) => {
          return a?.skills?.find((d) => d?.skillType?.id === c?.id)?.value
            ? {
                [c?.name]: `${
                  a?.skills?.find((d) => d?.skillType?.id === c?.id)?.value
                } ${c?.unit}`,
              }
            : { [c?.name]: 0 };
        });
        return {
          athleteId: a?.user?.id,
          position: a?.position?.shortName,
          name: `${a?.user?.firstname} ${a?.user?.surname}`,
          graduationYear: a?.graduationYear || "N/A",
          ...skills?.map((a: any) => a),
        };
      });
    } else {
      return [];
    }
  }, [athletesData?.athleteProfiles, skillTypesData]);

  let filterAthlete = tableData?.map((obj: any) => {
    return Object?.keys(obj)?.reduce((acc: any, key: any) => {
      if (!isNaN(parseInt(key))) {
        let nestedObj: any = obj[key];
        let nestedKey: any = Object?.keys(nestedObj)[0];
        acc[nestedKey] = nestedObj[nestedKey];
      } else {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  });

  const lastAthleteId = useMemo(() => {
    const lastPostInResults =
      athletesData?.athleteProfiles[athletesData?.athleteProfiles?.length - 1];
    return lastPostInResults?.id;
  }, [athletesData?.athleteProfiles]);

  const renderSchoolTeamPlayers = () => {
    const fetchNext = () => {
      fetchMoreAthletes({
        variables: {
          take: 10,
          skip: 1,
          cursor: {
            id: lastAthleteId,
          },
          orderBy: {
            createdAt: SortOrder.Desc,
          },
        },
        updateQuery: (
          previousResult: GetAthletesWithSkillsQuery,
          { fetchMoreResult }
        ): GetAthletesWithSkillsQuery => {
          if (
            !fetchMoreResult ||
            fetchMoreResult?.athleteProfiles?.length === 0
          ) {
            return previousResult;
          } else {
            const previousPosts = previousResult?.athleteProfiles;
            const fetchMorePosts = fetchMoreResult?.athleteProfiles;
            fetchMoreResult.athleteProfiles = [...fetchMorePosts];
            return { ...fetchMoreResult };
          }
        },
      });
    };
    const handleSelectOption = (selectedList: any, selectedItem: any) => {
      setSelectedPosition((prev: any) => [...prev, selectedItem]);
    };

    const handleRemoveOption = (selectedList: any, removedItem: any) => {
      setSelectedPosition((prev: any) => [
        ...prev?.filter((a: any) => a?.id !== removedItem?.id),
      ]);
    };

    const handleSelectYear = (selectedList: any, selectedItem: any) => {
      setSelectedYear((prev: any) => [...prev, selectedItem]);
    };

    const handleRemoveYear = (selectedList: any, removedItem: any) => {
      setSelectedYear((prev: any) => [
        ...prev?.filter((a: any) => a?.id !== removedItem?.id),
      ]);
    };
    const handleSelectGroup = (selectedList: any, selectedItem: any) => {
      setSelectedGroup((prev: any) => [...prev, selectedItem]);
    };

    const handleRemoveGroup = (selectedList: any, removedItem: any) => {
      setSelectedGroup((prev: any) => [
        ...prev?.filter((a: any) => a?.id !== removedItem?.id),
      ]);
    };

    const fetchPrevious = () => {
      fetchMoreAthletes({
        variables: {
          take: -10,
          skip: athletesData?.athleteProfiles.length,
          cursor: {
            id: lastAthleteId,
          },
          orderBy: {
            createdAt: SortOrder.Desc,
          },
        },
        updateQuery: (
          previousResult: GetAthletesWithSkillsQuery,
          { fetchMoreResult }
        ): GetAthletesWithSkillsQuery => {
          if (
            !fetchMoreResult ||
            fetchMoreResult?.athleteProfiles?.length === 0
          ) {
            return previousResult;
          } else {
            const previousPosts = previousResult?.athleteProfiles;
            const fetchMorePosts = fetchMoreResult?.athleteProfiles;
            fetchMoreResult.athleteProfiles = [...fetchMorePosts];
            return { ...fetchMoreResult };
          }
        },
      });
    };

    const renderItems = ({ item, id }: { item: any; id: any }) => {
      const atheleItems = [
        {
          name: "View Details",
          onClick: () => {
            router.push(`/athlete/${item?.athleteId}`, {
              scroll: true,
            });
          },
        },
      ];
      return (
        <TableRow key={id} className="text-base">
          <TableCell className="text-center">
            <div className="flex flex-row items-center justify-start">
              <div className="flex items-start justify-center relative my-auto mx-auto rounded-full  h-[49px] w-[49px] shadow cursor-pointer p-4 text-sm capitalize bg-slate-500 text-white">
                <div className="absolute w-full text-sm h-full font-TTHovesBold">
                  {item?.position}
                </div>
              </div>
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item?.name}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item?.graduationYear}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item?.Height || 0}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item?.Weight || 0}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item["40-Yard Dash"] || 0}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item["Shuttle time"] || 0}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item["Vertical Leap"] || 0}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item["Bench Press Max"] || 0}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item["185 Bench Press Reps Max"] || 0}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item["Squat"] || 0}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item["Hand Span"] || 0}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item["Hand Length"] || 0}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item["Wing Span"] || 0}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center text-base">
              {item["Broad Jump"] || 0}
            </div>
          </TableCell>
          <Accesscontrol name={permissionName}>
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
          </Accesscontrol>
        </TableRow>
      );
    };

    return (
      <div className="mt-11 mb-24 gap-6">
        <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
          <div>
            <div className="mb-2 text-sm font-TTHovesRegular">
              Filter Position
            </div>
            <MultiSelector
              options={positions}
              disable={loadingPosition}
              loading={loadingPosition}
              displayValue="label"
              placeholder="Select Postion"
              showCheckbox={true}
              hidePlaceholder={true}
              avoidHighlightFirstOption={true}
              selectedOptions={selectedPosition as any[]}
              handleRemove={handleRemoveOption}
              handleSelect={handleSelectOption}
            />
          </div>
          <div>
            <div className="mb-2 text-sm font-TTHovesRegular">Filter Year</div>
            <MultiSelector
              options={years}
              disable={false}
              loading={false}
              displayValue="label"
              placeholder="Select Year"
              showCheckbox={true}
              hidePlaceholder={true}
              avoidHighlightFirstOption={true}
              selectedOptions={selectedYear as any[]}
              handleRemove={handleRemoveYear}
              handleSelect={handleSelectYear}
            />
          </div>
          <div>
            <div className="mb-2 text-sm font-TTHovesRegular">Filter Group</div>
            <MultiSelector
              options={[
                {
                  label: "Offense",
                  value: "offense",
                  id: "offense",
                  ids: [13, 15, 16, 17, 18, 1, 2, 3, 5, 11],
                },
                {
                  label: "Defense",
                  value: "defense",
                  id: "defense",
                  ids: [5, 7, 8, 9, 12, 14],
                },
                {
                  label: "Special Teams",
                  value: "special",
                  id: "special",
                  ids: [4],
                },
              ]}
              disable={false}
              loading={false}
              displayValue="label"
              placeholder="Select Group"
              showCheckbox={true}
              hidePlaceholder={true}
              avoidHighlightFirstOption={true}
              selectedOptions={selectedGroup as any[]}
              handleRemove={handleRemoveGroup}
              handleSelect={handleSelectGroup}
            />
          </div>
        </Grid>
        <div className="flex mt-6 gap-6 w-full justify-end">
          <div className="w-full md:w-1/2 order-2">
            <SearchInput
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type to search..."
            />
          </div>
        </div>
        <UniversalTable
          title="Team Players"
          headerItems={tableHead as HeaderItems[]}
          items={filterAthlete as any[]}
          loading={LoadingAthletes}
          renderItems={renderItems}
        />
        {loading || !athletesData?.athleteProfiles?.length ? null : (
          <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
        )}
      </div>
    );
  };

  const lastLockerAthleteId = useMemo(() => {
    const lastPostInResults =
      lockerAthleteData?.athleteProfiles[
        lockerAthleteData?.athleteProfiles?.length - 1
      ];
    return lastPostInResults?.id;
  }, [lockerAthleteData?.athleteProfiles]);

  const handleRemoveLockerAthlete = (item: any) => {
    setUpdatingProfile(StatusEnum.DELETING);
    setSelectedAthlete(item);
  };

  const handleRemoveLockerAthleteConfirmPrompt = async (item: any) => {
    setIsRemovingLockerAthlete(true);
    try {
      await updateAthlete({
        variables: {
          where: { id: item?.id },
          data: {
            verified: { set: false },
            verifiedBy: { disconnect: true },
          },
        },
      });
      await refetchLockerAthlete();
      await refetchVerifyAthlete();
      toast({
        title: "Profile successfully removed.",
        description: `@${item?.user?.username} profile has been removed`,
        variant: "successfull",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully remove profile. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setUpdatingProfile(null);
      setSelectedAthlete(null);
      setIsRemovingLockerAthlete(false);
    }
  };

  const renderLockerRoom = () => {
    const fetchPrevious = () => {
      fetchMoreLockerAthlete({
        variables: {
          take: -10,
          skip: lockerAthleteData?.athleteProfiles?.length,
          cursor: {
            id: lastLockerAthleteId,
          },
          orderBy: {
            createdAt: SortOrder.Desc,
          },
        },
        updateQuery: (
          previousResult: GetAthletesQuery,
          { fetchMoreResult }
        ): GetAthletesQuery => {
          if (
            !fetchMoreResult ||
            fetchMoreResult?.athleteProfiles?.length === 0
          ) {
            return previousResult;
          } else {
            const previousPosts = previousResult?.athleteProfiles;
            const fetchMorePosts = fetchMoreResult?.athleteProfiles;
            fetchMoreResult.athleteProfiles = [...fetchMorePosts];
            return { ...fetchMoreResult };
          }
        },
      });
    };

    const fetchNext = () => {
      fetchMoreLockerAthlete({
        variables: {
          take: 10,
          skip: 1,
          cursor: {
            id: lastLockerAthleteId,
          },
          orderBy: {
            createdAt: SortOrder.Desc,
          },
        },
        updateQuery: (
          previousResult: GetAthletesQuery,
          { fetchMoreResult }
        ): GetAthletesQuery => {
          if (
            !fetchMoreResult ||
            fetchMoreResult?.athleteProfiles?.length === 0
          ) {
            return previousResult;
          } else {
            const previousPosts = previousResult?.athleteProfiles;
            const fetchMorePosts = fetchMoreResult?.athleteProfiles;
            fetchMoreResult.athleteProfiles = [...fetchMorePosts];
            return { ...fetchMoreResult };
          }
        },
      });
    };

    const renderItems = ({ item, id }: { item: any; id: any }) => {
      const lockerAtheleItems = [
        {
          name: "View Details",
          onClick: () => {
            router.push(`/athlete/${item?.userId}`, {
              scroll: true,
            });
          },
        },
      ];
      if (permissionName !== ("" || null || undefined)) {
        lockerAtheleItems.push({
          name: "Remove Profile",
          onClick: () => handleRemoveLockerAthlete(item),
        });
      }

      return (
        <TableRow key={id} className="text-base">
          <TableCell>
            <div
              className="flex flex-row items-center justify-start"
              onClick={() =>
                router.push(`/athlete/${item?.user?.id}`, {
                  scroll: true,
                })
              }
            >
              <UserAvatar
                className="h-[79px] w-[79px] shadow cursor-pointer"
                fallbackType="name"
                avatar={item?.user?.avatar as string}
                fallback={`${item?.user?.username?.charAt(
                  0
                )} ${item?.user?.firstname?.charAt(0)}`}
              />
              <div className="ml-4 cursor-pointer text-base">
                {item?.user?.firstname} {item?.user?.surname}
              </div>
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div>
              {item?.user?.username
                ? `@${item?.user?.username?.toLowerCase()}`
                : ""}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div>{item?.user?.email?.toLowerCase()}</div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center">
              <div className="mr-2">{item?.position?.name}</div>{" "}
              <div>({item?.position?.shortName})</div>
            </div>
          </TableCell>
          <TableCell className="text-center cursor-pointer text-sm">
            <div className="text-right w-100 flex flex-row items-center justify-center">
              {item?.createdAt
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
          </TableCell>
          <TableCell className="text-sm">
            <div className="text-right w-100 flex flex-row items-center justify-center">
              <BadgeCard
                size="xs"
                className="px-[8px]"
                color={"sky"}
                icon={() => {
                  return (
                    <BadgeCheckIcon className="h-4 w-4 mr-1" color="sky" />
                  );
                }}
                datatype="moderateDecrease"
              >
                Verified
              </BadgeCard>
            </div>
          </TableCell>
          <Accesscontrol name={permissionName}>
            <TableCell className="text-center cursor-pointer text-sm">
              <div className="text-right w-100 flex flex-row items-center justify-center">
                <MenubarCard
                  trigger={
                    <Button size="icon" variant="outline">
                      <MoreHorizontalIcon className="cursor-pointer" />
                    </Button>
                  }
                  items={lockerAtheleItems}
                />
              </div>
            </TableCell>
          </Accesscontrol>
        </TableRow>
      );
    };

    return (
      <div className="mt-11 mb-24 gap-6">
        <div className="flex mt-6 gap-6 w-full justify-end">
          <div className="w-full md:w-1/2 order-2">
            <SearchInput
              onChange={(e) => setSeachLockerAthlete(e.target.value)}
              placeholder="Type to search..."
            />
          </div>
        </div>
        <UniversalTable
          title="Locker Room Athletes"
          headerItems={LockerHeaderItems as HeaderItems[]}
          items={lockerAthleteData?.athleteProfiles as any[]}
          loading={LoadingLockerAthleteData}
          renderItems={renderItems}
        />
        {LoadingLockerAthleteData ||
        !lockerAthleteData?.athleteProfiles?.length ? null : (
          <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
        )}
      </div>
    );
  };

  const renderSchoolComparePlayers = () => {
    return <CompareAthleteCard params={params} />;
  };

  const handleVerifyAthlete = (item: any) => {
    setUpdatingProfile(StatusEnum.VERIFYING);
    setSelectedAthlete(item);
  };

  const handleVerifyAthleteConfirmPrompt = async (item: any) => {
    setIsVerifyingAthlete(true);
    setUpdatingProfile(StatusEnum.VERIFYING);
    try {
      await updateAthlete({
        variables: {
          where: { id: item?.id },
          data: {
            verified: { set: true },
            verifiedBy: { connect: { id: user?.coachProfile?.id } },
          },
        },
      });
      await refetchVerifyAthlete();
      await refetchLockerAthlete();
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.user?.username} profile has been verified`,
        variant: "successfull",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully verify profile. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setUpdatingProfile(null);
      setSelectedAthlete(null);
      setIsVerifyingAthlete(false);
    }
  };

  const lastVerifyAthleteId = useMemo(() => {
    const lastPostInResults =
      verifyAthleteData?.athleteProfiles[
        verifyAthleteData?.athleteProfiles?.length - 1
      ];
    return lastPostInResults?.id;
  }, [verifyAthleteData?.athleteProfiles]);

  const renderVerifyAthletes = () => {
    const fetchPrevious = () => {
      fetchMoreVerifyAthlete({
        variables: {
          take: -10,
          skip: verifyAthleteData?.athleteProfiles?.length,
          cursor: {
            id: lastVerifyAthleteId,
          },
          orderBy: {
            createdAt: SortOrder.Desc,
          },
        },
        updateQuery: (
          previousResult: GetAthletesQuery,
          { fetchMoreResult }
        ): GetAthletesQuery => {
          if (
            !fetchMoreResult ||
            fetchMoreResult?.athleteProfiles?.length === 0
          ) {
            return previousResult;
          } else {
            const previousPosts = previousResult?.athleteProfiles;
            const fetchMorePosts = fetchMoreResult?.athleteProfiles;
            fetchMoreResult.athleteProfiles = [...fetchMorePosts];
            return { ...fetchMoreResult };
          }
        },
      });
    };

    const fetchNext = () => {
      fetchMoreVerifyAthlete({
        variables: {
          take: 10,
          skip: 1,
          cursor: {
            id: lastVerifyAthleteId,
          },
          orderBy: {
            createdAt: SortOrder.Desc,
          },
        },
        updateQuery: (
          previousResult: GetAthletesQuery,
          { fetchMoreResult }
        ): GetAthletesQuery => {
          if (
            !fetchMoreResult ||
            fetchMoreResult?.athleteProfiles?.length === 0
          ) {
            return previousResult;
          } else {
            const previousPosts = previousResult?.athleteProfiles;
            const fetchMorePosts = fetchMoreResult?.athleteProfiles;
            fetchMoreResult.athleteProfiles = [...fetchMorePosts];
            return { ...fetchMoreResult };
          }
        },
      });
    };

    const renderItems = ({ item, id }: { item: any; id: any }) => {
      const verifyAtheleItems = [
        {
          name: "View Details",
          onClick: () => {
            router.push(`/athlete/${item?.userId}`, {
              scroll: true,
            });
          },
        },
      ];
      if (permissionName !== ("" || null || undefined)) {
        verifyAtheleItems.push({
          name: "Verify Profile",
          onClick: () => handleVerifyAthlete(item),
        });
      }

      return (
        <TableRow key={id} className="text-base">
          <TableCell>
            <div
              className="flex flex-row items-center justify-start"
              onClick={() =>
                router.push(`/athlete/${item?.user?.id}`, {
                  scroll: true,
                })
              }
            >
              <UserAvatar
                className="h-[79px] w-[79px] shadow cursor-pointer"
                fallbackType="name"
                avatar={item?.user?.avatar as string}
                fallback={`${item?.user?.username?.charAt(
                  0
                )} ${item?.user?.firstname?.charAt(0)}`}
              />
              <div className="ml-4 cursor-pointer text-base">
                {item?.user?.firstname} {item?.user?.surname}
              </div>
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div>
              {item?.user?.username
                ? `@${item?.user?.username?.toLowerCase()}`
                : ""}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div>{item?.user?.email?.toLowerCase()}</div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center">
              <div className="mr-2">{item?.position?.name}</div>{" "}
              <div>({item?.position?.shortName})</div>
            </div>
          </TableCell>
          <TableCell className="text-center cursor-pointer text-sm">
            <div className="text-right w-100 flex flex-row items-center justify-center">
              {item?.createdAt
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
          </TableCell>

          <Accesscontrol name={permissionName}>
            <TableCell className="text-center cursor-pointer text-sm">
              <div className="text-right w-100 flex flex-row items-center justify-center">
                <MenubarCard
                  trigger={
                    <Button size="icon" variant="outline">
                      <MoreHorizontalIcon className="cursor-pointer" />
                    </Button>
                  }
                  items={verifyAtheleItems}
                />
              </div>
            </TableCell>
          </Accesscontrol>
        </TableRow>
      );
    };

    return (
      <div className="mt-11 mb-24 gap-6">
        <div className="flex mt-6 gap-6 w-full justify-end">
          <div className="w-full md:w-1/2 order-2">
            <SearchInput
              onChange={(e) => setSeachVerifyAthlete(e.target.value)}
              placeholder="Type to search..."
            />
          </div>
        </div>
        <UniversalTable
          title="Verify Athletes"
          headerItems={athleteHeaderItems as HeaderItems[]}
          items={verifyAthleteData?.athleteProfiles as any[]}
          loading={LoadingVerifyAthleteData}
          renderItems={renderItems}
        />
        {LoadingVerifyAthleteData ||
        !verifyAthleteData?.athleteProfiles?.length ? null : (
          <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
        )}
      </div>
    );
  };

  const tabsHeader = [{ name: "Coaches" }];
  const tabsContent = [{ content: renderSchoolCoaches() }];

  if (!loading) {
    if (isHighSchool) {
      tabsHeader?.push(
        { name: "Team Players" },
        { name: "Verify Athletes" },
        { name: "Locker Room" },
        { name: "Compare Players" }
      );
      tabsContent?.push(
        {
          content: renderSchoolTeamPlayers(),
        },
        { content: renderVerifyAthletes() },
        { content: renderLockerRoom() },
        { content: renderSchoolComparePlayers() }
      );
    } else {
      tabsHeader?.push({ name: "Athletes Interested" });
      tabsContent?.push({ content: renderSchoolInterestedAthletes() });
    }
  }

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
        tabs={tabsHeader}
        tabContent={tabsContent}
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
      <PromptAlert
        loading={isVerifyingAthlete}
        content={`This action will verify @${selectedAthlete?.user?.username}.`}
        showPrompt={updatingProfile === StatusEnum.VERIFYING}
        handleHidePrompt={() => {
          setUpdatingProfile(null);
          setSelectedAthlete({});
        }}
        handleConfirmPrompt={() =>
          handleVerifyAthleteConfirmPrompt(selectedAthlete)
        }
      />
      <PromptAlert
        loading={isRemovingLockerAthlete}
        content={`This action will remove @${selectedAthlete?.user?.username}`}
        showPrompt={updatingProfile === StatusEnum.DELETING}
        handleHidePrompt={() => {
          setUpdatingProfile(null);
          setSelectedAthlete({});
        }}
        handleConfirmPrompt={() =>
          handleRemoveLockerAthleteConfirmPrompt(selectedAthlete)
        }
      />
    </main>
  );
};

export default observer(Page);
