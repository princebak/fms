import React from "react";

const CreateFolderForm = () => {
  return (
    <div
      className="bd-example d-flex flex-column gap-2"
      style={{ border: "solid 1px #ddd", borderRadius: "5px" }}
    >
      <div
        className="d-flex justify-between p-2"
        style={{ borderBottom: "solid 1px #ddd" }}
      >
        <label style={{ color: "black" }}>Edit Folder</label>

        <button className="btn btn-primary">Save</button>
      </div>

      <div className="d-flex flex-column gap-2 p-2">
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter Folder name"
        />
      </div>
    </div>
  );
};

export default CreateFolderForm;
