import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCurrentUser } from "~/auth/server-fn";
import MainLoginForm from "~/modules/index/login-form";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => {
    const session = await getCurrentUser();

    if (session) {
      throw redirect({
        to: "/d",
      });
    }
  },
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
