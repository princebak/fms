"use client";

import React, { useState } from "react";
import CreateFileForm from "@/app/components/modal/forms/CreateFileForm";
import CreateFolderForm from "@/app/components/modal/forms/CreateFolderForm";
import Accordion from "@/app/components/accordion/Accordion";
import { useSelector } from "react-redux";
import { subscriptionStatus } from "@/utils/constants";
import Link from "next/link";
import SubscribButton from "../SubscribButton";
import Image from "next/image";

const CreateFileModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentSubscription } = useSelector(
    (state: any) => state.subscription
  );

  const accordionItems = [
    {
      title: "New File",
      content: <CreateFileForm id={null} />,
    },
    {
      title: "New Folder",
      content: <CreateFolderForm />,
    },
  ];

  const toggleModal = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {currentSubscription?.status === subscriptionStatus.ACTIVE ? (
        <button className="btn btn-primary d-flex gap-1" onClick={toggleModal}>
          <div style={{ width: "25px", cursor: "pointer" }}>
            <Image src="/images/add.png" width={100} height={100} alt="add" />
          </div>

          <label style={{ cursor: "pointer" }}>Create new</label>
        </button>
      ) : (
        <SubscribButton />
      )}

      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
              style={{ boxShadow: "0 0 40px gray" }}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <Accordion items={accordionItems} />
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

export default CreateFileModal;
