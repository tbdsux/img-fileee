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
