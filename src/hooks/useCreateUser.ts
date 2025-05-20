import type { NewUser, User } from "@/@types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, NewUser>({
    mutationFn: async (newUser) => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar utilizador");
      }

      return response.json();
    },
    onSuccess: (createdUser) => {
      queryClient.setQueryData<User[]>(["users"], (oldUsers) => {
        return oldUsers ? [...oldUsers, createdUser] : [createdUser];
      });
    },
  });
};
