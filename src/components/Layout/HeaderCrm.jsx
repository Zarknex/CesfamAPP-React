import { Link } from "react-router-dom";

const HeaderCrm = () => {

  const logout = () => {
    localStorage.clear("")
    window.location.reload();
  } 
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center">
          CESFAM CRM
        </h2>
        <input type="search" placeholder="Buscar usuario" className="rounded-lg lg:w-80 block p-2 border"/>

        <div className="flex items-center gap-4">
          <Link to="/crm" className="font-bold uppercase no-underline text-black">Usuarios</Link>
          <Link to="/crm/medicines" className="font-bold uppercase no-underline text-black">Medicamentos</Link>
          <button type="button"
          onClick={logout}
          className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold">Cerrar sesión</button>
        </div>
      </div>
    </header>
  );
};

export default HeaderCrm;
