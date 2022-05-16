import useUsers from "../hooks/useUsers";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import UsersForm from "./UsersForm";

const EditUser = () => {
  const params = useParams();
  const { getUser, user, loading } = useUsers();
  useEffect(() => {
    getUser(params.id);
  }, []);

  const { name } = user;
  if (loading) return "Loading....";
  return (
    <>
      <h1 className="font-black text-4xl">Editar usuario: {name}</h1>
      <div className='mt-10 flex justify-center'>
        <UsersForm/>
      </div>
    </>
  );
};

export default EditUser;
