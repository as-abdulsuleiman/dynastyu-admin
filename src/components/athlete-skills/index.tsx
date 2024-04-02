/** @format */

"use client";

import {
  GetAthleteSkillTypesQuery,
  SortOrder,
  useGetAthleteSkillTypesQuery,
} from "@/services/graphql";
import { FC, useEffect, useMemo, useState } from "react";
import ContentHeader from "../content-header";
import { Separator } from "../ui/separator";
import SkillIcon from "@/components/Icons/skill";
import { SearchInput } from "../search-input";
import SelectCard from "@/components/select";
import { Grid } from "@tremor/react";
import UniversalTable from "../universal-table";
import Pagination from "../pagination";
import { TableCell, TableRow } from "../ui/table";
import MenubarCard from "../menubar";
import MoreHorizontal from "@/components/Icons/more-horizontal";
import PlayIcon from "@/components/Icons/play";
import TrashIcon from "@/components/Icons/trash";
import VerifiedIcon from "@/components/Icons/verified";
import UseThemeColor from "@/hooks/useThemeColor";
import ModalCard from "../modal";
import MediaCard from "../media-card";
import ComboBoxCard from "@/components/combobox-card";
import { Button } from "../ui/button";
import { observer } from "mobx-react-lite";

const filterItems = [
  { name: "Active", value: "Active" },
  { name: "Inactive", value: "Inactive" },
  { name: "Verified", value: "Verified" },
  { name: "Not Verified", value: "Not Verified" },
];

enum ModalEnum {
  OPTIONS = "Options",
}

const headerItems = [
  { name: "Skill Type" },
  { name: "Unit" },
  { name: "Value" },
  { name: "Second Field Value" },
  { name: "Videos" },
  { name: "Actions" },

  // { name: "Position" },
  // { name: "Status" },
  // { name: "Verified" },
  // { name: "Featured" },
];

interface AthleteSkillProps {
  params: {
    athlete: string;
  };
  searchParams: {
    athlete: number;
  };
}

const getFileName = (url: string) => {
  const splittedUrl = url.split("/");
  return splittedUrl[splittedUrl.length - 2];
};

const RenderEditSkillModal = ({ item }: { item: any }) => {
  const themeColor = UseThemeColor();
  const [openOption, setOpenOption] = useState<boolean>(false);
  const [openSecondOption, setOpenSecondOption] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedSecondOption, setSelectedSecondOption] = useState({});
  const [videos, setVideos] = useState<string[]>([]);
  const [newVideos, setNewVideos] = useState<string[]>([]);

  const skillData = item?.skills?.find((a: any) => a);

  useEffect(() => {
    if (skillData?.videos?.length) {
      setVideos(skillData?.videos);
    }
    if (skillData?.value) {
      setSelectedOption({ id: skillData?.value, label: skillData?.value });
    }
    if (skillData?.secondValue) {
      setSelectedSecondOption({
        id: skillData?.secondValue,
        label: skillData?.secondValue,
      });
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
  return (
    <div className="h-full w-full">
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
            selectedValue={selectedOption}
            onSelectValue={(item) => {
              setSelectedOption({ id: item?.id, label: item?.label });
            }}
            id="options"
            valueKey="id"
          />
        </div>
        {formattedSecondValueOptions?.length > 0 ? (
          <div className="col-span-12 sm:col-span-6">
            <ComboBoxCard
              displayKey="label"
              IdKey="label"
              label={item?.secondFieldName}
              isOpen={openSecondOption}
              onClose={() => setOpenSecondOption(!openSecondOption)}
              items={formattedSecondValueOptions}
              selectedValue={selectedSecondOption}
              onSelectValue={(item) => {
                setSelectedSecondOption({ id: item?.id, label: item?.label });
              }}
              id="secondValueOptions"
              valueKey="id"
            />
          </div>
        ) : null}
      </div>
      <div className="grid grid-cols-12 gap-6 py-2 mt-3">
        {videos?.length
          ? videos?.map((video: string, index: number) => {
              return (
                <div key={index} className="col-span-12 sm:col-span-12">
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
                    >
                      <TrashIcon
                        className="h-4 w-4 cursor-pointer "
                        onClick={() =>
                          setVideos((prev: any) =>
                            prev?.filter((a: string) => a !== video)
                          )
                        }
                      />
                    </Button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <div className="grid grid-cols-12 gap-6 py-2 mt-3">
        {item?.numberOfVideos > videos?.length + newVideos?.length
          ? Array(item?.numberOfVideos)
              .fill(1)
              ?.map((video, i) =>
                [...videos, ...newVideos].length &&
                [...videos, ...newVideos][i] ? null : (
                  <div key={i} className="col-span-12 sm:col-span-12">
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        // setNewVideos((prev) => [...prev, video])
                      }}
                    >
                      {`Upload ${
                        item?.videosLabels?.length
                          ? item?.videosLabels[i]
                          : "Skill"
                      } Video`}
                    </Button>
                  </div>
                )
              )
          : null}
      </div>
      <Button className="mt-5 w-full" size="default" variant="destructive">
        Save
      </Button>
    </div>
  );
};

const AthleteSkill: FC<AthleteSkillProps> = ({ params, searchParams }) => {
  const [status, setStatus] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [videos, setVideos] = useState<string[]>();
  const [skillId, setSkillId] = useState<string | null>("");
  const [openVideo, setOpenVideo] = useState<boolean>(false);
  const [openEditSkill, setOpenEditSkill] = useState<boolean>(false);
  const themeColor = UseThemeColor();
  const athleteId = searchParams?.athlete;

  const { data, loading, fetchMore, refetch } = useGetAthleteSkillTypesQuery({
    variables: {
      where: {
        athleteId: { equals: athleteId },
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
    skip: !athleteId,
  });

  const lastUserId = useMemo(() => {
    const lastPostInResults = data?.skillTypes[data?.skillTypes?.length - 1];
    return lastPostInResults?.id;
  }, [data?.skillTypes]);

  const fetchNext = () => {
    fetchMore({
      variables: {
        take: 10,
        skip: 1,
        cursor: {
          id: lastUserId,
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
          id: lastUserId,
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
    const skillItems = [
      {
        name: "Edit Skill",
        onClick: () => {
          setSkillId(item?.id);
        },
      },
    ];
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <div className="text-base flex flex-row items-center justify-start">
            <span>{item?.name}</span>
            {item?.skills?.length > 0 && skillVerification ? (
              <VerifiedIcon className="ml-2 mt-[1px]" />
            ) : null}
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div className="">{item?.unit}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div className="">{fieldValues?.value}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div className="">{fieldValues?.secondValue}</div>
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
                  <MoreHorizontal className="cursor-pointer" />
                </Button>
              }
              items={skillItems}
            />
          </div>
        </TableCell>
        <ModalCard
          isModal={true}
          isOpen={skillId === item?.id}
          onOpenChange={() => {
            setSkillId(null);
          }}
        >
          <RenderEditSkillModal item={item} />
        </ModalCard>
      </TableRow>
    );
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-row items-center">
        <ContentHeader
          title="Athlete Skills"
          subHeader="Skills Overview"
          icon={<SkillIcon className="h-5 w-5 ml-2 fill-foreground" />}
        />
      </div>
      <Separator className="my-6" />
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <SearchInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type to search..."
        />
        <SelectCard
          className="ring-0 bg-background dark:bg-dark-background"
          items={filterItems}
          selectedItem={status}
          onValueChange={(e) => {
            setStatus(e);
          }}
        />
      </Grid>
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
