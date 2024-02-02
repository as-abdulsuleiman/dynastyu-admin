/** @format */

import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReactPlayer from "react-player/lazy";
import { Icons } from "../Icons";

interface CarouselCardProps {
  videos: string[];
}

const CarouselCard: FC<CarouselCardProps> = ({ videos }) => {
  return (
    <Carousel opts={{ align: "center" }} className="w-full max-w-sm mx-auto">
      <CarouselContent>
        {videos?.map((val, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <ReactPlayer
                    key={index}
                    url={val}
                    controls
                    // width="100%"
                    // height="100%"
                    previewTabIndex={0}
                    fallback={<div>Loading...</div>}
                    // playing
                    light={false}
                    playIcon={<Icons.playCircle />}
                    // width={320}
                    // height={240}
                  />
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselCard;
