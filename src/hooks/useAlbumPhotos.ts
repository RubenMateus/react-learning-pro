import type { Photo } from "@/@types/photo";
import { fetchPhotosAlbum } from "@/services/albumPhotosService";
import { useQuery } from "@tanstack/react-query";

export const useAlbumPhotos = (albumId: string | undefined) => {
  const { data, isLoading, error } = useQuery<Photo[]>({
    queryKey: ["photos", albumId],
    queryFn: () => fetchPhotosAlbum(albumId),
    enabled: !!albumId,
  });

  return { photos: data, isLoading, error };
};
