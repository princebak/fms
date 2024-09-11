"use client";

import { AlertMessageClass } from "@/classes";
import { updateUser } from "@/services/UserService";
import { getFileExtension } from "@/utils/myFunctions";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader";
import AlertMessage from "../../AlertMessage";
import { loginSuccess } from "@/redux/slices/userSlice";

const EditUserForm = ({ closeModal }: any) => {
  const dispatch = useDispatch();
  const { data: session, update } = useSession();
  const { currentUser: userInStore } = useSelector((state: any) => state.user);
  const [currentUser, setCurrentUser] = useState(userInStore);
  const [currentUserUpdated, setCurrentUserUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<AlertMessageClass | null>(null);
  const [userProfileImage, setUserProfileImage] = useState<File | null>(null);

  // REGISTER FORM FIELDS INITIAL VALUES

  const initialValues = {
    id: currentUser?._id,
    name: currentUser?.name,
    phone: currentUser?.phone,
    address: currentUser?.address,
  };

  const [form, setForm] = useState(initialValues);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    let shouldUpdate = true;
    if (userProfileImage) {
      const formData = new FormData();
      formData.append("file", userProfileImage);
      formData.append("name", userProfileImage.name);
      formData.append("userId", currentUser?._id);

      const uploadRes = await fetch("/api/uploadFile", {
        method: "POST",
        body: formData,
      });

      let res = await uploadRes.json();
      if (res.error) {
        setMessage(res.error);
        shouldUpdate = false;
      } else {
        console.log("Image uploaded with succes !");
      }
    }

    if (shouldUpdate) {
      const res = await updateUser(form);
      if (res.error) {
        setMessage({ content: res.error, color: "alert-danger" });
      } else {
        setMessage({
          content: "User info updated with success.",
          color: "alert-success",
        });

        await update({
          ...session,
          user: {
            ...res,
          },
        });

        setCurrentUser(res);
        setCurrentUserUpdated(true);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    console.log("currentUser OK > ", currentUser);
    if (currentUserUpdated) {
      dispatch(loginSuccess(currentUser));
      closeModal();
      setCurrentUserUpdated(false);
    }
  }, [currentUserUpdated]);

  const handleChange = (e: any) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /*   const setDefaultImage = (imageId: string, defaultImagePath: string) => {
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

      setUserProfileImage(imageFile);
    }
  }; */

  return (
    <form
      className="bd-example d-flex flex-column gap-2"
      style={{ border: "solid 1px #ddd", borderRadius: "5px" }}
      onSubmit={handleSubmit}
    >
      <div
        className="d-flex justify-between p-2"
        style={{ borderBottom: "solid 1px #ddd" }}
      >
        <label style={{ color: "black" }}>Edit user Info</label>

        <div style={{ color: "gray" }}>
          {isLoading ? (
            <Loader />
          ) : (
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          )}
        </div>
      </div>

      <div className="d-flex flex-column gap-2 p-2">
        {message && (
          <AlertMessage content={message.content} color={message?.color} />
        )}

        {/*   <input
          name="file"
          className="form-control"
          type="file"
          id="file"
          onChange={(e: any) => setUserProfileImage(e.target.files[0])}
        /> */}

        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter your name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          className="form-control"
          id="phone"
          placeholder="Enter your phone"
          name="phone"
          required
          value={form.phone}
          onChange={handleChange}
        />

        <textarea
          rows={3}
          className="form-control"
          id="address"
          placeholder="Enter your address"
          name="address"
          required
          value={form.address}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default EditUserForm;
