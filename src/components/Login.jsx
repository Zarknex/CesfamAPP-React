import { useState, useEffect } from "react";

function Login({ setUsers }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([user, pass].includes("")) {
      setError(true);
      return;
    }
    setError(false);

    const users = {
      user,
      pass
    }
    setUsers(users);
  };

  return (
    <section className="vh-100">
      <div className="d-flex justify-content-center">
        <h2 className="title">Bienvenido al portal CESFAM</h2>
      </div>

      <div className="container py-5">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt=""
            />
          </div>

          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              {error && "Campos vacios"}
              <div className="mb-4">
                <label className="form-label">Usuario</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Introduce tu nombre de usuario"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Introduce tu contraseña"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <div className="form-check">
                  <label className="form-check-label">Recordar datos</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                  />
                </div>
                <a href="/password-reset">¿Olvidaste tu contraseña?</a>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
