import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const User = () => {
  const { id } = useParams();
  const { user, isLoading, error } = useUser(id);
  const { mutate: updateUser } = useUpdateUser();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!name || !email || user?.id === undefined) return;
    updateUser({ id: user.id, name, email });
    navigate("/users");
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  if (isLoading) return <p>Loading...</p>;
  if (error || !user) return <p>Error.</p>;

  return (
    <div>
      <h1>USER ID: {user.id}</h1>
      <div style={{ width: "300px" }}>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};
