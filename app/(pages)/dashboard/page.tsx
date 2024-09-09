import DashboardPage from "@/app/components/DashboardPage";
import React from "react";
import {
  getAllFiles,
  getRecentFiles,
  updateFileInfo,
} from "@/services/MyFileService";

export const metadata = {
  title: "FMS | Dashboard",
};

const page = () => {
  return (
    <DashboardPage
      getAllFiles={getAllFiles}
      getRecentFiles={getRecentFiles}
      updateFileInfo={updateFileInfo}
    />
  );
};

export default page;
