import { useParams } from "react-router-dom";

export const User = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>USER ID: {id}</h1>
    </div>
  );
};
