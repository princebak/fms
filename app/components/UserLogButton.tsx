"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const UserLogButton = ({ currentUser }: any) => {
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    if (currentUser) {
      signOut();
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="userZoneImage ">
      <Image
        className="bi d-block mx-auto mb-1 rounded-circle avatar-sm"
        width="100"
        height="100"
        src={`/images/${currentUser ? "logout" : "login"}.png`}
        alt="Logout"
        style={{cursor: "pointer" }}
        onClick={handleClick}
      />
    </div>
  );
};

export default UserLogButton;
