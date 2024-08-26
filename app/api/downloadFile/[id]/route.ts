// pages/api/uploadImage.ts
import { getDownloadFileUrl, uploadAFile } from "@/services/AwsS3Service";
import { NextResponse } from "next/server";

export async function GET(req: any, { params: { id } }: any) {
  try {
    const { downloadUrl } = await getDownloadFileUrl(id);

    return NextResponse.redirect(downloadUrl);
  } catch (e: any) {
    console.error(e);
    return NextResponse.redirect("/not-found");
  }
}
