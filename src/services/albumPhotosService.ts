import type { Photo } from "@/@types/photo";

export const fetchPhotosAlbum = async (albumId?: string): Promise<Photo[]> => {
  if (!albumId) {
    throw new Error("ID is required");
  }

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch photos for album with ID:${albumId}`);
  }

  return res.json();
};
