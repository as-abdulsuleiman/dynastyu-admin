/** @format */

import { FC } from "react";
import Image from "next/image";

interface FlagProps {
  flag: string;
  alt: string;
}

const Flag: FC<FlagProps> = ({ flag, alt }) => {
  return (
    <Image
      alt={alt || "country_flag"}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
      quality={100}
      priority
      width={30}
      height={30}
      src={flag}
      className="h-[30px] w-[30px] rounded-full ml-auto object-cover"
    />
  );
};

export default Flag;
