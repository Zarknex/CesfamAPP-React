import MedicinesForm from "./MedicinesForm";
const NewMedicine = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Agregar medicamento</h1>
      <div className="mt-10 flex justify-center">
        <MedicinesForm />
      </div>
    </>
  );
};

export default NewMedicine;
