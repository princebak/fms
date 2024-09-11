// pages/api/uploadImage.ts
import { uploadAFile } from "@/services/AwsS3Service";
import { saveFileInfo } from "@/services/MyFileService";
import { fileStatus } from "@/utils/constants";
import { getFileExtension } from "@/utils/myFunctions";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    const userId = formData.get("userId");

    // Make all the check logics(size...) here on file if needed
    if (!file) {
      console.log("File not exist");
      return NextResponse.json({ error: "file is missing." }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = getFileExtension(file.name);
    const fileName = name ? `${name}.${extension}` : file.name;

    /** // TODO : UPDATE THIS FLOW FOR THE DIRECTORY MANAGEMENT
     * 1. save file info on my db and get the file _Id DONE
     * 2. use the _Id to upload the file to S3 DONE
     * 3. use the _Id to get the file downloadUrl from AWS S3 DONE
     * 4. update the the saved file info with the downloadUrl
     * 5. respond with a message and the downloadUrl
     */

    if (userId) {
      // the userId exists only on profile pic update
      const uploadAFileRes = await uploadAFile(buffer, userId, file.type);

      if (uploadAFileRes.error) {
        return NextResponse.json(
          { error: uploadAFileRes.error },
          { status: 400 }
        );
      }
    } else {
      const savingFileInfo: IMyFile = {
        name: fileName,
        type: file.type,
        extension: extension,
        size: file.size,
        isContainer: false,
        constainer: null,
        downloadUrl: null,
        contentNo: 0,
        visited: new Date(),
        status: fileStatus.CREATED,
      };
      const savedFileInfoRes = await saveFileInfo(savingFileInfo);
      if (savedFileInfoRes.error) {
        return NextResponse.json(
          { error: savedFileInfoRes.error },
          { status: 400 }
        );
      }

      const uploadAFileRes = await uploadAFile(
        buffer,
        savedFileInfoRes.id,
        file.type
      );

      if (uploadAFileRes.error) {
        return NextResponse.json(
          { error: uploadAFileRes.error },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { message: "File uploaded with success!" },
      { status: 200 }
    );
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
