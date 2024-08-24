"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const AWS_ACCESS_KEY_ID = "AKIA5V6I7K5GBOUDTHEN";
const AWS_SECRET_ACCESS_KEY = "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";
const AWS_REGION = "us-east-1";
const AMAZON_S3_BUCKET_NAME = "fsmstorage";

const Bucket = AMAZON_S3_BUCKET_NAME;
const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadAFile(myFile: any, key: any, contentType: string) {
  try {
    const res = await s3.send(
      new PutObjectCommand({
        Bucket,
        Key: key,
        Body: myFile,
        ContentType: contentType,
      })
    );

    return { message: "File uploaded successfully" };
  } catch (error: any) {
    console.log("uploadAFile Error ", error);
    return { error: error.message };
  }
}

// The key is the unique fileName for S3
export async function getDownloadFileUrl(key: string) {
  const command = new GetObjectCommand({ Bucket, Key: key });
  const src = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return { downloadUrl: src };
}
