import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function App() {
  return (
    <ThemeProvider>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button onClick={() => alert("Button clicked!")}>Click me</Button>
      </div>
    </ThemeProvider>
  );
}
