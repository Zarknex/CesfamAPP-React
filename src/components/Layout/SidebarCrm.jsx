import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SidebarCrm = () => {
  const { auth } = useAuth();
  return (
    <aside className="md:w-80 lg:w-96 px-2 py-10 border-x-2">
      <p className="text-xl font-bold">Hola: {auth.username}</p>
      <Link
        to="new-user"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-3 text-center rounded-lg"
      >
        Crear usuario
      </Link>
      <Link
        to="new-medicine"
        className="bg-teal-600 w-full p-3 text-white uppercase font-bold block mt-3 text-center rounded-lg"
      >
        Crear Medicamento
      </Link>
    </aside>
  );
};

export default SidebarCrm;
