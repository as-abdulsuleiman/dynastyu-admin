/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  QueryMode,
  SortOrder,
  useGetCoachesQuery,
  useGetSchoolQuery,
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

interface PageProps {
  params: {
    id: number;
  };
}

const Page: FC<PageProps> = ({ params }) => {
  const router = useRouter();
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
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <SchoolCoaches
          handleClick={handleRemoveCoach}
          loading={loadingSchoolCoach}
          coaches={(schoolCoach?.coachProfiles as any) || []}
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
