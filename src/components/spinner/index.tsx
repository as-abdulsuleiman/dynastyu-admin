/** @format */

import React, { FC } from "react";
import Lottie from "lottie-react";

export type loaderTypes = keyof typeof animationList;

export interface LottieLoaderProps {
  animationType: loaderTypes;
}

export const animationList = {
  flickr: require("../animations/flickr-loading.json"),
  loading: require("../animations/loading.json"),
};

const Spinner: FC<LottieLoaderProps> = ({ animationType }) => (
  <Lottie
    animationData={animationList[animationType || "flickr"]}
    loop={true}
    autoPlay
    className="h-[250px] w-[250px]"
  />
);

export default Spinner;
