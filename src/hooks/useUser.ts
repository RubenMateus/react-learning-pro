import type { User } from "@/@types/user";
import { fetchById } from "@/services/service";
import { useQuery } from "@tanstack/react-query";

export const useUser = (id?: string) => {
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => fetchById<User>("users", id),
    enabled: !!id,
  });

  return { user: data, isLoading, error };
};
