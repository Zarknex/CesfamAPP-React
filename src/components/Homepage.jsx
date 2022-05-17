
function Homepage() {
  return (
    <section id="hero" className="flex items-center">
      <div className="px-5">
        <h1>Bienvenido a CESFAM</h1>
        <h2>Para acceder al contenido debes iniciar sesión.</h2>
        <a href="/login" className="btn-get-started">
          Iniciar sesión
        </a>
      </div>
    </section>

  );
}

export default Homepage;
