"use client";

import React, { useEffect, useState } from "react";
import EditUserForm from "@/app/components/modal/forms/EditUserForm";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import UserLogButton from "../UserLogButton";
import { useSelector } from "react-redux";

const EditUserModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.user);
  const [isUserProfileDefdault, setIsUserProfileDefdault] = useState(false);
  const currentPath = usePathname();

  const toggleModal = (e: any | undefined) => {
    if (e) {
      e.preventDefault();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isUserProfileDefdault) {
      const profilePic: any = document.getElementById("profilePic");
      console.log("profilePic <<", profilePic.id);
      profilePic.src = "/images/default_user.png";
    }
  }, [isUserProfileDefdault]);

  return (
    <>
      <div className="d-flex gap-2 justify-content-center align-items-center">
        {currentUser ? (
          <a
            href="#"
            className="d-flex gap-1 justify-content-center align-items-center text-white "
            onClick={(e) => toggleModal(e)}
          >
            {isOpen ? (
              <div className="userZoneImage ">
                <Image
                  id="profilePic"
                  className="bi d-block mx-auto mb-1 rounded-circle avatar-sm"
                  width="100"
                  height="100"
                  src={`/images/arrow-up.png`}
                  alt="Image"
                />
              </div>
            ) : (
              <div className="userZoneImage ">
                <Image
                  id="profilePic"
                  className="bi d-block mx-auto mb-1 rounded-circle avatar-sm"
                  width="100"
                  height="100"
                  src={`/images/arrow-down.png`}
                  alt="Image"
                />
              </div>
            )}

            {/*  <Image
              id="profilePic"
              className="bi d-block mx-auto mb-1 rounded-circle avatar-sm"
              width="100"
              height="100"
              src={`/api/downloadFile/${currentUser?._id}`}
              onError={() => setIsUserProfileDefdault(true)}
              alt="Image"
            /> */}
            <div className="userZoneImage ">
              <Image
                id="profilePic"
                className="bi d-block mx-auto mb-1 rounded-circle avatar-sm"
                width="100"
                height="100"
                src={"/images/default_user.png"}
                alt="Image"
              />
            </div>

            {currentUser?.name}
          </a>
        ) : (
          "Login"
        )}

        <UserLogButton currentUser={currentUser} />
      </div>

      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
              style={{ boxShadow: "0 0 40px gray" }}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <EditUserForm />{" "}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 d-flex justify-content-between ">
                {currentPath != "/dashboard" ? (
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={(e: any) => {
                      toggleModal(e);
                      router.push("/dashboard");
                    }}
                  >
                    Dashboard
                  </button>
                ) : (
                  <label>{""}</label>
                )}

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUserModal;
