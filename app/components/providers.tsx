import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "@tanstack/react-router";
import { Toaster } from "./ui/sonner";

const queryClient = new QueryClient();

export default function Providers(props: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}

      <Toaster />
    </QueryClientProvider>
  );
}
