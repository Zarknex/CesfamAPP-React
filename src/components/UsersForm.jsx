import { useState, useEffect } from "react";
import useUsers from "../hooks/useUsers";
import Alert from "./Alert";
import { useParams } from "react-router-dom";

const UsersForm = () => {
  const [username, setUsername] = useState("");
  const [id, setId] = useState(null);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [typeUser, setTypeUser] = useState("");
  const { alert, showAlert , submitUser, user} = useUsers([]);

  const params = useParams();
  useUsers();

  useEffect(() => {
    if (params.id) {
      setId(user._id)
      setUsername(user.username)
      setPassword(user.password)
    setName(user.name)
    setLastName(user.lastName)
    setEmail(user.email)
    setPhone(user.phone)
    setTypeUser(user.typeUser)
    }
  },[params])
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [username, password, name, lastName, email, phone, typeUser].includes("")
    ) {
      showAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return
    }
    submitUser({id, username, password, name, lastName, email, phone, typeUser});
    setId(null)
    setUsername("")
    setPassword("")
    setName("")
    setLastName("")
    setEmail("")
    setPhone("")
    setTypeUser("")
  };

  const { msg } = alert;
  return (
    <form
      className="bg-white px-5 py-10 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="password"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
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
          placeholder="John"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="lastName"
        >
          Apellido
        </label>
        <input
          id="lastName"
          type="text"
          className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Doe"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="email"
        >
          Correo electronico
        </label>
        <input
          id="email"
          type="text"
          className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="usuario@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="phone"
        >
          Número de telefono
        </label>
        <input
          id="phone"
          type="text"
          className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="912345678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="typeUser"
        >
          Tipo de usuario
        </label>
        <select
          className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={typeUser}
          onChange={(e) => setTypeUser(e.target.value)}
        >
          <option value="patient">Paciente</option>
          <option value="doctor">Doctor</option>
          <option value="farm">Farmaceutico</option>
        </select>
      </div>
      <input
        type="submit"
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-xl cursor-pointer hover:bg-sky-700 transition-colors"
        value={id ? 'Editar usuario':'Registrar usuario'}
      ></input>
    </form>
  );
};

export default UsersForm;
