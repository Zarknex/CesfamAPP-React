import { useState, useEffect } from "react";
import useMedicines from "../hooks/useMedicines";
import Alert from "./Alert";
import { useParams } from "react-router-dom";
//description, stock, manufacturer, content, typeMedicine
const MedicineForm = () => {
  const [id, setId] = useState(null);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [content, setContent] = useState("");
  const [typeMedicine, setTypeMedicine] = useState("");
  const { alert, showAlert, loading, submitMedicine, medicine } = useMedicines([]);
  const params = useParams();
  useMedicines();

  useEffect(() => {
    if (params.id) {
      setId(medicine.id);
      setDescription(medicine.description);
      setStock(medicine.stock);
      setManufacturer(medicine.manufacturer);
      setContent(medicine.content);
      setTypeMedicine(medicine.typeMedicine);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [description, stock, manufacturer, content, typeMedicine].includes("")
    ) {
      showAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    submitMedicine({
      id,
      description,
      stock,
      manufacturer,
      content,
      typeMedicine,
    });
    setId(null);
    setDescription("");
    setStock("");
    setManufacturer("");
    setContent("");
    setTypeMedicine("");
  };

  const { msg } = alert;
  if (loading) return "Loading....";
  return (
    <form
      className="bg-white px-5 py-10 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
    {msg && <Alert alert={alert} />}
      <div className="mb-3">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="name"
        >
          Nombre
        </label>
        <input
          id="name"
          type="text"
          className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción breve"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="stock"
        >
          Stock
        </label>
        <input
          id="stock"
          type="text"
          className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="100"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="manufacturer"
        >
          Laboratorio
        </label>
        <input
          id="manufacturer"
          type="text"
          className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Laboratorio"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="content"
        >
          Contenido
        </label>
        <input
          id="content"
          type="text"
          className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Cantidad de dosis"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="username"
        >
          Tipo de medicina
        </label>
        <select
          className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={typeMedicine}
          onChange={(e) => setTypeMedicine(e.target.value)}
        >
          <option value="">--Seleccionar--</option>
          <option value="pills">Pastillas</option>
          <option value="drops">Gotas</option>
          <option value="injectable">Inyectable</option>
        </select>
      </div>

      <input
        type="submit"
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-xl cursor-pointer hover:bg-sky-700 transition-colors"
        value={id ? 'Editar medicamento':'Registrar medicamento'}
      ></input>
    </form>
  );
};

export default MedicineForm;
