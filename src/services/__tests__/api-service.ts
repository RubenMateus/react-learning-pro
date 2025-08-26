import { vi, describe, it, expect } from "vitest";
import { fetchUsers } from "../userService";
import { fetchById } from "../service";
import type { User } from "@/@types/user";

describe("fetchUser", () => {
  it("Should call fetch with correct url", async () => {
    const mockUser = {
      name: "Maria",
      email: "maria@example.com",
      phone: "1234567890",
      company: {
        name: "Tech Corp",
      },
    };

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    const result = await fetchById<User>("users", "1");

    expect(result).toEqual({ ...mockUser });
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users/1"
    );
  });

  it("Should throw an error if id is not provided", async () => {
    await expect(fetchById<User>("users", undefined)).rejects.toThrowError(
      "ID is required"
    );
  });

  it("Should throw an error if fetch fails (non-ok response)", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchById<User>("users", "2")).rejects.toThrowError(
      "Failed to fetch user with ID:2"
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users/2"
    );
  });
});

describe("fetchUsers", () => {
  it("Should return users", async () => {
    const mockUsers = [
      {
        name: "Maria",
        email: "maria@example.com",
        phone: "1234567890",
        company: {
          name: "Tech Corp",
        },
      },
    ];

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUsers),
    });

    const result = await fetchUsers();

    expect(result).toHaveLength(1);
  });
});
