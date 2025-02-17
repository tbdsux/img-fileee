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
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
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
        <CardDescription>
          <p>View the uploaded files here</p>
          <p>
            * We do not store any record of the uploaded files, make sure to
            save the image urls you have uploaded.
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        {uploadedFiles.length > 0 ? (
          <ScrollArea className="pb-4">
            <div className="flex w-max space-x-2.5">
              {uploadedFiles.map((file) => (
                <div
                  key={file.key}
                  className="relative aspect-video w-72 h-72 group"
                >
                  <img
                    src={file.url}
                    alt={file.file.name}
                    sizes="(min-width: 640px) 640px, 100vw"
                    loading="lazy"
                    className="rounded-md object-cover absolute w-full h-full"
                  />

                  <div className="hidden group-hover:block absolute top-1 right-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="h-auto p-2 cursor-pointer"
                          variant={"outline"}
                          onClick={() => handleCopyImageUrl(file.url)}
                        >
                          <CopyIcon />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy image url</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
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
