"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const AWS_ACCESS_KEY_ID = "angoranj@gmail.com";
const AWS_SECRET_ACCESS_KEY = "!lejessismeT77";
const AWS_REGION = "us-east-2";
const AMAZON_S3_BUCKET_NAME = "fms";

const Bucket = AMAZON_S3_BUCKET_NAME;
const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadAFile(myFile: MyFile) {
  try {
    const res = await s3.send(
      new PutObjectCommand({ Bucket, Key: myFile.name, Body: myFile.content })
    );

    console.log("uploadAFile Res", res);

    return { message: "Files uploaded successfully" };
  } catch (error: any) {
    console.log("uploadAFile Error ", error);
    return { error: error.message };
  }
}

export async function downloadFile(key: string) {
  const command = new GetObjectCommand({ Bucket, Key: key });
  const src = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return { downloadUrl: src };
}
