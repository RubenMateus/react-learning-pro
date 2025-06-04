import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useUsers } from "@/hooks/useUsers";
import { Link } from "react-router-dom";

export const Users = () => {
  const { users, isLoading, error } = useUsers();
  const { mutate: deleteUser } = useDeleteUser();

  if (isLoading) return <p>Loading...</p>;
  if (error || !users) return <p>Error.</p>;

  return (
    <div>
      <Button asChild>
        <Link to={`/users/create`}>Create User</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>

              <TableCell>
                <Button asChild>
                  <Link to={`/users/${user.id}`}>Edit</Link>
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => deleteUser(user.id!)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
