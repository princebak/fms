import Image from "next/image";
import React, { useState } from "react";
import TemplateImage from "./TemplateImage";

const EditUserForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const setDefaultImage = (imageId: string, defaultImagePath: string) => {
    const image: any = document.getElementById(imageId);
    image.src = defaultImagePath;
  };

  const handleImageChange = (event: any, imageTargetId: string) => {
    const imageTargetElement: any = document.getElementById(imageTargetId);
    const imageFile = event.target.files[0];

    console.log("OB", { imageTargetElement, imageFile });
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        imageTargetElement.src = e.target.result;
      };
      reader.readAsDataURL(imageFile);

      setFile(imageFile);
    }
  };

  /* const handleSubmit = async (e: any) => {
    console.log("submitting ... ");
    e.preventDefault();

    setLoading(true);

    //Save Image here
    try {
      let newImagesPaths: ImagePath[] = [];
      let imagesPathsToAdd: ImagePath[] = [];

      for (const imagesFile of imagesFiles) {
        const formData = new FormData();

        formData.append("file", imagesFile.content);
        formData.append("upload_preset", "kosmos_event");
        // formData.append("public_id", `${imagesFile.name}`);

        console.log("upload image formData >> ", formData);

        const uploadResponse = await fetch(LINKS.COULDINARY_UPLOAD_LINK, {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        newImagesPaths = [
          ...newImagesPaths,
          { code: imagesFile.name, path: uploadData.secure_url },
        ];

        console.log("updateImages uploadData : ", uploadData);
      }
      for (const imagePath of newImagesPaths) {
        const existEventPath = event.imagesPaths.find(
          (eventImagePath: ImagePath) => imagePath.code == eventImagePath.code
        );
        if (!existEventPath) {
          imagesPathsToAdd = [...event.imagesPaths, imagePath]; // we add code and path
        } else {
          const deleteResponse = await fetch(LINKS.COULDINARY_UPLOAD_LINK, {
            method: "DELETE",
          });
          imagesPathsToAdd = event.imagesPaths.map((imageP: ImagePath) => {
            if (imageP.code == imagePath.code) {
              return { ...imageP, path: imagePath.path };
            } else {
              return imageP;
            }
          });
        }
      }

      console.log("Event update req >> ", event);
      const updatedEvent = await editEvent({
        ...event,
        imagesPaths: imagesPathsToAdd,
      });

      setImagesFiles(new Array<any>());

      dispatch(changeCurrentEvent(updatedEvent));

      dispatch(updateMessage("Event Images updated successfully"));
      router.push("/events");
    } catch (error) {
      console.log("Uploads error >> ", error);
      setError("Something bad happended");
    }

    setLoading(false);
  }; */

  return (
    <div
      className="bd-example d-flex flex-column gap-2"
      style={{ border: "solid 1px #ddd", borderRadius: "5px" }}
    >
      <div
        className="d-flex justify-between p-2"
        style={{ borderBottom: "solid 1px #ddd" }}
      >
        <label style={{ color: "black" }}>Edit user Info</label>
        <button className="btn btn-primary">Save</button>
      </div>

      <div className="d-flex flex-column gap-2 p-2">
        {/* <TemplateImage
          imageId="001"
          imagePath="/images/fsm_logo1.png"
          defaultImagePath="/images/fsm_logo1.png"
          imageStyle={{}}
          imageName="I001"
          setDefaultImageCallbak={setDefaultImage}
          handleImageChangeCallback={handleImageChange}
        /> */}

        <input className="form-control" type="file" id="formFile" />

        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter user name"
        />
      </div>
    </div>
  );
};

export default EditUserForm;
