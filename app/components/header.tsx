import { SiGithub } from "@icons-pack/react-simple-icons";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="">
        <Link to={"/"}>
          <h1 className="text-lg font-black text-primary">img-fileee</h1>
          <p className="text-sm text-muted-foreground">
            {">"} A free image hosting
          </p>
        </Link>
      </div>

      <div className="inline-flex items-center space-x-2">
        <Button
          asChild
          variant={"ghost"}
          className="h-auto p-2 transition-all duration-300"
        >
          <a
            href="https://github.com/tbdsux/img-fileee"
            rel="noreferrer noopener"
            target="_blank"
          >
            <SiGithub />
          </a>
        </Button>
      </div>
    </header>
  );
}
