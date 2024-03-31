import React from "react";
import UploadButton from "./upload-button";

function ProfileImage() {
  return (
    <div className="flex flex-col">
      <p className="text-lg">Profile picture</p>
      <div className="flex flex-col h-[30vh] justify-center items-center">
        <UploadButton onUpload={() => {}} />
      </div>
    </div>
  );
}

export default ProfileImage;
