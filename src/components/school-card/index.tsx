/** @format */

"use client";

import { FC, useState } from "react";
import { Text } from "@tremor/react";
import UserAvatar from "../user-avatar";
import {
  ActivitySquareIcon,
  AthleteIcon,
  ClipboardEditIcon,
  FileImageIcon,
  FolderDotIcon,
  GraduationCapIcon,
  LocateFixedIcon,
  MapPinIcon,
  MoreHorizontalIcon,
  SchoolIcon,
  ScrollTextIcon,
  Users2Icon,
  UsersRoundIcon,
  WhistleIcon,
} from "../Icons";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { useDebouncedValue } from "@mantine/hooks";
import {
  useDeleteSchoolMutation,
  useGetSchoolsQuery,
  useUpdateSchoolMutation,
  QueryMode,
  SortOrder,
  useGetAggregateSchoolLazyQuery,
} from "@/services/graphql";
import { useToast } from "@/hooks/use-toast";
import MenubarCard from "../menubar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { BadgeDollarSign, Calendar } from "lucide-react";
import PromptAlert from "../prompt-alert";
import ModalCard from "@/components/modal";
import UsersAnalytics from "@/components/analytics/users";
import CalloutCard from "../callout";
import CardContainer from "../card-container";
import { renderLoader } from "@/lib/loader-helper";
import { CalloutCardProps } from "@/interface/calloutOptions";
import { StatusEnum } from "@/lib/enums/updating-profile.enum";
import SchoolDropdown from "../school-dropdown";
import { useRootStore } from "@/mobx";
interface SchoolCardProps {
  loading?: boolean;
  school: any;
}

