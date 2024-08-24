import React, { useState } from "react";

const CreateFileForm = () => {
  const [file, setFile] = useState<File>();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);

      const uploadRes = await fetch("/api/uploadFile", {
        method: "POST",
        body: formData,
      });

      const data = await uploadRes.json();
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage("File uploaded successfully !");
      }

      console.log("IMyfile >>", data);
    } else {
      setTimeout(() => {
        setMessage("File don't exist !");
      });
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>{message}</label>

      <div
        className="bd-example d-flex flex-column gap-2"
        style={{ border: "solid 1px #ddd", borderRadius: "5px" }}
      >
        <div
          className="d-flex justify-between p-2"
          style={{ borderBottom: "solid 1px #ddd" }}
        >
          <label style={{ color: "black" }}>Edit File</label>

          {isLoading ? (
            <label>Loading...</label>
          ) : (
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          )}
        </div>

        <div className="d-flex flex-column gap-2 p-2">
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={(e: any) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Rename the file here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

export default CreateFileForm;
