import { Fragment, useState, useEffect } from "react";
import Select from "react-select";
import { Dialog, Transition } from "@headlessui/react";
import useUsers from "../hooks/useUsers";
import useMedicines from "../hooks/useMedicines";
import Alert from "./Alert";
import { useParams } from "react-router-dom";
const SEX = ["Masculino", "Femenino"];

const ModalFormPrescription = () => {
  const { medicines } = useMedicines();

  const arrayMedicine = medicines.map(({ _id, description }) => ({
    value: _id,
    label: description,
  }));

  const selectedOpt = (value) => {
    setIdMedicinePatient(value);
  };

  const {
    modalFormPrescription,
    handleModalPrescription,
    showAlert,
    alert,
    submitPrescription,
    user,
    prescription,
  } = useUsers();

  const [patientName, setPatientName] = useState(user.name);
  const [patientLastName, setPatientLastName] = useState(user.lastName);
  const [agePatient, setAgePatient] = useState("");
  const [sexPatient, setSexPatient] = useState("");
  const [rutPatient, setRutPatient] = useState(user.username);
  const [diagnosticPatient, setDiagnosticPatient] = useState("");
  const [idMedicinePatient, setIdMedicinePatient] = useState("");
  const [dosePatient, setDosePatient] = useState("");
  const [id, setId] = useState("");

  const params = useParams();

  useEffect(() => {
    if (prescription?._id) {
      setPatientName(prescription.patientName);
      setPatientLastName(prescription.lastName);
      setRutPatient(prescription.rutPatient);
      setId(prescription._id);
      setAgePatient(prescription.agePatient);
      setSexPatient(prescription.sexPatient);
      setDiagnosticPatient(prescription.diagnosticPatient);
      setIdMedicinePatient(prescription.idMedicinePatient);
      setDosePatient(prescription.dosePatient);
      return;
    }
    setId("");
    setAgePatient("");
    setSexPatient("");
    setDiagnosticPatient("");
    setIdMedicinePatient("");
    setDosePatient("");
  }, [prescription]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        patientName,
        patientLastName,
        agePatient,
        sexPatient,
        rutPatient,
        diagnosticPatient,
        idMedicinePatient,
        dosePatient,
      ].includes("")
    ) {
      showAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    await submitPrescription({
      patientName,
      patientLastName,
      agePatient,
      sexPatient,
      rutPatient,
      diagnosticPatient,
      idMedicinePatient,
      dosePatient,
      patientId: params.id,
    }).then(
      setAgePatient(""),
      setSexPatient(""),
      setDiagnosticPatient(""),
      setIdMedicinePatient(""),
      setDosePatient("")
    );
  };

  const { msg } = alert;

  return (
    <Transition.Root show={modalFormPrescription} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalPrescription}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalPrescription}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    {id ? "Editar prescripción" : "Crear prescripción"}
                  </Dialog.Title>
                  {msg && <Alert alert={alert} />}
                  <form className="my-10" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="patientName"
                      >
                        Nombre paciente
                      </label>
                      <input
                        type="text"
                        id="patientName"
                        placeholder="Nombre del paciente"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={patientName}
                        readOnly
                        //onChange={(e) => setPatientName(e.target.value)}
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="patientLastName"
                      >
                        Apellido paciente
                      </label>
                      <input
                        type="text"
                        id="patientLastName"
                        placeholder="Apellido del paciente"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={patientLastName}
                        readOnly
                        //onChange={(e) => setPatientLastName(e.target.value)}
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="agePatient"
                      >
                        Edad paciente
                      </label>
                      <input
                        type="text"
                        id="agePatient"
                        placeholder="Edad del paciente"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={agePatient}
                        onChange={(e) => setAgePatient(e.target.value)}
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="sexPatient"
                      >
                        Sexo paciente
                      </label>
                      <select
                        id="sexPatient"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sexPatient}
                        onChange={(e) => setSexPatient(e.target.value)}
                      >
                        <option value="">--Seleccionar--</option>
                        {SEX.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="rutPatient"
                      >
                        RUT paciente
                      </label>
                      <input
                        type="text"
                        id="rutPatient"
                        placeholder="RUT del paciente"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={rutPatient}
                        readOnly
                        //onChange={(e) => setRutPatient(e.target.value)}
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="diagnosticPatient"
                      >
                        Diagnostico paciente
                      </label>
                      <textarea
                        id="diagnosticPatient"
                        placeholder="Diagnostico del paciente"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={diagnosticPatient}
                        onChange={(e) => setDiagnosticPatient(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="idMedicinePatient"
                      >
                        Medicinas paciente
                      </label>
                      <Select
                        value={idMedicinePatient}
                        isMulti
                        onChange={selectedOpt}
                        name="colors"
                        options={arrayMedicine}
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="dosePatient"
                      >
                        Dosis paciente
                      </label>
                      <input
                        type="text"
                        id="rutPatient"
                        placeholder="RUT del paciente"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={dosePatient}
                        onChange={(e) => setDosePatient(e.target.value)}
                      ></input>
                    </div>
                    <input
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-700 w-full
                    p-3 text-white font-bold cursor-pointer transition-colors rounded-md text-sm"
                      value={id ? "Editar prescripción" : "Crear prescripción"}
                    ></input>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFormPrescription;
