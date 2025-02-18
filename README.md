![Logo](./public/apple-touch-icon.png)

# img-fileee

An image hosting web service app.

## Develop

This app is built with:

- Tanstack Start
  - React Framework
- ShadCN UI
  - UI Framework

Services:

- Backblaze B2
  - Alternative S3 storage
- Hosted Cloudflare Worker proxy for B2

### Required Environment Variables

```sh
CDN_CLOUDFLARE_URL=b2-worker-domain

B2_BUCKET_NAME=bucket-name
B2_S3_ENDPOINT=b2-s3-endpoint
B2_REGION=b2-region

B2_APPLICATION_KEY_ID=app-key-id
B2_APPLICATION_KEY=app-key
```

### Develop

```
pnpm dev
```

### Docker Deploy

Simple docker and compose config files are available for self hosting.

```
docker compose up -d --build
```

### Cloudflare Worker

You need to deploy a worker to host for your private backblaze bucket (`B2_BUCKET_NAME`).
This is needed for `CDN_CLOUDFLARE_URL`

> Deploy your own instance:
> https://github.com/backblaze-b2-samples/cloudflare-b2

Currently the app / service is configured for `$host` deployment of the cloudflare worker proxy. Make sure to set this in `$BUCKET_NAME` config in the worker.

## Thanks

- https://github.com/sadmann7/file-uploader
  - For the file upload components / inspiration
