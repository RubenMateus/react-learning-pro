import { UserSchema, type User } from "@/@types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useUser } from "@/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, UserRound } from "lucide-react";

export const UserPage = () => {
  const { id } = useParams();
  const { user, isLoading, error } = useUser(id);
  const { mutate: updateUser } = useUpdateUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
    values: user,
  });

  const onSubmit: SubmitHandler<User> = (data) => {
    updateUser({ id: user?.id, ...data });
    navigate("/users");
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center text-sm text-slate-500 sm:px-6 dark:text-slate-400">
        Loading user…
      </main>
    );
  }
  if (error || !user) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          We couldn’t find that user
        </h1>
        <Link
          to="/users"
          className="mt-4 inline-flex text-sm font-medium text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
        >
          Back to users
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <Link
        to="/users"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to users
      </Link>
      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          <UserRound aria-hidden="true" className="size-5" />
        </span>
        <p         className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          User #{user.id}
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Edit user details
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
            <Input id="name" autoComplete="name" aria-invalid={!!errors.name} className="dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500" {...register("name")} />
            {errors.name && <p className="error mt-1.5 text-sm" role="alert">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} className="dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500" {...register("email")} />
            {errors.email && <p className="error mt-1.5 text-sm" role="alert">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
            <Input id="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} className="dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500" {...register("phone")} />
            {errors.phone && <p className="error mt-1.5 text-sm" role="alert">{errors.phone.message}</p>}
          </div>
          <div>
            <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Company</label>
            <Input id="company" autoComplete="organization" aria-invalid={!!errors.company?.name} className="dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500" {...register("company.name")} />
            {errors.company?.name && <p className="error mt-1.5 text-sm" role="alert">{errors.company.name.message}</p>}
          </div>
          <div className="flex justify-end border-t border-slate-100 pt-5 dark:border-slate-800">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </section>
    </main>
  );
};
