/** @format */

"use client";

import {
  ChangeEvent,
  ElementRef,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  GetAthleteSkillTypesQuery,
  QueryMode,
  SortOrder,
  useCreateHistoryMutation,
  useCreateOneSkillVerificationMutation,
  useCreateSkillMutation,
  useGetAthleteProfileQuery,
  useGetAthleteSkillTypesQuery,
  useGetCampsQuery,
  useGetSkillHistoriesQuery,
  useGetSkillVerificationRequestsQuery,
  useUpdateOneSkillMutation,
} from "@/services/graphql";
import ContentHeader from "../content-header";
import { Separator } from "../ui/separator";
import {
  SkillIcon,
  VerifiedIcon,
  TrashIcon,
  PlayIcon,
  MoreHorizontalIcon,
  Loader2Icon,
} from "@/components/Icons";
import { SearchInput } from "../search-input";
import SelectCard from "@/components/select";
import { Title, Text, Grid } from "@tremor/react";
import UniversalTable from "../universal-table";
import Pagination from "../pagination";
import { TableCell, TableRow } from "../ui/table";
import MenubarCard from "../menubar";
import UseThemeColor from "@/hooks/useThemeColor";
import ModalCard from "../modal";
import MediaCard from "../media-card";
import ComboBoxCard from "@/components/combobox-card";
import { Button } from "../ui/button";
import { observer } from "mobx-react-lite";
import { formatDate } from "@/lib/utils";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { useStorage } from "@/hooks/use-storage";
import { useRootStore } from "@/mobx";
import { useDebouncedValue } from "@mantine/hooks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

const headerItems = [
  { name: "Skill" },
  { name: "Value" },
  { name: "Second Field Value" },
  { name: "Unit" },
  { name: "Created At" },
  { name: "Videos" },
  { name: "Actions" },
];

const historyHeaderItems = [
  { name: "Skill" },
  { name: "Value" },
  { name: "Second Value" },
  { name: "Created At" },
];

interface AthleteSkillProps {
  params: {
    athlete: string;
  };
  searchParams: {
    athlete: number;
  };
}
interface CampProps {
  label: string;
  value: number;
}

const getFileName = (url: string) => {
  const splittedUrl = url.split("/");
  return splittedUrl[splittedUrl.length - 2];
};

