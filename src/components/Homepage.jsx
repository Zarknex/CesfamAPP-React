
function Homepage() {
  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container">
        <h1>Bienvenido a CESFAM</h1>
        <h2>Para acceder al contenido debes iniciar sesión.</h2>
        <a href="/login" className="btn-get-started scrollto">
          Iniciar sesión
        </a>
      </div>
    </section>

  );
}

export default Homepage;
