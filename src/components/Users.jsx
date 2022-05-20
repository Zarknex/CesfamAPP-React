import useUsers from "../hooks/useUsers";
import PreviewUser from "./PreviewUser";
const Users = () => {
  const { users, loading } = useUsers();
  if (loading) return 'loading...'





  return (
    <>
      <h1 className="text-3xl font-black">Listado de usuarios</h1>
      <div className="bg-white shadow rounded-lg">
        {users.length ? 
        (
          users.map((user) => <PreviewUser key={user} user={user} />)
        ) : 
        (
          window.location.reload(),
          <p className="text-center text-gray-600 uppercase font-bold m-0 p-3">
            No hay usuarios registrados aún
          </p>
        )}
      </div>
    </>
  );
};

export default Users;