const RenderSkillHistory = ({
  skillId,
  athleteId,
}: {
  skillId: number;
  athleteId: number;
}) => {
  const fetchHistory = (skillId && athleteId) ?? false;

  const { data: historyData, loading } = useGetSkillHistoriesQuery({
    variables: {
      where: {
        skillId: {
          equals: skillId,
        },
        athleteId: {
          equals: athleteId,
        },
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
    skip: !fetchHistory,
  });

  const renderItems = ({ item, id }: { item: any; id: any }) => {
    return (
      <TableRow key={item?.id} className="w-full">
        <TableCell>
          <div className="text-base flex flex-row items-center justify-start">
            <span>{item?.skill?.skillType?.name}</span>
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div className="">{item?.value}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div className="">{item?.secondValue}</div>
        </TableCell>
        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {formatDate(new Date(item?.createdAt), "MMMM dd yyyy")}
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="grid grid-cols-12 gap-6 py-2">
      <div className="col-span-12">
        <div className="text-base font-TTHovesDemiBold">Skill History</div>
        <UniversalTable
          title="Athlete List"
          headerItems={historyHeaderItems}
          items={historyData?.skillHistories as any[]}
          loading={loading}
          renderItems={renderItems}
        />
      </div>
    </div>
  );
};

const RenderEditSkillModal = ({
  item,
  athleteId,
  userId,
  handleRefetch,
  onClose,
}: {
  item: any;
  athleteId: number;
  userId: number;
  handleRefetch: () => void;
  onClose: () => void;
}) => {
  const { toast } = useToast();
  const themeColor = UseThemeColor();
  const { data: campData } = useGetCampsQuery();
  const [createHistory] = useCreateHistoryMutation();
  const [createVerificationRequest] = useCreateOneSkillVerificationMutation();
  const [updateSkill] = useUpdateOneSkillMutation();
  const [createSkill] = useCreateSkillMutation();
  const [selectedCamp, setSelectedCamp] = useState<any>({});
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [openOption, setOpenOption] = useState<boolean>(false);
  const [openCamp, setOpenCamp] = useState<boolean>(false);
  const [activeUpload, setActiveUpload] = useState<string>();
  const [isUploadingNewVideo, setIsUploadingNewVideo] =
    useState<boolean>(false);
  const [openSecondOption, setOpenSecondOption] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [selectedSecondOption, setSelectedSecondOption] = useState<string>();
  const [videos, setVideos] = useState<string[]>([]);
  const [newVideos, setNewVideos] = useState<File[]>([]);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const inputRef = useRef<ElementRef<"input">>(null);
  const { uploadFiles } = useStorage({
    userId: userId,
    folder: "skills",
  });

  const skillData = item?.skills?.find((a: any) => a);

  const isEmptySkillId = skillData !== undefined;
  skillData?.id ?? false;

  const { data: verificationData, refetch } =
    useGetSkillVerificationRequestsQuery({
      variables: { where: { skillId: { equals: skillData?.id } } },
      skip: !isEmptySkillId,
    });

  useEffect(() => {
    if (skillData?.videos?.length) {
      setVideos(skillData?.videos);
    }
    if (skillData?.value) {
      setSelectedOption(skillData?.value);
    }
    if (skillData?.secondValue) {
      setSelectedSecondOption(skillData?.secondValue);
    }
  }, [skillData]);

  const formattedOptions = useMemo(
    () =>
      item?.options?.map((option: string) => ({
        label: option,
        value: option,
        id: option,
      })),
    [item?.options]
  );

  const formattedSecondValueOptions = useMemo(
    () =>
      item?.secondValueOptions?.map((option: string) => ({
        label: option,
        value: option,
        id: option,
      })),
    [item?.secondValueOptions]
  );

  const camps = useMemo(
    () =>
      campData?.camps?.map((camp) => ({ label: camp.name, value: camp.id })) ||
      [],
    [campData]
  );

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.length) {
      const files: any = event?.target?.files;
      if (files?.length) {
        setNewVideos((prev) => [...prev, files[0]]);
      }
    }
  };

  const handleCreateHistory = (skill: any) => {
    return createHistory({
      variables: {
        data: {
          skill: { connect: { id: skill?.id } },
          videos: { set: skill?.videos },
          value: skill?.value,
          secondValue: skill?.secondValue,
          athlete: { connect: { id: skill?.athleteId } },
          verified: skill?.verified,
          verifiedAt: skill?.verifiedAt,
          createdAt: skill?.createdAt,
        },
      },
    });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmiting(true);
      const { videos: newUploadedVideo } = await uploadFiles([], newVideos, []);
      if (skillData?.id) {
        const resp = await updateSkill({
          variables: {
            where: { id: skillData?.id },
            data: {
              value: { set: selectedOption },
              secondValue: { set: selectedSecondOption || "" },
              videos: { set: [...videos, ...newUploadedVideo] },
              verified: { set: false },
              verifiedAt: { set: null },
              skillVerificationRequests: {
                updateMany: [
                  {
                    where: { skillId: { equals: skillData?.id } },
                    data: { verified: { set: false } },
                  },
                ],
              },
            },
          },
        });
        if (resp.data?.updateOneSkills) {
          await handleCreateHistory(resp.data?.updateOneSkills);
        }
      } else {
        const resp = await createSkill({
          variables: {
            data: {
              athlete: {
                connect: { id: athleteId },
              },
              skillType: {
                connect: { id: item?.id },
              },
              value: selectedOption as string,
              secondValue: selectedSecondOption,
              videos: { set: [...videos, ...newUploadedVideo] },
              verified: false,
              verifiedAt: null,
            },
          },
        });
        if (resp.data?.createOneSkills) {
          await handleCreateHistory(resp.data?.createOneSkills);
        }
      }
    } catch (error: any) {
      setIsSubmiting(false);
      toast({
        title: "Something went wrong.",
        description: `${error.message}`,
        variant: "destructive",
      });
      onClose();
    } finally {
      handleRefetch();
      setIsSubmiting(false);
      onClose();
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 py-2">
      <div
        className={`col-span-12 sm:col-span-${
          formattedSecondValueOptions.length > 0 ? "6" : "12"
        }`}
      >
        <ComboBoxCard
          displayKey="label"
          IdKey="label"
          label={item?.name}
          isOpen={openOption}
          onClose={() => setOpenOption(!openOption)}
          items={formattedOptions}
          selectedValue={{ value: selectedOption }}
          onSelectValue={(item) => {
            setSelectedOption(item?.value);
          }}
          id="options"
          valueKey="value"
        />
      </div>

      {formattedSecondValueOptions?.length > 0 ? (
        <div className="col-span-12 sm:col-span-6">
          <ComboBoxCard
            displayKey="label"
            IdKey="label"
            valueKey="value"
            label={item?.secondFieldName}
            isOpen={openSecondOption}
            onClose={() => setOpenSecondOption(!openSecondOption)}
            items={formattedSecondValueOptions}
            selectedValue={{ value: selectedSecondOption }}
            onSelectValue={(item) => {
              setSelectedSecondOption(item?.value);
            }}
            id="secondValueOptions"
          />
        </div>
      ) : null}
      {videos?.length ? (
        <div className="col-span-12 gap-6">
          {videos?.map((video: string, index: number) => {
            return (
              <div key={index} className="mb-2">
                <div className="flex flex-row items-center">
                  <PlayIcon
                    className="h-5 w-5 cursor-pointer"
                    color={themeColor === "dark" ? "#fafafa" : "#0a0a0a"}
                  />
                  <div className="text-sm ml-2">
                    {item.videosLabels?.length
                      ? item?.videosLabels[index]
                      : getFileName(video)}
                  </div>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="ml-auto"
                    onClick={() =>
                      setVideos((prev) =>
                        prev?.filter((a: string) => a !== video)
                      )
                    }
                  >
                    <TrashIcon className="h-4 w-4 cursor-pointer " />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {newVideos?.length ? (
        <div className="col-span-12 sm:col-span-12 gap-6">
          {newVideos?.map((video: any, index: number) => {
            return (
              <div key={index} className="mb-2">
                <div className="flex flex-row items-center">
                  <PlayIcon
                    className="h-5 w-5 cursor-pointer"
                    color={themeColor === "dark" ? "#fafafa" : "#0a0a0a"}
                  />
                  <div className="text-sm ml-2">
                    {item.videosLabels?.length
                      ? item?.videosLabels[index]
                      : getFileName(video)}
                  </div>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="ml-auto"
                    onClick={() =>
                      setNewVideos((prev) =>
                        prev?.filter((a: any) => a?.name !== video?.name)
                      )
                    }
                  >
                    <TrashIcon className="h-4 w-4 cursor-pointer " />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {item?.description ? (
        <div className="col-span-12 sm:col-span-12">
          <div className="text-lg font-TTHovesDemiBold">Guidelines:</div>
          <div className="text-sm font-TTHovesRegular">{item?.description}</div>
        </div>
      ) : null}
      {item?.numberOfVideos > videos?.length + newVideos?.length ? (
        <div className="col-span-12 sm:col-span-12">
          <div className="grid grid-cols-12">
            <Input
              type="file"
              accept="video/*"
              ref={inputRef}
              className="hidden"
              multiple={false}
              onChange={handleFileChange}
            />
            {item?.numberOfVideos > videos?.length + newVideos?.length
              ? Array(item?.numberOfVideos)
                  .fill(1)
                  ?.map((video, i) =>
                    [...videos, ...newVideos].length &&
                    [...videos, ...newVideos][i] ? null : (
                      <div
                        key={i}
                        className="col-span-12 sm:col-span-12 gap-6 mb-3"
                      >
                        <Button
                          variant="destructive"
                          onClick={() => {
                            if (inputRef?.current) {
                              setActiveUpload(item?.videosLabels[i] || "Skill");
                              inputRef?.current?.click();
                            }
                          }}
                        >
                          {isUploadingNewVideo &&
                          (item?.videosLabels[i] || "Skill") ===
                            activeUpload ? (
                            <div className="flex flex-row items-center justify-center text-sm font-TTHovesRegular">
                              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </div>
                          ) : (
                            `Upload ${
                              item?.videosLabels?.length
                                ? item?.videosLabels[i]
                                : "Skill"
                            } Video`
                          )}
                        </Button>
                      </div>
                    )
                  )
              : null}
          </div>
        </div>
      ) : null}
      {videos?.length ? (
        <div className="col-span-12">
          <div className="text-base font-TTHovesDemiBold">
            Request Verification
          </div>
          <div className="grid grid-cols-12 gap-12 mt-2">
            <div className="col-span-6 sm:col-span-6">
              <ComboBoxCard
                valueKey="value"
                displayKey="label"
                IdKey="label"
                label=""
                id="camps"
                placeholder="Select Camp"
                isOpen={openCamp}
                scrollAreaClass="h-72"
                hasSearch
                onClose={() => setOpenCamp(!openCamp)}
                items={camps}
                selectedValue={selectedCamp}
                onSelectValue={(item) => {
                  setSelectedCamp({ label: item?.label, value: item?.value });
                }}
              />
            </div>
            <div className="col-span-4 sm:col-span-6 self-center">
              <Button
                size="default"
                variant="destructive"
                className="w-full"
                onClick={async () => {
                  try {
                    setLoadingRequest(true);
                    await createVerificationRequest({
                      variables: {
                        data: {
                          skill: { connect: { id: skillData?.id } },
                          camp: { connect: { id: selectedCamp?.value } },
                          user: { connect: { id: userId } },
                        },
                      },
                    });
                    refetch();
                    setSelectedCamp({});
                  } catch (error) {
                  } finally {
                    setLoadingRequest(false);
                  }
                }}
              >
                {loadingRequest ? "Sending Request..." : "Request"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      {verificationData?.skillVerificationRequests?.length ? (
        <div className="col-span-12">
          <div className="text-base font-TTHovesDemiBold mb-2">Requests</div>
          {verificationData?.skillVerificationRequests?.map((request: any) => {
            return (
              <div key={request?.id} className="flex flex-row">
                <div>
                  <div className="text-sm font-TTHovesRegular">
                    {request?.camp?.name}
                  </div>
                  <div className="text-sm font-TTHovesRegular">
                    {request?.verified ? "Verified on " : "Requested on "}
                    {formatDate(
                      !request?.verified
                        ? request?.createdAt
                        : request?.dateOfVerfication || new Date()
                    )}
                  </div>
                </div>
                <div className="flex flex-row items-center text-sm font-TTHovesRegular ml-auto">
                  <div>{request?.verified ? "Verified" : "Pending"}</div>
                  {request?.verified ? <VerifiedIcon className="ml-3" /> : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      <div className="col-span-12">
        <Button
          className="mt-5 w-full"
          size="default"
          variant="destructive"
          onClick={handleSubmit}
        >
          {isSubmiting ? "Uploading..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

const AthleteSkill: FC<AthleteSkillProps> = ({ params, searchParams }) => {
  // const [status, setStatus] = useState<string>("");
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [videos, setVideos] = useState<string[]>();
  const [skillId, setSkillId] = useState<string | null>("");
  const [openSkillHistory, setOpenSkillHistory] = useState<string | null>("");
  const [openVideo, setOpenVideo] = useState<boolean>(false);
  const [debounced] = useDebouncedValue(value, 300);

  const themeColor = UseThemeColor();
  const athleteId = searchParams?.athlete;

  const { data: athleteData, loading: loadingAthlete } =
    useGetAthleteProfileQuery({
      variables: {
        where: {
          id: athleteId,
        },
      },
    });

  const athleteProfile = athleteData?.athleteProfile;

  const { data, loading, fetchMore, refetch } = useGetAthleteSkillTypesQuery({
    variables: {
      where: {
        athleteId: { equals: athleteId },
      },
      whereSkillType: {
        OR: [
          { name: { contains: debounced, mode: QueryMode.Insensitive } },
          {
            secondFieldName: {
              contains: debounced,
              mode: QueryMode.Insensitive,
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

  const lastSkillTypeId = useMemo(() => {
    const lastPostInResults = data?.skillTypes[data?.skillTypes?.length - 1];
    return lastPostInResults?.id;
  }, [data?.skillTypes]);

  const fetchNext = () => {
    fetchMore({
      variables: {
        take: 10,
        skip: 1,
        cursor: {
          id: lastSkillTypeId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: GetAthleteSkillTypesQuery,
        { fetchMoreResult }
      ): GetAthleteSkillTypesQuery => {
        if (!fetchMoreResult || fetchMoreResult?.skillTypes?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.skillTypes;
          const fetchMorePosts = fetchMoreResult?.skillTypes;
          fetchMoreResult.skillTypes = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPrevious = () => {
    fetchMore({
      variables: {
        take: -10,
        skip: data?.skillTypes?.length,
        cursor: {
          id: lastSkillTypeId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: GetAthleteSkillTypesQuery,
        { fetchMoreResult }
      ): GetAthleteSkillTypesQuery => {
        if (!fetchMoreResult || fetchMoreResult?.skillTypes?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.skillTypes;
          const fetchMorePosts = fetchMoreResult?.skillTypes;
          fetchMoreResult.skillTypes = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const renderVideosModal = () => {
    return <MediaCard loading={loading} items={videos || []} type="video" />;
  };

  const renderItems = ({ item, id }: { item: any; id: any }) => {
    const fieldValues = item?.skills?.find((a: any) => a);

    const skillVerification = item?.skills
      .flatMap((skill: any) => skill?.skillVerificationRequests)
      ?.find((a: any) => a?.verified);

    const skillHistory = item?.skills.flatMap(
      (skill: any) => skill?.skillHistory
    );

    const skillItems = [
      {
        name: "Edit Skill",
        onClick: () => {
          setSkillId(item?.id);
        },
      },
    ];
    if (skillHistory?.length > 0) {
      skillItems.push({
        name: "View Skill History",
        onClick: () => {
          setOpenSkillHistory(fieldValues?.id);
        },
      });
    }

    return (
      <TableRow key={item?.id} className="w-full font-TTHovesRegular">
        <TableCell>
          <div className="text-base flex flex-row items-center justify-start">
            <span>{item?.name}</span>
            {item?.skills?.length > 0 && skillVerification ? (
              <VerifiedIcon className="ml-2 mt-[1px]" />
            ) : null}
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div className="">{fieldValues?.value}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div className="">{fieldValues?.secondValue}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div className="">{item?.unit}</div>
        </TableCell>
        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {formatDate(new Date(item?.createdAt), "MMMM dd yyyy")}
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div className="text-center flex flex-row justify-center items-center">
            {fieldValues?.videos?.length > 0 ? (
              <PlayIcon
                className="h-5 w-5 cursor-pointer"
                color={themeColor === "dark" ? "#fafafa" : "#0a0a0a"}
                onClick={() => {
                  setVideos(fieldValues?.videos);
                  setOpenVideo(true);
                }}
              />
            ) : null}
          </div>
        </TableCell>
        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <MenubarCard
              trigger={
                <Button size="icon" variant="outline">
                  <MoreHorizontalIcon className="cursor-pointer" />
                </Button>
              }
              items={skillItems}
            />
          </div>
        </TableCell>
        <ModalCard
          isModal={true}
          isOpen={openSkillHistory === fieldValues?.id}
          onOpenChange={() => {
            setOpenSkillHistory(null);
          }}
        >
          <RenderSkillHistory skillId={fieldValues?.id} athleteId={athleteId} />
        </ModalCard>
        <ModalCard
          isModal={true}
          isOpen={skillId === item?.id}
          onOpenChange={() => {
            setSkillId(null);
          }}
        >
          <RenderEditSkillModal
            item={item}
            athleteId={athleteId}
            onClose={() => setSkillId(null)}
            userId={athleteData?.athleteProfile?.userId}
            handleRefetch={() => refetch()}
          />
        </ModalCard>
      </TableRow>
    );
  };

  return (
    <main className="w-full h-full">
      <Button
        variant="destructive"
        className="mb-6"
        onClick={() => router.back()}
      >
        Go Back
      </Button>
      <div className="flex flex-col items-start">
        {loadingAthlete ? (
          <>
            <Skeleton className="w-[100px] h-[20px]" />
            <Skeleton className="w-[100px] h-[20px] mt-4" />
          </>
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <Title>
                {athleteProfile?.user?.firstname}{" "}
                {athleteProfile?.user?.surname}
              </Title>
            </div>
            <Text>@{athleteProfile?.user?.username}</Text>
            <Text>
              Class of:{" "}
              {athleteData?.athleteProfile?.graduationYear
                ? athleteData?.athleteProfile?.graduationYear
                : "N/A"}
            </Text>
            <Text>
              {athleteData?.athleteProfile?.position?.name} at{" "}
              {athleteData?.athleteProfile?.school?.name}
            </Text>
          </div>
        )}
      </div>
      <Separator className="my-6" />
      <div className="flex mt-6 gap-6 w-full justify-end">
        <div className="w-full md:w-1/2 order-2">
          <SearchInput
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type to search..."
          />
        </div>
      </div>
      <UniversalTable
        title="Athlete List"
        headerItems={headerItems}
        items={data?.skillTypes as any[]}
        loading={loading}
        renderItems={renderItems}
      />
      {loading || !data?.skillTypes?.length ? null : (
        <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
      )}
      <ModalCard
        isModal={true}
        isOpen={openVideo}
        onOpenChange={() => {
          setVideos([]);
          setOpenVideo(!openVideo);
        }}
      >
        {renderVideosModal()}
      </ModalCard>
    </main>
  );
};

export default observer(AthleteSkill);
