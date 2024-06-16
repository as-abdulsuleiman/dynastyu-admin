/** @format */

"use client";

import React, { FC, useState, useMemo } from "react";
import ContentHeader from "../content-header";
import CardContainer from "../card-container";
import { Separator } from "@/components/ui/separator";
import ComboboxCard from "../combobox-card";
import { Button } from "../ui/button";
import { useDebouncedValue } from "@mantine/hooks";
import { PromptStatusEnum } from "@/lib/enums/updating-profile.enum";
import UserAvatar from "../user-avatar";
import { CheckIcon } from "../Icons";
import { CommandItem } from "../ui/command";
import { cn } from "@/lib/utils";
import {
  QueryMode,
  SortOrder,
  useGetAthletesWithSkillsQuery,
  useGetSkillTypesQuery,
} from "@/services/graphql";

interface CompareProps {
  params: {
    id: number;
  };
}

const CompareAthleteCard: FC<CompareProps> = ({ params }) => {
  const [selectedUser, setSelectedUser] = useState<any | number>({});
  const [secondSelectedUser, setSecondSelectedUser] = useState<any | number>(
    {}
  );
  const [userValue, setUserValue] = useState<string>("");
  const [debounced] = useDebouncedValue(userValue, 300);
  const [promptStatus, setPromptStatus] = useState<PromptStatusEnum | null>();
  const [secondPromptStatus, setSecondPromptStatus] =
    useState<PromptStatusEnum | null>();
  const [openUser, setOpenUser] = useState<boolean>(false);
  const [openSecondUser, setSecondOpenUser] = useState<boolean>(false);
  const [firstPlayer, setfirstPlayer] = useState(null);
  const [secondPlayer, setsecondPlayer] = useState(null);
  const { data: skillTypesData } = useGetSkillTypesQuery({
    variables: {
      orderBy: {
        position: SortOrder.Asc,
      },
    },
  });

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
        verified: { equals: true },
        user: {
          is: {
            OR: [
              {
                firstname: {
                  contains: debounced,
                  mode: QueryMode.Insensitive,
                },
                surname: {
                  contains: debounced,
                  mode: QueryMode.Insensitive,
                },
                username: {
                  contains: debounced,
                  mode: QueryMode.Insensitive,
                },
              },
            ],
          },
        },
      },
      // take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
    // skip: !isHighSchool,
  });

  console.log("athletesData", athletesData);

  console.log("selectedUser", selectedUser);

  const getHigher = (player: any, a: any, comparisonType = "higher") => {
    // Extract the skill values and provide a default of 0 if undefined
    const firstPlayerSkillValue =
      selectedUser?.skills?.find((b: any) => b?.skillType?.id === a?.id)
        ?.value || 0;
    const secondPlayerSkillValue =
      secondSelectedUser?.skills?.find((b: any) => b?.skillType?.id === a?.id)
        ?.value || 0;

    // Function to determine the result based on comparison type
    const isHigher = (value1: any, value2: any) => {
      return comparisonType === "higher" ? value1 > value2 : value1 < value2;
    };

    // Determine if the player is the firstPlayer or secondPlayer and compare skills
    if (player?.id === selectedUser?.id) {
      if (isHigher(firstPlayerSkillValue, secondPlayerSkillValue)) {
        console.log(
          `firstPlayer is considered higher with ${comparisonType} value`
        );
        return true;
      } else {
        console.log(
          `secondPlayer is considered higher with ${comparisonType} value`
        );
        return false;
      }
    } else if (player?.id === selectedUser?.id) {
      if (isHigher(secondPlayerSkillValue, firstPlayerSkillValue)) {
        console.log(
          `secondPlayer is considered higher with ${comparisonType} value`
        );
        return true;
      } else {
        console.log(
          `firstPlayer is considered higher with ${comparisonType} value`
        );
        return false;
      }
    }
    // If the player does not match firstPlayer or secondPlayer, return false
    console.log("No matching player found");
    return false;
  };
  const hh = skillTypesData?.skillTypes?.map((a) => {
    return getHigher(
      selectedUser?.items?.skills,
      a,
      a.id === 6 || a.id === 8 ? "lower" : "higher"
    );
  });

  const check = skillTypesData?.skillTypes?.map((a, id) => {
    const second =
      secondSelectedUser?.items?.skills?.find(
        (b: any) => b?.skillType?.id === a?.id
      )?.value || 0;

    const first =
      selectedUser?.items?.skills?.find((b: any) => b?.skillType?.id === a?.id)
        ?.value || 0;

    return console.log("second", second, first);
  });

  console.log("check", check);

  const userCustomItems = ({ item, id }: { item: any; id: number }) => {
    return (
      <CommandItem
        className="capitalize "
        key={item?.id || id}
        value={selectedUser}
        onSelect={() => {
          setSelectedUser({
            value: item?.value,
            id: item?.id,
            items: item,
          });
          setOpenUser(false);
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
            selectedUser?.value === item?.value ? "opacity-100" : "opacity-0"
          )}
        />
      </CommandItem>
    );
  };

  const secondUserCustomItems = ({ item, id }: { item: any; id: number }) => {
    return (
      <CommandItem
        className="capitalize "
        key={item?.id || id}
        value={secondSelectedUser}
        onSelect={() => {
          setSecondSelectedUser({
            value: item?.value,
            id: item?.id,
            items: item,
          });
          setSecondOpenUser(false);
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
            secondSelectedUser?.value === item?.value
              ? "opacity-100"
              : "opacity-0"
          )}
        />
      </CommandItem>
    );
  };
  const usersDataOptions = useMemo(() => {
    return athletesData?.athleteProfiles?.map((a) => {
      return {
        id: a?.id,
        label: `${a?.user?.firstname} ${a?.user?.surname}`,
        value: a?.user?.username,
        avatar: a?.user?.avatar,
        skills: a?.skills,
        position: a?.position?.name,
        school: a?.school?.name,
      };
    });
  }, [athletesData?.athleteProfiles]);

  const secondUsersDataOptions = useMemo(() => {
    return athletesData?.athleteProfiles?.map((a) => {
      return {
        id: a?.id,
        label: `${a?.user?.firstname} ${a?.user?.surname}`,
        value: a?.user?.username,
        avatar: a?.user?.avatar,
        skills: a?.skills,
        position: a?.position?.name,
        school: a?.school?.name,
      };
    });
  }, [athletesData?.athleteProfiles]);

  return (
    <div>
      <CardContainer>
        <div className="flex flex-col sm:flex-row item-center justify-between px-5">
          <div className=" w-full  flex flex-col">
            <ComboboxCard
              valueKey="value"
              displayKey="label"
              IdKey="value"
              label="Select Athlete"
              id="athlete"
              placeholder={"Select Athlete"}
              isOpen={openUser}
              scrollAreaClass="h-72"
              hasSearch
              shouldFilter={false}
              searchValue={userValue}
              handleSearch={(search) => setUserValue(search)}
              loading={LoadingAthletes}
              onClose={() => setOpenUser(!openUser)}
              items={usersDataOptions as any}
              selectedValue={selectedUser}
              customRenderItems={userCustomItems}
            />

            <div className="w-full flex mt-6 ">
              <Button
                className="ml-auto"
                variant="default"
                onClick={() => {
                  setPromptStatus(PromptStatusEnum.ADDING);
                  // setIsAddingUser(true);
                }}
                disabled={Object?.keys(selectedUser)?.length === 0}
              >
                Add User
              </Button>
            </div>
          </div>

          <div className="mt-6 sm:mt-0 w-full ml-0 sm:ml-8 flex flex-col ">
            <ComboboxCard
              valueKey="value"
              displayKey="label"
              IdKey="value"
              label="Select Athlete"
              id="second-athlete"
              placeholder={"Select Athlete"}
              isOpen={openSecondUser}
              scrollAreaClass="h-72"
              hasSearch
              shouldFilter={false}
              searchValue={userValue}
              handleSearch={(search) => setUserValue(search)}
              loading={LoadingAthletes}
              onClose={() => setSecondOpenUser(!openSecondUser)}
              items={secondUsersDataOptions as any}
              selectedValue={secondSelectedUser}
              customRenderItems={secondUserCustomItems}
            />

            <div className="w-full flex mt-6 ">
              <Button
                className="ml-auto"
                variant="default"
                onClick={() => {
                  setSecondPromptStatus(PromptStatusEnum.ADDING);
                  // setIsAddingUser(true);
                }}
                disabled={Object?.keys(secondSelectedUser)?.length === 0}
              >
                Add User
              </Button>
            </div>
          </div>
        </div>
      </CardContainer>
      <div className="mt-[30px]">
        <div className="grid grid-cols-2 gap-3 sm:gap-10 flex-col sm:flex-row item-center justify-between  w-full">
          <CardContainer className="flex flex-col  sm:items-start items-center justify-center  w-full min-h-[140px]">
            {Object.keys(selectedUser).length > 0 ? (
              <div className="flex flex-col items-center sm:items-start">
                {" "}
                <div className="text-base sm:text-xl mb-2 ">
                  {selectedUser?.items?.school}
                </div>
                <strong className="text-base sm:text-xl ">
                  {selectedUser?.items?.label}
                </strong>
                <div className="text-sm sm:text-lg mt-2">
                  Position: <strong> {selectedUser?.items?.position}</strong>
                </div>
                {skillTypesData?.skillTypes?.map((a, id) => {
                  return (
                    <div
                      key={id}
                      className="flex flex-col sm:flex-row  mt-2 text-sm sm:text-lg items-center sm:items-start"
                    >
                      <div className="">
                        {`${a?.name}:  `}
                        {""}
                      </div>
                      <strong className="ml-0 sm:ml-2">
                        {selectedUser?.items?.skills?.find(
                          (b: any) => b?.skillType?.id === a?.id
                        )?.value || 0}{" "}
                        {a?.unit}
                      </strong>

                      {/* {getHigher(
                        selectedUser,
                        a,
                        a.id === 6 || a.id === 8 ? "lower" : "higher"
                      ) ? (
                        <CheckIcon />
                      ) : null} */}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </CardContainer>
          <CardContainer className="min-h-[140px] flex flex-col items-center sm:items-start justify-center w-full">
            {Object.keys(secondSelectedUser).length > 0 ? (
              <div className="flex flex-col items-center sm:items-start">
                {" "}
                <div className="text-base sm:text-xl mb-2">
                  {secondSelectedUser?.items?.school}
                </div>
                <strong className="text-base sm:text-xl ">
                  {secondSelectedUser?.items?.label}
                </strong>
                <div className="text-sm sm:text-lg  mt-2">
                  Position:{" "}
                  <strong> {secondSelectedUser?.items?.position}</strong>
                </div>
                {skillTypesData?.skillTypes?.map((a, id) => {
                  return (
                    <div
                      key={id}
                      className="flex flex-col sm:flex-row mt-2 sm:text-lg text-sm items-center sm:items-start"
                    >
                      <div className="">
                        {`${a?.name}:  `}
                        {""}
                      </div>
                      <strong className="ml-1 sm:ml-2">
                        {secondSelectedUser?.items?.skills?.find(
                          (b: any) => b?.skillType?.id === a?.id
                        )?.value || 0}{" "}
                        {a?.unit}
                      </strong>
                      <div className="ml-1"></div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </CardContainer>
        </div>
      </div>
    </div>
  );
};

export default CompareAthleteCard;
