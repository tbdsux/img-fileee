import { createFileRoute } from "@tanstack/react-router";
import ImageUploader from "~/modules/uploader/uploader";

export const Route = createFileRoute("/")({
  component: Home,
  ssr: false,
});

function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-12">
      <div className="text-center">
        <h1 className="text-3xl font-black">img-fileee</h1>

        <p className="text-muted-foreground">{">"} A free image hosting</p>
        <p className="text-muted-foreground">
          Upload / host images anonymously. No account required.
        </p>
      </div>

      <div className="w-full ">
        <ImageUploader />
      </div>
    </div>
  );
}
