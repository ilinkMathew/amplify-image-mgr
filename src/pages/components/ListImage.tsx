import React, { SetStateAction, Dispatch, useState } from "react";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { BsLink } from "react-icons/bs/";

import "@aws-amplify/ui-react/styles.css";
import { Button, Alert, Placeholder } from "@aws-amplify/ui-react";
import { Storage } from "aws-amplify";
type ImageListProp = {
  eTag?: string;
  key: string;
  lastModified?: Date;
  size?: number;
};

function copyLink(
  imgKey: string,
  setSuccess: Dispatch<SetStateAction<boolean>>
) {
  Storage.get(imgKey)
    .then((res) => {
      const imageUrl = res
      setSuccess(true);
      navigator.clipboard.writeText(imageUrl);
      setTimeout(() => setSuccess(false), 500);
    })
    .catch((err) => {
      console.error(err);
    });
}

function ListImage({ imageList }: { imageList: ImageListProp[] }) {
  const [showSuccess, setSuccess] = useState(false);
  const list = imageList.map((img, index) => (
    <div className="relative" key={index}>
      <div className="absolute right-2 top-2 bg-accent-color ">
        <Button variation="link" onClick={() => copyLink(img.key, setSuccess)}>
          <BsLink width={30} height={30} />
        </Button>
      </div>

      <StorageImage alt={img?.key} imgKey={img?.key} accessLevel="public" />
    </div>
  ));
  return (
    <div>
      {showSuccess && (
        <div className="absolute z-10 top-20 right-2">
          <Alert variation="success">link Copied</Alert>
        </div>
      )}
      {list}
    </div>
  );
}

export default ListImage;
export type { ImageListProp };
