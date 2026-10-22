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
import { ArrowUpRight, Plus, Users as UsersIcon } from "lucide-react";

export const Users = () => {
  const { users, isLoading, error } = useUsers();
  const {
    mutate: deleteUser,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteUser();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 text-center text-sm text-slate-500 sm:px-6 dark:text-slate-400">
        Loading users…
      </main>
    );
  }
  if (error || !users) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          We couldn’t load the users
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Please try again in a moment.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
            Workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Users
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Keep your people and their details in one place.
          </p>
        </div>
        <Button asChild>
          <Link to="/users/create">
            <Plus aria-hidden="true" />
            Create user
          </Link>
        </Button>
      </div>

      {deleteError && (
        <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
          We couldn’t delete that user. Please try again.
        </p>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <UsersIcon aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">All users</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {users.length} {users.length === 1 ? "person" : "people"}
            </p>
          </div>
        </div>
        {users.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-950">
                <TableHead className="px-5 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Name</TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Email</TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Phone</TableHead>
                <TableHead className="text-right text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-slate-100 dark:border-slate-800 dark:hover:bg-slate-800/60">
                  <TableCell className="px-5 py-4 font-medium text-slate-900 dark:text-slate-100">{user.name}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300">{user.email}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300">{user.phone}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/users/${user.id}`}>
                          Edit <ArrowUpRight aria-hidden="true" />
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        disabled={isDeleting}
                        onClick={() => {
                          if (user.id !== undefined) deleteUser(user.id);
                        }}
                        className="text-slate-500 hover:bg-red-50 hover:text-red-700 dark:text-slate-400 dark:hover:bg-red-950/50 dark:hover:text-red-300"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="px-6 py-14 text-center">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">No users yet</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Create a user to get started.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};
