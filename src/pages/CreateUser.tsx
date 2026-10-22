import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateUser } from "@/hooks/useCreateUser";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, type User } from "@/@types/user";
import { ArrowLeft, UserPlus } from "lucide-react";

export const CreateUser = () => {
  const { mutate: createUser } = useCreateUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit: SubmitHandler<User> = (data) => {
    createUser(data);
    navigate("/users");
  };

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
          <UserPlus aria-hidden="true" className="size-5" />
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Create a user
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Add their contact and company details below.
        </p>
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
            <Button type="submit">Create user</Button>
          </div>
        </form>
      </section>
    </main>
  );
};
