import useMedicines from "../hooks/useMedicines";
import PreviewMedicine from "./PreviewMedicine";
const Medicines = () => {
  const { medicines } = useMedicines();
  //console.log(medicines);
  return (
    <>
      <h1 className="text-3xl font-black">Listado de medicamentos</h1>
      <div className="bg-white shadow rounded-lg">
        {medicines.length ? (
          medicines.map((medicine) => (
            <PreviewMedicine key={medicine._id} medicine={medicine} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase font-bold m-0 p-3">
            No hay usuarios registrados aún
          </p>
        )}
      </div>
    </>
  );
};

export default Medicines;
