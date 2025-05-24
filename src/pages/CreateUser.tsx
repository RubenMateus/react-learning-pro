import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/hooks/useCreateUser";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, type User } from "@/@types/user";

export const CreateUser = () => {
  const { mutate: createUser } = useCreateUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit: SubmitHandler<User> = (data) => {
    createUser(data);
    navigate("/users");
  };

  console.log(errors);

  return (
    <div>
      <h1>Criar utilizador</h1>
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
