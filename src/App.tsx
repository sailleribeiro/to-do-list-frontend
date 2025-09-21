import { ThemeProvider } from "@/contexts/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { Tasks } from "./pages/task";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Tasks />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
