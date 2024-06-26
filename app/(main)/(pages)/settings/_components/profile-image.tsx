"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import UploadButton from "./upload-button";

type Props = {
  userImage: string | null;
  onDelete?: any;
  onUpload: any;
};

const ProfilePicture = ({ userImage, onDelete, onUpload }: Props) => {
  const router = useRouter();

  const onRemoveProfileImage = async () => {
    const response = await onDelete();
    if (response) {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-lg text-white">Profile Picture</h3>
      <div className="flex flex-col items-ceter justify-center h-full ">
        {userImage ? (
          <>
            <Image
              src={userImage}
              alt="User_Image"
              height={400}
              width={700}
              className="rounded-2xl"
            />
            <Button
              variant="ghost"
              onClick={onRemoveProfileImage}
              className="mt-4"
            >
              <X className="mr-2 w-4 h-4" /> Remove profile
            </Button>
          </>
        ) : (
          <UploadButton onUpload={onUpload} />
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
