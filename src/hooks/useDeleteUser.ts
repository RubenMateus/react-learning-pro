import type { User } from "@/@types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao apagar utilizador");
      }

      return;
    },

    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<User[]>(["users"], (users) => {
        return users?.filter((user) => user.id !== deletedId);
      });
    },
  });
};
