import type { User } from "@/@types/user";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

export const useUsers = () => {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return { users: data, isLoading, error };
};
