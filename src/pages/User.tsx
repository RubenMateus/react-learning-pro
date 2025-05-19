import { useUser } from "@/hooks/useUser";
import { useParams } from "react-router-dom";

export const User = () => {
  const { id } = useParams();
  const { user, isLoading, error } = useUser(id);

  if (isLoading) return <p>Loading...</p>;
  if (error || !user) return <p>Error.</p>;

  return (
    <div>
      <h1>USER ID: {user.id}</h1>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};
