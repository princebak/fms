import Image from "next/image";
import React, { useState } from "react";
import TemplateImage from "../../TemplateImage";

const EditUserForm = ({ refreshData }: any) => {
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

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        imageTargetElement.src = e.target.result;
      };
      reader.readAsDataURL(imageFile);

      setFile(imageFile);
    }
  };

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
        <input className="form-control" type="file" id="formFile" />

        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter user name"
          required
        />
      </div>
    </div>
  );
};

export default EditUserForm;
