"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserLogButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const toggleLogging = (e: any) => {
    e.preventDefault();
    setIsLoggedIn(!isLoggedIn);
    router.push("/login");
  };

  return (
    <Image
      className="bi d-block mx-auto mb-1 rounded-circle avatar-sm"
      width="100"
      height="100"
      src={`/images/${isLoggedIn ? "logout" : "login"}.png`}
      alt="Logout"
      style={{ width: "30px", height: "30px", cursor: "pointer" }}
      onClick={toggleLogging}
    />
  );
};

export default UserLogButton;
