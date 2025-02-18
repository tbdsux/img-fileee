import { Link } from "@tanstack/react-router";
import { Separator } from "./ui/separator";

export default function AppFooter() {
  return (
    <footer className="flex items-center justify-center mt-24 py-12">
      <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground h-5">
        <div>
          <p>
            &copy; 2025 -{" "}
            <a
              href="https://www.tbdh.dev/"
              rel="noreferrer noopener"
              target="_blank"
            >
              TBDH.DEV
            </a>
          </p>
        </div>

        <Separator orientation="vertical" />

        <div>
          <Link to="/terms-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
