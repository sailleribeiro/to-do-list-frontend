import { ThemeProvider } from "@/contexts/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { Tasks } from "./pages/task";
import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Tasks />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
