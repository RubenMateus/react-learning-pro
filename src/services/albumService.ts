import type { Album } from "@/@types/album";

export const fetchUserAlbums = async (userId?: string): Promise<Album[]> => {
  if (!userId) {
    throw new Error("ID is required");
  }

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/albums`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch albums for user with ID:${userId}`);
  }

  return res.json();
};
