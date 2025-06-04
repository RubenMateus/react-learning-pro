import { vi, describe, it, expect } from "vitest";
import { fetchUser, fetchUsers } from "../userService";

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

    const result = await fetchUser("1");

    expect(result).toEqual({ ...mockUser });
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users/1"
    );
  });

  it("Should throw an error if id is not provided", async () => {
    await expect(fetchUser()).rejects.toThrowError("ID is required");
  });

  it("Should throw an error if fetch fails (non-ok response)", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchUser("2")).rejects.toThrowError(
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
