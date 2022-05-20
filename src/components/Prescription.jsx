import useUsers from "../hooks/useUsers";
import { formatDate } from "../helpers/formatDate";

const Prescription = ({ prescription }) => {
  const { handleModalEditPrescription, handleModalDeletePrescription } = useUsers({});

  const { patientName, patientLastName, agePatient, rutPatient } = prescription;
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">
          Nombre: {patientName} {patientLastName}
        </p>
        <p className="mb-1 text-xl text-gray-500">{rutPatient}</p>
        <p className="mb-1 text-xl">Edad: {agePatient} años</p>
        <p className="mb-1 text-xl">Fecha entrega?: Date </p>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEditPrescription(prescription)}
        >
          Editar
        </button>
        <button className="bg-red-800 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
        onClick={() => handleModalDeletePrescription(prescription)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Prescription;
