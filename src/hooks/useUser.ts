import type { User } from "@/@types/user";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (id?: string): Promise<User> => {
  if (!id) {
    throw new Error("ID is required");
  }

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return res.json();
};

export const useUser = (id?: string) => {
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });

  return { user: data, isLoading, error };
};
