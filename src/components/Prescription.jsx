import useUsers from "../hooks/useUsers";
import { formatDate } from "../helpers/formatDate";
import { useParams } from "react-router-dom";

const Prescription = ({ prescription }) => {
  const { handleModalEditPrescription, handleModalDeletePrescription, sendWsp, sendMail } =
    useUsers({});

  const { patientName, patientLastName, agePatient, rutPatient } = prescription;
  const params = useParams();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">
          Nombre: {patientName} {patientLastName}
        </p>
        <p className="mb-1 text-xl text-gray-500">{rutPatient}</p>
        <p className="mb-1 text-xl">Edad: {agePatient} años</p>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEditPrescription(prescription)}
        >
          Editar
        </button>
        <button
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalDeletePrescription(prescription)}
        >
          Eliminar
        </button>
        <div className="bg-green-600 px-3 flex items-center py-3 text-white rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <button
            className="font-bold px-2 uppercase text-sm"
            onClick={() => sendWsp(params.id)}
          >
            Enviar WhatsApp
          </button>
        </div>
        <div className="bg-blue-600 px-4 py-3 text-white rounded-lg flex items-center">
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <button
            className="uppercase px-2 font-bold text-sm"
            onClick={() => sendMail(params.id)}
          >
            Enviar Correo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
