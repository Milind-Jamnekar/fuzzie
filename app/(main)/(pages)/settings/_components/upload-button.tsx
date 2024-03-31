"use client"; // is needed only if you’re using React Server Components
import * as LR from "@uploadcare/blocks";
import { useRef } from "react";

LR.registerBlocks(LR);

function UploadButton({ onUpload }: { onUpload: () => void }) {
  const ref = useRef();
  return (
    <div>
      <lr-config ctx-name="my-uploader" pubkey="d0003205148ad12fdf04" />
      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css`}
      />
    </div>
  );
}

export default UploadButton;
