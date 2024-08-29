import { downloadFile } from "@/services/MyFileService";
import Image from "next/image";
import React from "react";

const DownloadButton = ({
  fileName,
  fileKey,
  downloadLink,
}: {
  fileName: string;
  fileKey: string;
  downloadLink: string;
}) => {
  const handleClick = async () => {
    try {
      /*   const blob: any = await fetch(`/api/downloadFile/${fileKey}/locally`);

      const urlCreator = window.URL || window.webkitURL;
      const blobUrl = urlCreator.createObjectURL(blob); */

      const a = document.createElement("a");
      a.href = downloadLink; // blobUrl
      a.download = fileName;
      a.target = "_blank";
      a.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(downloadLink); // blobUrl
      }, 100);

      alert(`File "${fileName}" downloaded successfully.`);
    } catch (error: any) {
      alert(`Error downloading file: ${error.message}`);
    }

    /*     const a = document.createElement("a");
    a.href = downloadLink;
    a.download = fileName;

    a.click();

    URL.revokeObjectURL(a.href); */
  };
  return (
    <a href={downloadLink} target="_blank">
      <Image
        width={30}
        height={30}
        src="/images/download.png"
        alt="Download"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
};

export default DownloadButton;
