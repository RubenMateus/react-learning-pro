import type { User } from "@/@types/user";
import { fetchUser } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useUser = (id?: string) => {
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });

  return { user: data, isLoading, error };
};