const SchoolCard: FC<SchoolCardProps> = ({ loading, school }) => {
  const router = useRouter();
  const {
    schoolStore: { setSchools },
  } = useRootStore();
  const { toast } = useToast();
  const [deleteSchool] = useDeleteSchoolMutation();
  const [updateSchool] = useUpdateSchoolMutation();
  const [aggregateSchool] = useGetAggregateSchoolLazyQuery();
  const [isDeletingSchool, setIsDeletingSchool] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [viewAnalytics, setViewAnalytics] = useState(false);
  const [openSchool, setOpenSchool] = useState<boolean>(false);
  const [selectedSchool, setSelectedSchool] = useState<any | number>({});
  const [debounced] = useDebouncedValue(searchValue, 300);
  const isHighSchoolType = school?.schoolType?.name === "High School" ?? false;
  const [updatingProfile, setUpdatingProfile] = useState<StatusEnum | null>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const dataList: any = [
    {
      name: "Athletes Interested",
      value: school?._count?.athletesInterested || 0,
      color: "teal",
      icon: () => (
        <Users2Icon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Athletes Prospected",
      value: school?._count?.athletesProspected || 0,
      color: "teal",
      icon: () => (
        <UsersRoundIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Athletes Recruited",
      color: "teal",
      value: school?._count?.athletesRecruited || 0,
      icon: () => (
        <AthleteIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Coaches",
      color: "teal",
      value: school?._count?.coaches || 0,
      icon: () => (
        <WhistleIcon className="mr-2.5 mb-[-6px] h-5 w-5 fill-teal-600" />
      ),
    },

    {
      name: "Evaluations",
      value: school?._count?.evaluations || 0,
      icon: () => (
        <ClipboardEditIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Posts",
      value: school?._count?.posts || 0,
      icon: () => (
        <FileImageIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
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

  const { data: schoolsData, loading: loadingSchools } = useGetSchoolsQuery({
    variables: {
      where: {
        id: {
          not: {
            equals: school?.id,
          },
        },
        OR: [
          { name: { contains: debounced, mode: QueryMode.Insensitive } },
          { email: { contains: debounced, mode: QueryMode.Insensitive } },
        ],
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const handleConfirmPrompt = async (school: any) => {
    setIsDeletingSchool(true);

    const athletesId =
      school?.athletes?.map((val: any) => ({
        userId: val?.userId,
      })) || [];

    const coachesId =
      school?.coaches?.map((val: any) => ({
        userId: val?.userId,
      })) || [];

    try {
      const res = await updateSchool({
        variables: {
          where: {
            id: selectedSchool?.id,
          },
          data: {
            athletes: {
              connect: athletesId,
            },
            coaches: {
              connect: coachesId,
            },
          },
        },
      });

      if (res?.data?.updateOneSchool) {
        await deleteSchool({
          variables: {
            where: {
              id: school?.id,
            },
          },
        });
        const schoolResp = await aggregateSchool({
          variables: {
            where: {
              schoolType: {
                is: {
                  name: {
                    equals: isHighSchoolType ? "High School" : "College",
                  },
                },
              },
            },
          },
        });
        setSchools(schoolResp?.data as any);
        toast({
          title: "School successfully Deleted.",
          description: `${school?.name} has been successfully deleted`,
          variant: "successfull",
        });
        router.push(
          isHighSchoolType ? `/schools/high-school` : `/schools/college`
        );
      }
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
      setUpdatingProfile(null);
    }
  };
  const handleDeleteSchoolPrompt = () => {
    setUpdatingProfile(StatusEnum.DELETING);
  };

  const renderSelectSchool = () => {
    return (
      <SchoolDropdown
        scrollAreaClass="h-72"
        hasSearch={true}
        id="migrate-college-high-school"
        onClose={() => setOpenSchool(!openSchool)}
        isOpen={openSchool}
        selectedValue={selectedSchool}
        onSelectValue={(school) => {
          setSelectedSchool({ value: school?.value, id: school?.id });
          setIsDisabled(false);
        }}
        placeholder={`Select ${isHighSchoolType ? "High School" : "College"}`}
        label="Select School to Migrate data to"
        whereClause={{
          id: {
            not: {
              equals: school?.id,
            },
          },
          schoolType: {
            is: {
              name: {
                equals: isHighSchoolType ? "High School" : "College",
              },
            },
          },
        }}
      />
    );
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

  const calloutOptions: CalloutCardProps[] = [
    {
      color: "teal",
      type: "string",
      title: school?.schoolType?.name || ("High School" as string),
      className: "mt-4 min-h-[75px]",
      icon: () => (
        <GraduationCapIcon className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: school?.name,
    },
    {
      color: "teal",
      type: "string",
      title: "Address",
      className: "mt-4 min-h-[75px]",
      icon: () => (
        <MapPinIcon className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: school?.address,
    },
    {
      color: "teal",
      type: "string",
      title: "Conference",
      className: "mt-4 min-h-[75px]",
      icon: () => (
        <ActivitySquareIcon className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: school?.conference,
    },
    {
      color: "teal",
      type: "string",
      title: "Description",
      className: "mt-4",
      icon: () => (
        <ScrollTextIcon className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: school?.description,
    },
    {
      color: "teal",
      type: "string",
      title: "Yearly Tuition",
      className: "mt-4 min-h-[75px]",
      icon: () => (
        <BadgeDollarSign className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: school?.yearlyTuition ? `$ ${school?.yearlyTuition}` : "",
    },
    {
      color: "teal",
      type: "string",
      title: "Year Founded",
      className: "mt-4 min-h-[75px]",
      icon: () => <Calendar className="h-[20px] w-[20px] mr-2" color="teal" />,
      content: school?.yearFounded,
    },
    {
      color: "teal",
      type: "string",
      title: "Undergrad Students",
      className: "mt-4 min-h-[75px]",
      icon: () => (
        <GraduationCapIcon className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: school?.undergradStudents,
    },
    {
      color: "teal",
      type: "string",
      title: "Country",
      className: "mt-4 min-h-[75px]",
      icon: () => (
        <MapPinIcon className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: school?.country?.name,
      flagUrl: school?.country?.flag,
    },
    {
      color: "teal",
      type: "string",
      title: "State",
      className: "mt-4 min-h-[75px]",
      icon: () => (
        <MapPinIcon className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: school?.state,
    },
    {
      color: "teal",
      type: "string",
      title: "City",
      className: "mt-4 min-h-[75px]",
      icon: () => (
        <LocateFixedIcon className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: school?.city,
    },
  ];

  const renderCallout = () => {
    return (
      <>
        {calloutOptions?.map((item: CalloutCardProps, id) => {
          return (
            <div key={id}>
              <CalloutCard
                color={item?.color as any}
                type={item?.type}
                title={item?.title}
                className={item?.className}
                icon={() => <>{item?.icon}</>}
                content={item?.content}
                flagUrl={item?.flagUrl}
              />
            </div>
          );
        })}
        {isHighSchoolType ? (
          <CalloutCard
            color="teal"
            type="string"
            title="Classification"
            className="mt-4 min-h-[75px]"
            content={school?.division}
            icon={() => (
              <FolderDotIcon className="h-[20px] w-[20px] mr-2" color="teal" />
            )}
          />
        ) : (
          <>
            <CalloutCard
              color="teal"
              type="string"
              className="mt-4 min-h-[75px]"
              title="Division"
              content={school?.division}
              icon={() => (
                <FolderDotIcon
                  className="h-[20px] w-[20px] mr-2"
                  color="teal"
                />
              )}
            />
          </>
        )}
      </>
    );
  };
  return (
    <CardContainer className="p-4 md:p-4">
      <div className="flex flex-col justify-center items-center relative">
        <UserAvatar
          className="h-[120px] w-[120px] shadow"
          height={120}
          width={120}
          fallbackType="icon"
          avatar={school?.logo as string}
          fallbackClassName={"h-[120px] w-[120px]"}
          fallback={`${school?.name?.charAt(0)} `}
          icon={<SchoolIcon className="h-8 w-8" />}
        />
        {loading ? (
          <Skeleton className="w-[120px] h-[25px] mt-2" />
        ) : (
          <Text className="text-sm font-TTHovesRegular mt-2">
            {school?.name}
          </Text>
        )}

        <div className="ml-auto absolute flex flex-row items-center right-0 top-0">
          {loading ? (
            <Skeleton className="w-[40px] h-[20px]" />
          ) : (
            <MenubarCard
              trigger={
                <Button size="icon" variant="outline">
                  <MoreHorizontalIcon className="cursor-pointer" />
                </Button>
              }
              items={dropdownItems}
            />
          )}
        </div>
      </div>
      <Separator className="my-6" />
      {loading ? renderLoader() : renderCallout()}
      <PromptAlert
        loading={isDeletingSchool}
        content={`This action cannot be undone. This will permanently delete this data from our servers.`}
        showPrompt={updatingProfile === StatusEnum.DELETING}
        handleHidePrompt={() => {
          setSelectedSchool({});
          setUpdatingProfile(null);
          setIsDisabled(true);
        }}
        customElement={renderSelectSchool()}
        disable={isDisabled}
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
              title={`${school?.name} Analytics`}
            />
          </div>
        </div>
      </ModalCard>
    </CardContainer>
  );
};

export default SchoolCard;
