import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { EmptyCard } from "~/components/empty-card";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { UploadedFile } from "~/hooks/use-upload";

interface UploadedFilesCardProps {
  uploadedFiles: UploadedFile[];
}

export function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
  const handleCopyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);

    toast.success("Image url copied to clipboard");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded files</CardTitle>
        <CardDescription>View the uploaded files here</CardDescription>
      </CardHeader>

      <CardContent>
        {uploadedFiles.length > 0 ? (
          <div className="grid grid-cols-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.key}
                className="relative aspect-video w-64 h-64 group"
              >
                <img
                  src={file.url}
                  alt={file.file.name}
                  sizes="(min-width: 640px) 640px, 100vw"
                  loading="lazy"
                  className="rounded-md object-cover overflow-hidden"
                />

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="hidden group-hover:block absolute top-1 right-1 h-auto p-2 cursor-pointer"
                      variant={"outline"}
                      onClick={() => handleCopyImageUrl(file.url)}
                    >
                      <CopyIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy image url</TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
        ) : (
          <EmptyCard
            title="No files uploaded"
            description="Upload some files to see them here"
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  );
}
