import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "@tanstack/react-router";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { TooltipProvider } from "./ui/tooltip";

const queryClient = new QueryClient();

export default function Providers(props: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>{props.children}</TooltipProvider>

        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
