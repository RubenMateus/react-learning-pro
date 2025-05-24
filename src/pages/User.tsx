import { UserSchema, type User } from "@/@types/user";
import { Button } from "@/components/ui/button";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useUser } from "@/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

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

  if (isLoading) return <p>Loading...</p>;
  if (error || !user) return <p>Error.</p>;

  return (
    <div>
      <h1>USER ID: {user.id}</h1>
      <div style={{ width: "300px", padding: "20px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginTop: "20px" }}>
            <input placeholder="Nome" type="text" {...register("name")} />
            <div>{errors.name && <span>{errors.name.message}</span>}</div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <input placeholder="Email" type="email" {...register("email")} />
            <div>{errors.email && <span>{errors.email.message}</span>}</div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <input placeholder="Telefone" type="text" {...register("phone")} />
            <div>{errors.phone && <span>{errors.phone.message}</span>}</div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <input
              placeholder="Nome da empresa"
              type="text"
              {...register("company.name")}
            />
            <div>
              {errors.company?.name && (
                <span>{errors.company.name.message}</span>
              )}
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};
