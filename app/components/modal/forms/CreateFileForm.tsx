import { findById, updateFileInfo } from "@/services/MyFileService";
import { fileStatus } from "@/utils/constants";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CreateFileForm = ({ id, closeModal, refreshData }: any) => {
  const [file, setFile] = useState<File>();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const closeModalAndReload = () => {
    closeModal();
    refreshData();
  };

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
        closeModalAndReload();
      }
    } else {
      if (id) {
        // Rename the file
        const res = await updateFileInfo({ id: id, name: name });
        if (res.error) {
          setMessage("Bad request.");
        } else {
          setMessage("File renamed with success !!");
          closeModalAndReload();
        }
      } else {
        setTimeout(() => {
          setMessage("File don't exist !");
        });
      }
    }

    setIsLoading(false);
  };

  const handleDelete = async (e: any) => {
    setIsLoading(true);
    const res = await updateFileInfo({ id: id, status: fileStatus.REMOVED });
    if (res.error) {
      setMessage("Bad request.");
    } else {
      setMessage("File deleted sucessfully !!");
      closeModalAndReload();
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const loadFilInfo = async () => {
      if (id) {
        const fileInfo = await findById(id);
        if (fileInfo) {
          setName(fileInfo.name);
        }
      }
    };
    loadFilInfo();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {message ? <label>{message}</label> : ""}

      <div
        className="bd-example d-flex flex-column gap-2"
        style={{ border: "solid 1px #ddd", borderRadius: "5px" }}
      >
        <div
          className="d-flex justify-between flex-wrap p-2"
          style={{ borderBottom: "solid 1px #ddd" }}
        >
          <label style={{ color: "black" }}>Edit File</label>

          {isLoading ? (
            <label>Loading...</label>
          ) : (
            <div className="d-flex justify-content-between gap-2">
              {id ? (
                <button onClick={handleDelete} className="btn btn-danger">
                  Delete
                </button>
              ) : (
                <></>
              )}
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          )}
        </div>

        <div className="d-flex flex-column gap-2 p-2">
          {id ? (
            <></>
          ) : (
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={(e: any) => setFile(e.target.files[0])}
            />
          )}

          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Rename the file here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>
    </form>
  );
};

export default CreateFileForm;
