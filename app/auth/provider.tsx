import { ReactNode } from "@tanstack/react-router";
import { createContext } from "react";
import { AppSession } from "./useAppSession";

const authContext = createContext<{ session?: AppSession }>({
  session: undefined,
});

export default function AuthProvider(props: {
  children: ReactNode;
  session?: AppSession;
}) {
  return (
    <authContext.Provider value={{ session: props.session }}>
      {props.children}
    </authContext.Provider>
  );
}
