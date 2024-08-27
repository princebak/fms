"use server";

import MyFile from "@/models/MyFile";
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

  const files = await MyFile.find();
  const filesPerPage = getContentWithPagination(files);
  return dbObjectToJsObject(filesPerPage);
}
