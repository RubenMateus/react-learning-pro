import { useTheme } from "@/hooks/useTheme";
import { Nav } from "../components/Nav";
import { Button } from "@/components/ui/button";

export const About = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <Nav />
      <div>Hello, About</div>
      <div>Current theme: {theme}</div>
      <Button onClick={() => toggleTheme()}>Toggle Theme</Button>
    </div>
  );
};
