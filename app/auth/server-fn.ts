import { createServerFn } from "@tanstack/start";
import { pb } from "~/lib/pb";
import { AppSession, useAppSession } from "./useAppSession";

export const loginFn = createServerFn()
  .validator((d: unknown) => d as { email: string; password: string })
  .handler(async ({ data }) => {
    const authData = await pb
      .collection("users")
      .authWithPassword(data.email, data.password);

    if (!pb.authStore.isValid) {
      console.log("here");
      return {
        error: true,
        userNotFound: true,
        message: "User not found",
      };
    }

    const session = await useAppSession();

    await session.update({
      token: authData.token,
      data: authData.record,
    });
  });

export const logoutFn = createServerFn().handler(async () => {
  pb.authStore.clear();

  const session = await useAppSession();

  await session.clear();
});

export const getCurrentUser = createServerFn().handler(async () => {
  const session = await useAppSession();

  if (!session.data.token) {
    return null;
  }

  console.log(session.data);

  return {
    ...session.data,
  } as AppSession;
});
