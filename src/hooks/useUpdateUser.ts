import type { User } from "@/@types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<User, Error, User>({
    mutationFn: async (updatedUser) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar o utilizador");
      }

      return response.json();
    },

    onSuccess: (updatedUser) => {
      queryClient.setQueryData<User[]>(["users"], (oldUsers) => {
        if (!oldUsers) return [];

        return oldUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      });
    },
  });
}
