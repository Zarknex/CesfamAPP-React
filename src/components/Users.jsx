import useUsers from "../hooks/useUsers";
import PreviewUser from "./PreviewUser";
const Users = () => {
  const { users } = useUsers();
  return (
    <>
      <h1 className="text-3xl font-black">CRM</h1>
      <div className="bg-white shadow rounded-lg">
        {users.length ? users.map(user => (
          <PreviewUser
            key={user._id}
            user={user}
          />
        )) : (
          <p className="text-center text-gray-600 uppercase font-bold m-0 p-3">
            No hay usuarios registrados aún
          </p>
        )}
      </div>
    </>
  );
};

export default Users;
