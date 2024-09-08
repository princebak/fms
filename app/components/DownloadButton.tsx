"use client"

import Image from "next/image";
import React, { useState } from "react";
import Loader from "./Loader";

const DownloadButton = ({
  fileName,
  downloadLink,
}: {
  fileName: string;
  downloadLink: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      console.log("Downloading :", downloadLink);
      setIsLoading(true);
      const response = await fetch(downloadLink);
      const arrayBuffer = await response.arrayBuffer();
      const theType = response.headers.get("content-type") as string;
      const blob = new Blob([arrayBuffer], { type: theType });

      // Create a link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;

      // Trigger the download
      link.click();

      // Clean up
      URL.revokeObjectURL(link.href);
      setIsLoading(false);
    } catch (error: any) {
      console.log(`Error downloading file: ${error.message}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Image
          width={30}
          height={30}
          src="/images/download.png"
          alt="Download"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      )}
    </>
  );
};

export default DownloadButton;
