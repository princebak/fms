// pages/api/buffered-response.ts
import { getDownloadFileUrl } from "@/services/AwsS3Service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { id } }: any) {
  try {
    const { downloadUrl: url } = await getDownloadFileUrl(id);
    const blob = await fetch(url).then((response) => response.blob());

    // Create a new Response object with the Blob
    const blobResponse = new Response(blob, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="myLogo.png"`,
      },
    });

    // Return the BlobResponse wrapped in a NextResponse
    return blobResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
