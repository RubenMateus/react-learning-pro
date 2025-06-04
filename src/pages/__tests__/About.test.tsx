import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { useTheme } from "@/hooks/useTheme";
import { About } from "../About";

// Mock dependencies
vi.mock("@/hooks/useTheme");
vi.mock("@/components/Nav", () => ({
  Nav: () => <nav />,
}));

describe("About", () => {
  const toggleTheme = vi.fn();

  beforeEach(() => {
    vi.mocked(useTheme).mockReturnValue({
      theme: "light",
      toggleTheme,
    });
  });

  it("renders Nav component", () => {
    render(<About />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("displays the correct theme", () => {
    render(<About />);
    expect(screen.getByText(/Current theme: light/i)).toBeInTheDocument();
  });

  it("renders the hello message", () => {
    render(<About />);
    expect(screen.getByText("Hello, About")).toBeInTheDocument();
  });

  it("calls toggleTheme when button is clicked", () => {
    render(<About />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(button);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
