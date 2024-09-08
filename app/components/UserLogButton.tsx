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
    <Image
      className="bi d-block mx-auto mb-1 rounded-circle avatar-sm"
      width="100"
      height="100"
      src={`/images/${currentUser ? "logout" : "login"}.png`}
      alt="Logout"
      style={{ width: "30px", height: "30px", cursor: "pointer" }}
      onClick={handleClick}
    />
  );
};

export default UserLogButton;
