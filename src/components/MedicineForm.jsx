import { useState, useEffect } from "react";
import useMedicines from "../hooks/useMedicines";
import Alert from "./Alert";
import { useParams } from "react-router-dom";

const MedicineForm = () => {

  //const {} = useMedicines();
  const params = useParams();

  return (
    <form
    className="bg-white px-5 py-10 md:w-1/2 rounded-lg shadow"
    //onSubmit={}
  >
    
    <div className="mb-3">
      <label
        className="text-gray-700 uppercase font-bold text-sm"
        htmlFor="username"
      >
        RUT
      </label>
      <input
        id="username"
        type="text"
        className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
        placeholder="12.345.678-9"
        //value={username}
        //onChange={(e) => setUsername(e.target.value)}
      ></input>
    </div>
    
    <input
      type="submit"
      className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-xl cursor-pointer hover:bg-sky-700 transition-colors"
      //value={id ? 'Editar usuario':'Registrar usuario'}
    ></input>
  </form>
  )
}

export default MedicineForm