import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateUser } from "@/hooks/useCreateUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateUser = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const { mutate: createUser } = useCreateUser();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !email) return;
    createUser({ name, email });
    navigate("/users");
  };

  return (
    <div>
      <h1>Criar utilizador</h1>
      <div style={{ width: "300px" }}>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};
