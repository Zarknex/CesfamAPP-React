import { useState } from "react";
import axiosClient from "../config/axiosClient";
import Alert from "./Alert";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([username, password].includes("")) {
      setAlert({
        msg: "Existen algunos campos vacios.",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post("/users/login", {
        username,
        password,
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      setUsername("");
      setPassword("");

      setAlert({
        error: false,
      });
      navigate('/crm')
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;
  return (
    <>
      <section>
        <div className="flex justify-content-center">
          <h2 className="title">Bienvenido al portal CESFAM</h2>
        </div>

        <div className="container py-3 ">
          <div className="grid grid-cols-2 gap-3 align-items-center">
            <div className="col-span-1">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-span-1 ">
              {msg && <Alert alert={alert} />}
              <form onSubmit={handleSubmit} className="">
                <div className="mb-3">
                  <label className="text-gray-700 uppercase font-bold text-sm">Usuario</label>
                  <input
                    type="text"
                    className="border-1 w-full p-2 mt-2 placeholder-gray-800 rounded-md"
                    placeholder="Introduce tu nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="text-gray-700 uppercase font-bold text-sm">Contraseña</label>
                  <input
                    type="password"
                    className="border-1 w-full p-2 mt-2 placeholder-gray-800 rounded-md"
                    placeholder="Introduce tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  <a href="/password-reset">¿Olvidaste tu contraseña?</a>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
