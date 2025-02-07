import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { getCurrentUser, logoutFn } from "~/auth/server-fn";

export const Route = createFileRoute("/d")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const session = await getCurrentUser();

    if (!session) {
      throw redirect({
        to: "/",
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }

    return session;
  },
});

function RouteComponent() {
  const router = useRouter();
  const ctx = Route.useRouteContext();

  return (
    <div>
      Hello "/d"! {JSON.stringify({ data: ctx })}
      <div>
        <button
          onClick={async () => {
            await logoutFn();
            router.navigate({ to: "/" });
          }}
        >
          log out
        </button>
      </div>
    </div>
  );
}
