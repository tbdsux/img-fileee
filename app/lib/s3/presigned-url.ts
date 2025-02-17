import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createServerFn } from "@tanstack/start";
import { nanoid } from "nanoid";
import { cdnConfig, s3Client } from "./config";

async function getPresignedUrl(fileName: string, fileSize: number) {
  try {
    const fileKey = `${nanoid()}`;
    const newFilename =
      fileKey + "/" + encodeURI(fileName.replaceAll(" ", "_"));

    const command = new PutObjectCommand({
      Bucket: cdnConfig.DEFAULT_BUCKET,
      Key: newFilename,
      ContentLength: fileSize,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 }); // 15 minutes

    return {
      cdnUrl: cdnConfig.CDN_CLOUDFLARE + `/` + newFilename,
      newFilename,
      signedUrl,
      fileKey,
    };
  } catch (err) {
    console.error(err);

    return null;
  }
}

export const generatePresignedUrl = createServerFn({
  method: "POST",
})
  .validator((data: { fileName: string; fileSize: number }) => data)
  .handler(async (ctx) => {
    const { fileName, fileSize } = ctx.data;

    return await getPresignedUrl(fileName, fileSize);
  });
