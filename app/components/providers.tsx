import { ReactNode } from "@tanstack/react-router";
import { Toaster } from "./ui/sonner";

export default function Providers(props: { children: ReactNode }) {
  return (
    <>
      {props.children}

      <Toaster />
    </>
  );
}
