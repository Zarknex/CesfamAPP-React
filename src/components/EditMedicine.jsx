import useMedicines from "../hooks/useMedicines";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import MedicinesForm from "./MedicinesForm";


const EditMedicine = () => {

  const params = useParams();
  const { getMedicine, medicine, loading, deleteMedicine } = useMedicines();
  useEffect(() => {
    getMedicine(params.id);
  }, []);

  const handleClick = () => {
    if (window.confirm(`¿Deseas eliminar a este usuario? \n Esta acción no se puede deshacer.`)) {
      deleteMedicine(params.id);
    } else {
      console.log("no");
    }
  };

  const { description } = medicine;
  if (loading) return "Loading....";
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">Editar medicamento: {description}</h1>
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <button className="font-bold uppercase" onClick={handleClick}>
            Eliminar
          </button>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
      <MedicinesForm />
      </div>
    </>
  );

}

export default EditMedicine