/** @format */

"use client";

import { useState, useEffect } from "react";
import {
  UploadTask,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
  getStorage,
  ref,
} from "firebase/storage";
import { useToast } from "./use-toast";
import { projectStorage, firebaseApp } from "@/services/firebase/config";
import { useProcessVideoMutation } from "@/services/graphql";

const uploadBucket = getStorage(undefined, "gs://dynastyu-files");
const readBucket = getStorage(undefined, "gs://dynastyu-9de03.appspot.com");

type useStorageProps = {
  file?: Blob | Uint8Array | ArrayBuffer | null;
  fileName?: string;
  userId: number;
  folder: string;
};
export const useStorage = ({
  file,
  folder,
  userId,
  fileName,
}: useStorageProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState<boolean>(false);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState<number | null>(0);
  const [processVideo] = useProcessVideoMutation();

  let uploadTask: UploadTask | null;

  if (file) {
    const folderName = folder || "profile_files";
    const storageRef = ref(
      projectStorage,
      `Documents/${userId}/${folderName}/${fileName}`
    );
    uploadTask = uploadBytesResumable(storageRef, file);
  }
  const getErrorMessage = (message: string) => {
    return toast({
      title: "Invalid File",
      description: message,
      variant: "destructive",
    });
  };

  useEffect(() => {
    if (file && uploadTask) {
      uploadTask.on(
        "state_changed",
        (snapshot: {
          bytesTransferred: number;
          totalBytes: number;
          state: string;
        }) => {
          setUploading(true);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error: any) => {
          setUploading(false);
          switch (error.code) {
            case "storage/unauthorized":
              getErrorMessage(
                `User doesn't have permission to access the object`
              );
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              getErrorMessage("User canceled the upload");
              // User canceled the upload
              break;
            // ...
            case "storage/unknown":
              getErrorMessage(
                "Unknown error occurred, inspect the server response"
              );
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL((uploadTask as UploadTask).snapshot.ref)
            .then((url: string) => {
              setUrl(url);
              uploadTask?.cancel();
              uploadTask = null;
              setUploading(false);
              setProgress(0);
            })
            .catch((error) => {
              setUploading(false);
              switch (error.code) {
                case "storage/object-not-found":
                  getErrorMessage(`File doesn't exist`);
                  // File doesn't exist
                  break;
                case "storage/unauthorized":
                  getErrorMessage(
                    `User doesn't have permission to access the object`
                  );
                  // User doesn't have permission to access the object
                  break;
                case "storage/canceled":
                  getErrorMessage("User canceled the upload");
                  // User canceled the upload
                  break;
                // ...
                case "storage/unknown":
                  getErrorMessage(
                    "Unknown error occurred, inspect the server response"
                  );
                  // Unknown error occurred, inspect the server response
                  break;
              }
            });
        }
      );
    }
    return () => {
      if (file && uploadTask) {
        uploadTask.cancel();
        uploadTask = null;
      }
    };
  }, [file]);

  const uploadFiles = async (
    images?: File[],
    videos?: File[],
    // promise?: boolean,
    files?: File[]
  ) => {
    const imagesPromises = images?.map((image: any) => {
      return uploadFile(image, image?.name, "image");
    });
    const videosPromises = videos?.map((video: any) => {
      return uploadFile(video, video?.name, "video");
    });

    const filesPromises = files?.map((file: any) => {
      return uploadFile(file, file?.name, "file");
    });
    const imagesResult = images ? await Promise.all<any>(imagesPromises) : [];
    const filesResults = files ? await Promise.all<any>(filesPromises) : [];
    const videosResult = videos ? await Promise.all<any>(videosPromises) : [];

    const imagesUrls = imagesResult?.map((a: any) => a.url);
    const videosUrls = videosResult?.map((a: any) => a.url);
    const filesUrls = filesResults?.map((a: any) => ({
      url: a.url,
      name: a.name,
    }));
    const aspectRatios = videosResult?.map((a: any) => a.aspectRatio);
    // if (!promise) {
    //   onComplete(imagesUrls, videosUrls, aspectRatios, filesUrls)
    // }

    setProgress(0);
    return {
      images: imagesUrls,
      videos: videosUrls,
      videosAspectRatios: aspectRatios,
      files: filesUrls,
    };
  };

  const uploadFile = async (
    file: File,
    fileName?: string,
    type?: "image" | "video" | "file"
  ): Promise<any> => {
    const folderName = folder || "profile_files";
    const storageRef =
      type === "video"
        ? ref(uploadBucket, `Documents/${userId}/${folderName}/${fileName}`)
        : ref(readBucket, `Documents/${userId}/${folderName}/${fileName}`);
  
    await uploadBytes(storageRef, file);
    let url = "";
    let job;
    if (type === "video") {
      if (process?.env?.NODE_ENV === "production") {
        job = await processVideo({
          variables: {
            data: { filePath: `Documents/${userId}/${folderName}/${fileName}` },
          },
        });
      }
      // console.log("job", job?.data?.processVideo);
      // url = `https://storage.googleapis.com/dynastyu-9de03.appspot.com/Documents/${userId}/${folderName}/${fileName}/master.m3u8`;
      url = await getDownloadURL(storageRef);
    } else {
      url = await getDownloadURL(storageRef);
    }
    return {
      url,
      aspectRatio: job?.data?.processVideo?.aspectRatio || 1,
      name: fileName,
    };
  };
  return { uploading, progress, url, uploadFiles };
};
