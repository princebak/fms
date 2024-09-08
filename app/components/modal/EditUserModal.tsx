"use client"

import React, { useState } from "react";
import EditUserForm from "@/app/components/modal/forms/EditUserForm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserLogButton from "../UserLogButton";

const EditUserModal = ({ refreshData }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleModal = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="d-flex gap-2 justify-content-center align-items-center">
        <a
          href="#"
          className="d-flex gap-1 justify-content-center align-items-center text-white "
          onClick={toggleModal}
        >
          <Image
            className="bi d-block mx-auto mb-1 rounded-circle avatar-sm"
            width="100"
            height="100"
            src={"https://bootdey.com/img/Content/avatar/avatar3.png"}
            alt="Image"
          />
          Prince Ilunga
        </a>
        <UserLogButton />
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
              <div className="bg-gray-50 px-4 py-3 sm:px-6 d-flex justify-content-end ">
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
