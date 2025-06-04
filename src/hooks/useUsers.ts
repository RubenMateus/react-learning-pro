import type { User } from "@/@types/user";
import { fetchUsers } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return { users: data, isLoading, error };
};
