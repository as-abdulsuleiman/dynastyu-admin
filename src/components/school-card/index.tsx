/** @format */

"use client";

import { FC, useState } from "react";
import { Callout, Text } from "@tremor/react";
import UserAvatar from "../user-avatar";
import { Icons } from "../Icons";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useDeleteSchoolMutation,
  useUpdateSchoolMutation,
} from "@/services/graphql";
import { useToast } from "@/hooks/use-toast";
import MenubarCard from "../menubar";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import MoreHorizontal from "../Icons/more-horizontal";
import { Button } from "../ui/button";
import { BadgeDollarSign, Calendar } from "lucide-react";
import PromptAlert from "../prompt-alert";
import ModalCard from "@/components/modal";
import UsersAnalytics from "@/components/analytics/users";

interface SchoolCardProps {
  loading?: boolean;
  school: any;
}

const SchoolCard: FC<SchoolCardProps> = ({ loading, school }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [deleteSchool] = useDeleteSchoolMutation();
  const [updateSchool] = useUpdateSchoolMutation();
  const [isDeletingSchool, setIsDeletingSchool] = useState(false);
  const [openDeleteSchoolPrompt, setOpenDeleteSchoolPrompt] = useState(false);
  const [viewAnalytics, setViewAnalytics] = useState(false);

  const dataList: any = [
    {
      name: "Athletes Interested",
      value: school?._count?.athletesInterested || 0,
      color: "teal",
      icon: () => (
        <Icons.users2 className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Athletes Prospected",
      value: school?._count?.athletesProspected || 0,
      color: "teal",
      icon: () => (
        <Icons.usersRound className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Athletes Recruited",
      color: "teal",
      value: school?._count?.athletesRecruited || 0,
      icon: () => (
        <Icons.athlete className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Coaches",
      color: "teal",
      value: school?._count?.coaches || 0,
      icon: () => (
        <Icons.whistle className="mr-2.5 mb-[-6px] h-5 w-5 fill-teal-600" />
      ),
    },

    {
      name: "Evaluations",
      value: school?._count?.evaluations || 0,
      icon: () => (
        <Icons.clipboardEdit className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Posts",
      value: school?._count?.posts || 0,
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

  const handleConfirmPrompt = async (school: any) => {
    setIsDeletingSchool(true);
    const athletesInterestedId = school?.athletesInterested?.map(
      (val: any) => val?.athleteId
    );
    const athletesRecruitedId = school?.athletesRecruited?.map(
      (val: any) => val?.athleteId
    );
    const athletesProspectedId = school?.athletesProspected?.map(
      (val: any) => val?.athleteId
    );
    const schoolPostId = school?.posts?.map((val: any) => val?.id);
    const athletesId = school?.athletes?.map((val: any) => val?.id);
    const coachesId = school?.coaches?.map((val: any) => val?.id);
    try {
      await updateSchool({
        variables: {
          where: {
            id: school.id,
          },
          data: {
            athletesProspected: {
              deleteMany: [
                {
                  athleteId: {
                    in: athletesProspectedId || [],
                  },
                },
              ],
            },
            athletesRecruited: {
              deleteMany: [
                {
                  athleteId: {
                    in: athletesRecruitedId || [],
                  },
                },
              ],
            },
            athletesInterested: {
              deleteMany: [
                {
                  athleteId: {
                    in: athletesInterestedId || [],
                  },
                },
              ],
            },
            posts: {
              deleteMany: [
                {
                  id: {
                    in: schoolPostId || [],
                  },
                },
              ],
            },
            athletes: {
              deleteMany: [
                {
                  id: {
                    in: athletesId || [],
                  },
                },
              ],
            },
            coaches: {
              deleteMany: [
                {
                  id: {
                    in: coachesId || [],
                  },
                },
              ],
            },
          },
        },
      });
      await deleteSchool({
        variables: {
          where: {
            id: school?.id,
          },
        },
      });
      router.push(`/schools`);
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not delete athlete profile. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setIsDeletingSchool(false);
      setOpenDeleteSchoolPrompt(false);
    }
  };
  const handleDeleteSchoolPrompt = () => {
    setOpenDeleteSchoolPrompt(true);
  };

  const dropdownItems = [
    {
      name: `Edit School`,
      onClick: () => router.push(`/schools/edit?school=${school?.id}`),
    },
    {
      name: `Delete ${school?.schoolType?.name}`,
      onClick: () => handleDeleteSchoolPrompt(),
    },
    {
      name: "View Analytics",
      onClick: () => setViewAnalytics(true),
    },
  ];
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col justify-center items-center relative">
          <UserAvatar
            className="h-[120px] w-[120px] shadow"
            height={120}
            width={120}
            fallbackType="icon"
            avatar={school?.logo as string}
            fallbackClassName={"h-[120px] w-[120px]"}
            fallback={`${school?.name?.charAt(0)} `}
            icon={<Icons.school className="h-8 w-8" />}
          />
          {loading ? (
            <Skeleton className="w-[120px] h-[25px] mt-2" />
          ) : (
            <Text className="text-xl mt-2">{school?.schoolType?.name}</Text>
          )}

          <div className="ml-auto absolute flex flex-row items-center right-0 top-0">
            {loading ? (
              <Skeleton className="w-[40px] h-[20px]" />
            ) : (
              <MenubarCard
                trigger={
                  <Button size="icon" variant="outline">
                    <MoreHorizontal className="cursor-pointer" />
                  </Button>
                }
                items={dropdownItems}
              />
            )}
          </div>
        </div>
        <Separator className="my-6" />
        <Callout
          className="mt-4 min-h-[75px]"
          title={school?.schoolType?.name || ("High School" as string)}
          icon={() => {
            return (
              <Icons.graduationCap
                className="h-[20px] w-[20px] mr-2"
                color="teal"
              />
            );
          }}
          color="teal"
        >
          {school?.name}
        </Callout>
        <Callout
          className="mt-4 min-h-[75px]"
          title="Address"
          icon={() => {
            return (
              <Icons.mapPin className="h-[20px] w-[20px] mr-2" color="teal" />
            );
          }}
          color="teal"
        >
          {school?.address}
        </Callout>
        <Callout
          className="mt-4 min-h-[75px]"
          title="Division"
          icon={() => {
            return (
              <Icons.folderDot
                className="h-[20px] w-[20px] mr-2"
                color="teal"
              />
            );
          }}
          color="teal"
        >
          {school?.division}
        </Callout>
        <Callout
          className="mt-4 min-h-[75px]"
          title="Conference"
          icon={() => {
            return (
              <Icons.activitySquare
                className="h-[20px] w-[20px] mr-2"
                color="teal"
              />
            );
          }}
          color="teal"
        >
          {school?.conference}
        </Callout>
        <Callout
          className="mt-4 min-h-[75px]"
          title="Description"
          icon={() => {
            return (
              <Icons.scrollText
                className="h-[20px] w-[20px] mr-2"
                color="teal"
              />
            );
          }}
          color="teal"
        >
          {school?.description}
        </Callout>
        <Callout
          className="mt-4 min-h-[75px]"
          title="Yearly Tuition"
          icon={() => {
            return (
              <BadgeDollarSign
                className="h-[20px] w-[20px] mr-2"
                color="teal"
              />
            );
          }}
          color="teal"
        >
          {school?.yearlyTuition ? `$ ${school?.yearlyTuition}` : ""}
        </Callout>
        <Callout
          className="mt-4 min-h-[75px]"
          title="Year Founded"
          icon={() => {
            return <Calendar className="h-[20px] w-[20px] mr-2" color="teal" />;
          }}
          color="teal"
        >
          {school?.yearFounded}
        </Callout>
        <Callout
          className="mt-4 min-h-[75px]"
          title="Undergrad Students"
          icon={() => {
            return (
              <Icons.graduationCap
                className="h-[20px] w-[20px] mr-2"
                color="teal"
              />
            );
          }}
          color="teal"
        >
          {school?.undergradStudents}
        </Callout>
        <Callout
          className="mt-4 min-h-[75px]"
          title="Country"
          icon={() => {
            return (
              <Icons.mapPin className="h-[20px] w-[20px] mr-2" color="teal" />
            );
          }}
          color="teal"
        >
          <span className="flex flex-row items-center h-full">
            <>{school?.country?.name}</>
            {school?.country?.flag ? (
              <Image
                alt="country_flag"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                quality={100}
                priority
                width={30}
                height={30}
                src={school?.country?.flag}
                className="h-[30px] w-[30px] rounded-full ml-auto object-cover"
              />
            ) : null}
          </span>
        </Callout>
        <Callout
          className="mt-4 min-h-[75px]"
          title="State"
          icon={() => {
            return (
              <Icons.pin className="h-[20px] w-[20px] mr-2" color="teal" />
            );
          }}
          color="teal"
        >
          {school?.state}
        </Callout>
        <Callout
          className="mt-4 min-h-[75px]"
          title="City"
          icon={() => {
            return (
              <Icons.locateFixed
                className="h-[20px] w-[20px] mr-2"
                color="teal"
              />
            );
          }}
          color="teal"
        >
          {school?.city}
        </Callout>
        <PromptAlert
          loading={isDeletingSchool}
          content={`This action cannot be undone. This will permanently delete this data from our servers.`}
          showPrompt={openDeleteSchoolPrompt}
          handleHidePrompt={() => {
            setOpenDeleteSchoolPrompt(false);
          }}
          handleConfirmPrompt={() => handleConfirmPrompt(school)}
        />
        <ModalCard
          isModal={true}
          isOpen={viewAnalytics}
          onOpenChange={() => setViewAnalytics(!viewAnalytics)}
        >
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <UsersAnalytics
                loading={loading}
                data={dataList}
                showStatus={false}
                // isActive={data?.school?.user?.isActive || false}
                title={`${school?.name} Analytics`}
              />
            </div>
          </div>
        </ModalCard>
      </CardContent>
    </Card>
  );
};

export default SchoolCard;
