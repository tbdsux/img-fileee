import { useSession } from "@tanstack/start/server";
import { RecordModel } from "pocketbase";

export type AppSession = {
  token: string;
  data: RecordModel;
};

export const useAppSession = () => {
  // @ts-expect-error
  return useSession<AppSession>({
    password: process.env.SECRET_KEY!,
  });
};
