import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Users } from "../Users";
import { useUsers } from "@/hooks/useUsers";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { BrowserRouter } from "react-router-dom";

vi.mock("@/hooks/useUsers");
vi.mock("@/hooks/useDeleteUser");

describe("Users", () => {
  const mockUsers = [
    {
      id: 1,
      name: "Alice",
      email: "alice@mail.com",
      phone: "123",
      company: { name: "Company A" },
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@mail.com",
      phone: "456",
      company: { name: "Company B" },
    },
  ];

  beforeEach(() => {
    vi.mocked(useDeleteUser).mockReturnValue({
      mutate: vi.fn(),
    });
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    vi.mocked(useUsers).mockReturnValue({
      users: undefined,
      isLoading: true,
      error: null,
    });

    render(<Users />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(useUsers).mockReturnValue({
      users: undefined,
      isLoading: false,
      error: new Error("fail"),
    });

    render(<Users />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it("renders users table", () => {
    vi.mocked(useUsers).mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );

    expect(screen.getByText("Create User")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getAllByText("Edit")).toHaveLength(2);
    expect(screen.getAllByText("Delete")).toHaveLength(2);
  });

  it("calls deleteUser when Delete button is clicked", () => {
    const deleteUser = vi.fn();

    vi.mocked(useUsers).mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
    });

    vi.mocked(useDeleteUser).mockReturnValue({
      mutate: deleteUser,
    });

    render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);
    expect(deleteUser).toHaveBeenCalledWith(1);
  });

  it("renders Edit links with correct href", () => {
    vi.mocked(useUsers).mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );

    const editLinks = screen.getAllByText("Edit");
    expect(editLinks[0].closest("a")).toHaveAttribute("href", "/users/1");
    expect(editLinks[1].closest("a")).toHaveAttribute("href", "/users/2");
  });
});
