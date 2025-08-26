import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAlbumPhotos } from "@/hooks/useAlbumPhotos";
import { useUserAlbums } from "@/hooks/useUserAlbums";
import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";

export const Dropdowns = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [albumId, setAlbumId] = useState<string | undefined>(undefined);

  const { users } = useUsers();
  const { albums } = useUserAlbums(userId);
  const { photos, isLoading } = useAlbumPhotos(albumId);

  console.log("Selected User ID:", userId);
  console.log("Selected Album ID:", albumId);

  return (
    <div className="p-15">
      <h1 className="text-2xl font-bold mb-4">Dropdowns Malucas</h1>

      <div className="flex flex-row items-center gap-5">
        <Select
          value={userId}
          onValueChange={(userId) => {
            setUserId(userId);
            setAlbumId(undefined);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select User" />
          </SelectTrigger>
          <SelectContent>
            {users?.map((user) => (
              <SelectItem key={user.id} value={String(user.id)}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={albumId} onValueChange={setAlbumId} disabled={!userId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Album" />
          </SelectTrigger>
          <SelectContent>
            {albums?.map((album) => (
              <SelectItem key={album.id} value={String(album.id)}>
                {album.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!photos && isLoading && (
        <div className="mt-6 space-y-2">
          <Skeleton className="h-[40px] w-[1600px]" />
          <Skeleton className="h-[40px] w-[1600px]" />
          <Skeleton className="h-[40px] w-[1600px]" />
          <Skeleton className="h-[40px] w-[1600px]" />
          <Skeleton className="h-[40px] w-[1600px]" />
        </div>
      )}

      {photos && (
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titulo</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {photos?.map((photos) => (
                <TableRow key={photos.id}>
                  <TableCell>{photos.title}</TableCell>
                  <TableCell>
                    <Button variant="link">
                      <a
                        href={photos.thumbnailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                    </Button>
                  </TableCell>

                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
