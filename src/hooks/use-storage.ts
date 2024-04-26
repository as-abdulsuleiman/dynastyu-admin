/** @format */

"use client";

import { useState, useEffect } from "react";
import {
  UploadTask,
  getDownloadURL,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { useToast } from "./use-toast";
import { projectStorage, firebaseApp } from "@/services/firebase/config";

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

  return { uploading, progress, url };
};
