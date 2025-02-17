import { createServerFn } from "@tanstack/start";
import { AssetFile } from "./types";

export const saveAssetUploadToDB = createServerFn({
  method: "POST",
})
  .validator((data: AssetFile) => data)
  .handler(async (ctx) => {
    return {
      success: true,
      message: "Asset uploaded successfully",
    };
  });
