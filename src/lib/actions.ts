/** @format */

"use client";

import { useState } from "react";
import {
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  ref,
} from "firebase/storage";
import { firebaseApp } from "@/services/firebase/config";
import { useProcessVideoMutation } from "@/services/graphql";
import { useToast } from "@/hooks/use-toast";

const uploadBucket = getStorage(firebaseApp, "gs://dynastyu-files");
const readBucket = getStorage(firebaseApp, "gs://dynastyu-9de03.appspot.com");

type useStorageProps = {
  file?: Blob | Uint8Array | ArrayBuffer | null;
  fileName?: string;
  userId: number;
  folder: string;
};
export const useGoogleCloudStorage = ({ folder, userId }: useStorageProps) => {
  const { toast } = useToast();
  //   const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number | null>(0);
  const [processVideo] = useProcessVideoMutation();

  const getErrorMessage = (message: string) => {
    return toast({
      title: "Invalid File",
      description: message,
      variant: "destructive",
    });
  };

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
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        switch (error?.code) {
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
      }
      //   () => {
      //     // Handle successful uploads on complete
      //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //       setUrl(downloadURL)
      //     }).catch((error) => {
      //         setUploading(false);
      //         switch (error.code) {
      //           case "storage/object-not-found":
      //             getErrorMessage(`File doesn't exist`);
      //             // File doesn't exist
      //             break;
      //           case "storage/unauthorized":
      //             getErrorMessage(
      //               `User doesn't have permission to access the object`
      //             );
      //             // User doesn't have permission to access the object
      //             break;
      //           case "storage/canceled":
      //             getErrorMessage("User canceled the upload");
      //             // User canceled the upload
      //             break;
      //           // ...
      //           case "storage/unknown":
      //             getErrorMessage(
      //               "Unknown error occurred, inspect the server response"
      //             );
      //             // Unknown error occurred, inspect the server response
      //             break;
      //         }
      //       });
      //   }
    );
    await uploadTask;
    const url = await getDownloadURL(uploadTask.snapshot.ref);

    let job;
    let newUrl = "";

    if (type === "video") {
      if (process?.env?.NODE_ENV === "production") {
        job = await processVideo({
          variables: {
            data: { filePath: `Documents/${userId}/${folderName}/${fileName}` },
          },
        });
      }
      newUrl = url;
    } else {
      newUrl = url;
    }
    return {
      url: newUrl,
      aspectRatio: job?.data?.processVideo?.aspectRatio || 1,
      name: fileName,
    };
  };
  return { progress, uploadFiles };
};

