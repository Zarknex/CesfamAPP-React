const Prescription = ({ prescription }) => {
  const {
    patientName,
    patientLastName,
    agePatient,
    sexPatient,
    rutPatient,
    diagnosticPatient,
    idMedicinePatient,
    dosePatient,
  } = prescription;

  console.log(prescription);
  return (
    <div>
      <p className="text-xl">Nombre {agePatient}</p>
    </div>
  );
};

//Crear PreviewPrescription

export default Prescription;
