/** @format */

import { FC, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

interface ProfileImageProps {
  imageUrl: string;
  alt: string;
}

const ProfileImage: FC<ProfileImageProps> = ({ imageUrl, alt }) => {
  const [loadingImage, setLoadingImage] = useState(true);
  return (
    <div className="relative">
      <AspectRatio ratio={16 / 16} className="cursor-pointer rounded-2xl">
        <Image
          onLoadingComplete={() => setLoadingImage(false)}
          priority
          fill
          sizes="100vw"
          quality={80}
          src={imageUrl as string}
          alt={alt || "_profile_image"}
          className={`border-[0.1px] rounded-2xl object-cover ${
            loadingImage ? "blur-sm " : "blur-none"
          }`}
        />
      </AspectRatio>
      {loadingImage || !imageUrl ? (
        <div className="absolute inset-0 bg-black backdrop-blur-lg opacity-50"></div>
      ) : null}
    </div>
  );
};

export default ProfileImage;
