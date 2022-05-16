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
      <section className="vh-100">
        <div className="d-flex justify-content-center">
          <h2 className="title">Bienvenido al portal CESFAM</h2>
        </div>

        <div className="container py-3">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              {msg && <Alert alert={alert} />}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label">Usuario</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Introduce tu nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
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
