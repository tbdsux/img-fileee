import { S3Client } from "@aws-sdk/client-s3";

export const cdnConfig = {
  CDN_CLOUDFLARE: process.env.CDN_CLOUDFLARE_URL!, // personal setup Cloudflare CDN
  DEFAULT_BUCKET: process.env.B2_BUCKET_NAME, //
};

export const s3Client = new S3Client({
  endpoint: process.env.B2_S3_ENDPOINT,
  region: process.env.B2_REGION,
  credentials: {
    accessKeyId: process.env.B2_APPLICATION_KEY_ID!,
    secretAccessKey: process.env.B2_APPLICATION_KEY!,
  },
});
