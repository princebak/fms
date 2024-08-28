"use server";

import MyFile from "@/models/MyFile";
import { fileStatus } from "@/utils/constants";
import { dbConnector } from "@/utils/dbConnector";
import {
  dbObjectToJsObject,
  getContentWithPagination,
} from "@/utils/myFunctions";

export async function saveFileInfo(myFile: IMyFile) {
  try {
    await dbConnector();

    const myFileModel = new MyFile(myFile);
    const savedFileInfo = await myFileModel.save();
    return { message: "File info saved", id: savedFileInfo._id.toString() };
  } catch (error: any) {
    return { error: error.message };
  }
}

// even for Delete and change last visited Date
export async function updateFileInfo(myFile: any) {
  console.log("myFile ", myFile);
  try {
    await dbConnector();

    const myFileModel = await MyFile.findByIdAndUpdate(myFile.id, myFile, {
      new: true,
    });
    return { message: "File info updated", data: myFileModel };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getAllFiles() {
  await dbConnector();

  const files = await MyFile.find({ status: { $ne: fileStatus.REMOVED } });
  const filesPerPage = getContentWithPagination(files);
  return dbObjectToJsObject(filesPerPage);
}

export async function findById(id: string) {
  await dbConnector();
  const fileInfo = await MyFile.findById(id);
  return dbObjectToJsObject(fileInfo);
}
