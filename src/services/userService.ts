import type { User } from "@/@types/user";

export const fetchUser = async (id?: string): Promise<User> => {
  if (!id) {
    throw new Error("ID is required");
  }

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch user with ID:${id}`);
  }

  return res.json();
};

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};
