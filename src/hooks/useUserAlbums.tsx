import type { Album } from "@/@types/album";
import { fetchUserAlbums } from "@/services/albumService";
import { useQuery } from "@tanstack/react-query";

export const useUserAlbums = (userId: string | undefined) => {
  const { data, isLoading, error } = useQuery<Album[]>({
    queryKey: ["albums", userId],
    queryFn: () => fetchUserAlbums(userId),
    enabled: !!userId,
  });

  return { albums: data, isLoading, error };
};
