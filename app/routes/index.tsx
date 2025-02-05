import { createFileRoute } from "@tanstack/react-router";
import MainLoginForm from "~/modules/index/login-form";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen py-24">
      <div className="space-y-12 w-full">
        <div className="text-center">
          <h1 className="text-3xl font-black">fileee</h1>
          <p className="text-lg">Personal file hosting</p>
        </div>

        <MainLoginForm />
      </div>
    </div>
  );
}
