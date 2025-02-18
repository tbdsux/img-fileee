import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { readFile } from "fs/promises";
import { parseMarkdown } from "~/lib/marked";

const getTos = createServerFn().handler(async () => {
  const rs = await readFile("legal/tos.md");
  return rs.toString();
});

export const Route = createFileRoute("/terms-service/")({
  component: RouteComponent,
  loader: () => getTos(),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div className="py-12 w-5/6 mx-auto">
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: parseMarkdown(data) }}
      />
    </div>
  );
}
