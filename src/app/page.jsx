import { ToggleTheme } from "@/components/ToggleTheme";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center gap-5">
      <h1>Hello, world!</h1>
      <ToggleTheme />
      <Button variant={`outline`}>Helleo</Button>
    </div>
  );
}
