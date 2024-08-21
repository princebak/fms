import { uploadAFile } from "@/services/AwsS3Service";
import React, { useState } from "react";

const CreateFileForm = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    //uploadAFile()
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
        <label style={{ color: "black" }}>Edit File</label>

        <button className="btn btn-primary">Save</button>
      </div>

      <div className="d-flex flex-column gap-2 p-2">
        <input className="form-control" type="file" id="formFile" />
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Rename the file here"
        />
      </div>
    </div>
  );
};

export default CreateFileForm;
