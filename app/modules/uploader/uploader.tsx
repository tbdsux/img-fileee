import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloudIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { useUpload } from "~/hooks/use-upload";
import { cn } from "~/lib/utils";
import { FileUploader } from "./file-uploader";
import { UploadedFilesCard } from "./uploaded-files-card";

const uploadSchema = z.object({
  images: z.array(z.instanceof(File)),
});

type UploadSchema = z.infer<typeof uploadSchema>;

const ImageUploader = (props: { className?: string }) => {
  const {
    handleUpload,
    progresses,
    isUploading,
    failedUploads,
    successfulUploads,
    isDoneUploading,
    resetUpload,
  } = useUpload({
    async onFileUploadFinish(file, data) {
      toast.success(`File ${file.file.name} uploaded successfully.`);
    },
    onFileUploadFail(file, err) {
      toast.error(`File ${file.name} failed to upload. Reason: ${err.message}`);
    },
  });

  const form = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      images: [],
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const watchImages = form.watch("images");

  const onSubmit = async (data: UploadSchema) => {
    const process = toast.loading("Uploading files...");
    setIsLoading(true);

    try {
      await handleUpload(data.images, {});

      form.reset();
      resetUpload();
    } catch (err) {
      setIsLoading(false);
      console.error(err);

      toast.error("An error occurred while uploading files.", {
        id: process,
      });
      return;
    }

    setIsLoading(false);
    toast.success("Files uploaded successfully.", { id: process });
  };

  useEffect(() => {
    if (failedUploads.length > 0) {
      toast.error(
        "The following files failed to upload: " +
          failedUploads.map((file) => file.name).join(", ")
      );
    }
  }, [failedUploads]);

  return (
    <div className={cn("w-5/6 mx-auto space-y-6", props.className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="images"
            disabled={
              isUploading ||
              (typeof isDoneUploading === "boolean" ? isDoneUploading : false)
            }
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    maxFileCount={Infinity}
                    progresses={progresses}
                    disabled={isUploading}
                  />
                </FormControl>
                <FormDescription>
                  * Do not upload any sensitive or personal information.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button
              type="submit"
              disabled={
                (watchImages ?? []).length === 0 || isLoading || isUploading
              }
              className="space-x-2 w-full"
            >
              <UploadCloudIcon className="h-4 w-4" />
              <span>{isLoading ? "Uploading..." : "Upload"}</span>
            </Button>
          </div>

          <div>
            {successfulUploads.length > 0 ? (
              <UploadedFilesCard uploadedFiles={successfulUploads} />
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
};
export default ImageUploader;
