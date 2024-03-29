import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import useAdmin from "../hooks/useAdmin";
import ModalFormPrescription from "./ModalFormPrescription";
import ModalDeletePrescription from "./ModalDeletePrescription";
import Prescription from "./Prescription";
import Alert from "./Alert";

const User = () => {
  const params = useParams();
  const { getUser, user, loading, handleModalPrescription, alert } = useUsers([]);
  const admin = useAdmin();
  const { name } = user;
  

  useEffect(() => {
    getUser(params.id);
  }, []);

  if (loading) return "Loading....";

  const { msg } = alert
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{name}</h1>
        <div className="flex items-center gap-2 uppercase text-sm font-bold text-gray-600 hover:text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <Link to={`/crm/edit/${params.id}`}>Editar</Link>
        </div>
      </div>
      <button
        onClick={handleModalPrescription}
        type="button"
        className="text-sm px-3 py-3 w-full md:w-auto rounded-lg font-bold uppercase bg-sky-400 text-white text-center flex gap-2 items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Agregar prescripción
      </button>

      <p className="font-bold text-xl mt-10">Prescripciones del paciente</p>
<div className="flex justify-center">
<div className="w-full md:w-1/2 lg:w-1/3">
      {msg && <Alert alert={alert}/>}
</div>
</div>
      <div className="bg-white shadow mt-10 rounded-lg">
        {user.prescriptions?.length ? (
          user.prescriptions.map((prescriptions,) => (
            <Prescription key={prescriptions.id} prescription={prescriptions} />
          ))
        ) : (
          <p className="text-center my-5 p-10">
            No hay prescripciones registradas para este paciente
          </p>
        )}
      </div>

      <ModalFormPrescription />
      <ModalDeletePrescription />
    </>
  );
};

export default User;
