/** @format */

"use client";

import {
  ChangeEvent,
  ElementRef,
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "../ui/input";
import { useStorage } from "@/hooks/use-storage";
import { useToast } from "@/hooks/use-toast";
import { formatDate, getRandomString, noImage } from "@/lib/utils";
import Image from "next/image";
import { ProgressCircle } from "@tremor/react";
import { observer } from "mobx-react-lite";
import { Icons } from "../Icons";
import Resizer from "react-image-file-resizer";

interface AvatarUploaderProps {
  id?: string;
  storageLocation: string;
  error?: string;
  onUploadSuccess?: (downloadUrl: string | null) => void;
  imgUrl?: string;
  width?: number;
  height?: number;
}

const AvatarUploader: FC<AvatarUploaderProps> = ({
  storageLocation = "files",
  onUploadSuccess = () => ({}),
  id = "avatar",
  error,
  imgUrl,
  height,
  width,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [file, setFile] = useState<Blob | Uint8Array | ArrayBuffer | null>(
    null
  );
  const [fileName, setFileName] = useState("");
  const { progress, url, uploading } = useStorage({
    file,
    fileName,
    storageLocation,
  });

  useEffect(() => {
    if (url) {
      onUploadSuccess(url);
      // setLoading(true);
      setFile(null);
      setFileName("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [url, onUploadSuccess]);

  const types = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg+xml",
    "image/gif",
  ];

  const handleOnchangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.length) {
      const selectedFile = e?.target?.files[0];
      if (selectedFile) {
        if (types?.includes(selectedFile?.type)) {
          Resizer?.imageFileResizer(
            selectedFile,
            150,
            150,
            "JPEG",
            100,
            0,
            (uri) => {
              const fileName = `${selectedFile?.name}_${getRandomString(
                40
              )}_${formatDate(new Date(), "dddd_MMMM_yyyy_h:mm_a")}.jpg`;
              setFile(uri as File);
              setFileName(fileName);
            },
            "file",
            150,
            150
          );
        } else {
          setFile(null);
          toast({
            title: "Invalid File type",
            description:
              "Please choose a valid file type (png, jpeg, gif, svg+xml, or jpg)",
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <div className="relative">
      <div
        className="w-[120px] h-[120px] rounded-full relative border-[0.9px] shadow-xl"
        id={id}
      >
        {uploading ? (
          <ProgressCircle
            className="w-full h-full"
            value={progress || 0}
            size="lg"
            color="emerald"
            strokeWidth={6}
          >
            <span className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-[12px] text-white font-medium">
              {Math.floor(progress as number)}%
            </span>
          </ProgressCircle>
        ) : url ? (
          <Image
            src={url}
            alt="profile_url"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            quality={100}
            priority
            width={width || 120}
            height={height || 120}
            className={`absolute object-cover rounded-full w-full h-full ${
              loading ? "blur-sm " : "blur-none"
            }`}
            onLoad={() => setLoading(false)}
          />
        ) : (
          <Image
            src={imgUrl || noImage}
            alt="profile_url"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            quality={100}
            priority
            width={width || 120}
            height={height || 120}
            className={`absolute object-cover  rounded-full w-full h-full`}
          />
        )}
        <div className="z-10 absolute h-[32px] w-[32px] bg-primary rounded-full cursor-pointer ring-1 right-[5px] bottom-[5px]">
          <div
            className="flex items-center justify-center mt-[0px] ml-[0.5px] p-1"
            onClick={() => {
              if (inputRef?.current) {
                inputRef?.current.click();
              }
            }}
          >
            <Icons.camera className="stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
          </div>
        </div>
        <div>
          <Input
            id={id}
            name={id}
            ref={inputRef}
            type="file"
            accept="jpeg, png, gif, svg, jpg"
            className="hidden"
            onChange={handleOnchangeFile}
          />
        </div>
      </div>
      {error ? (
        <p className="text-red-500 text-xs   font-medium">{error}</p>
      ) : null}
    </div>
  );
};

export default observer(AvatarUploader);
