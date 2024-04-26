/** @format */

import { FC, useState } from "react";
import ReactPlayer from "react-player/lazy";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Loader2Icon, PlayCircleIcon } from "../Icons";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";
import CardContainer from "../card-container";

interface MediaCardProps {
  items: string[];
  type: "video" | "image";
  caption?: string;
  loading?: boolean;
}

const MediaCard: FC<MediaCardProps> = ({
  loading,
  caption,
  items,
  type = "image",
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const renderSkeleton = () => {
    return (
      <div className="flex flex-col w-full h-fit">
        <Skeleton className="w-full min-h-[344px] xl:min-h-[742px] h-fit rounded-lg relative" />
        <Skeleton className="w-full h-[24px] mt-4" />
        <div className="absolute inset-0 flex flex-row items-center justify-center m-auto">
          <Loader2Icon className="h-10 w-10 animate-spin" />
        </div>
      </div>
    );
  };

  const renderVideoSection = (index: number, value: string) => {
    return (
      <AspectRatio ratio={16 / 16} className="cursor-pointer">
        <div className="flex items-center w-full h-full justify-center bg-background bg-opacity-30 backdrop-filter backdrop-blur-lg">
          <ReactPlayer
            key={index}
            url={value}
            controls
            width="100%"
            height="100%"
            previewTabIndex={0}
            fallback={
              <div className="flex flex-row items-center justify-center m-auto text-sm">
                Loading...
              </div>
            }
            // playing
            light={false}
            playIcon={<PlayCircleIcon />}
            // width={320}
            // height={240}
          />
        </div>
      </AspectRatio>
    );
  };

  const renderImageSection = (index: number, value: string) => {
    return (
      <AspectRatio ratio={16 / 16} className="cursor-pointer">
        <Image
          key={index}
          onLoad={() => setLoadingImage(false)}
          priority
          fill
          sizes="100vw"
          quality={100}
          src={value as string}
          alt="profile_picture"
          className={`rounded-2xl object-cover  relative  ${
            loadingImage ? "blur-sm " : "blur-none"
          }`}
        />
      </AspectRatio>
    );
  };

  return (
    <Carousel
      orientation="horizontal"
      opts={{ align: "center", loop: false }}
      className="w-full max-w-3xl mx-auto"
    >
      <CarouselContent className="min-h-[unset] h-full ">
        {loading ? (
          <>{renderSkeleton()}</>
        ) : (
          <>
            {items?.map((val, index) => {
              return (
                <CarouselItem key={index} className="">
                  {/* <Card className="p-2 border-0 lg:border"> */}
                  <CardContainer className="flex items-center justify-center p-1">
                    {type === "video" ? (
                      <>{renderVideoSection(index, val)}</>
                    ) : (
                      <>{renderImageSection(index, val)}</>
                    )}
                  </CardContainer>
                  {/* </Card> */}
                </CarouselItem>
              );
            })}
          </>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      {!loading ? <div className="text-base px-2 mt-4">{caption}</div> : null}
    </Carousel>
  );
};

export default MediaCard;
