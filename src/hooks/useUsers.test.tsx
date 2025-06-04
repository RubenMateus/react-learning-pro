import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUsers } from "./useUsers";
import { fetchUsers } from "@/services/userService";
import type { User } from "@/@types/user";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/userService");

function createWrapper() {
  const queryClient = new QueryClient();

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useUsers", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return users data when fetch is successful", async () => {
    const mockUsers = [
      { id: 1, name: "Alice" } as User,
      { id: 2, name: "Bob" } as User,
    ];

    vi.mocked(fetchUsers).mockResolvedValueOnce(mockUsers);

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {});

    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  // it("should set error when fetch fails", async () => {
  //   const error = new Error("Failed to fetch");
  //   vi.mocked(fetchUsers).mockRejectedValueOnce(error);

  //   const { result } = renderHook(() => useUsers(), {
  //     wrapper: createWrapper(),
  //   });

  //   await waitFor(() => result.current.error !== null);

  //   expect(result.current.users).toBeUndefined();
  //   // expect(result.current.isLoading).toBe(false);
  //   console.error(result.current); // Log the error for debugging
  // });

  it("should be loading initially", () => {
    vi.mocked(fetchUsers).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.users).toBeUndefined();
    expect(result.current.error).toBeNull();
  });
});
