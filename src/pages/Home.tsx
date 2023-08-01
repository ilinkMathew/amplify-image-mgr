import React, { useEffect, useState } from "react";
import { StorageManager, StorageImage } from "@aws-amplify/ui-react-storage";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, Storage } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import ListImage, { ImageListProp } from "./components/ListImage";
import { useLocation, useNavigate } from "react-router-dom";

export const history = {
  navigate: null,
  location: null,
};

function Home() {
  const { user } = useAuthenticator((context) => [context.user]);
  const [imageList, setImageList] = useState<ImageListProp[]>([]);
  const history = {
    navigate: useNavigate(),
    location: useLocation(),
  };

  useEffect(() => {
    Storage.list("image-uploads/", {
      pageSize: 50, // TO:DO To include pagination
    })
      .then((storageRes) => {
        setImageList(storageRes.results as ImageListProp[]);
      })
      .catch((err) => console.log(err));
  }, [imageList]);

  function handleUploadSuccess(fileName: string | undefined) {
    if (fileName) {
      setImageList([...imageList, { key: fileName }]);
    }
  }


  function handleLogout() {
    Auth.signOut().then((res) => {
      history.navigate("/auth", { replace: true });
    });
  }

  return (
    <div className="w-full h-full">
      <div className=" w-full bg-background h-16 flex flex-row justify-between">
        <div className=" w-12 h-12 bg-accent-color self-center m-5 rounded-[50%]"></div>
        <menu className="h-full self-center m-5">
          <button className="h-16 font-bold" onClick={handleLogout}>
            Logout
          </button>
        </menu>
      </div>
      <div className="w-full h-screen flex flex-column">
        <div className="w-16  bg-background h-full"> </div>
        <div className="w-full  overflow-y-auto">
          <div className="ml-16 mr-16 mt-8 bg-white">
            <StorageManager
              acceptedFileTypes={["image/*"]}
              accessLevel="public"
              path="image-uploads/"
              maxFileCount={1}
              isResumable
              onUploadSuccess={(file) => handleUploadSuccess(file.key)}
            />
          </div>
          <div className="ml-16 mr-16 mb-16 mt-8">
            <div className="columns-2 md:columns-3 lg:columns-4">
              {imageList && <ListImage imageList={imageList} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
