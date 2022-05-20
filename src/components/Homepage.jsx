function Homepage() {
  return (
    <section id="hero" className="flex items-center">
      <div className="px-5">
        <h3>Bienvenido a CESFAM</h3>
        <h2>Para acceder al contenido debes iniciar sesión.</h2>
        <br/>
        <h3 className="btn-get-started"><a href="/login">
          Iniciar sesión
        </a></h3>
      </div>
    </section>

  );
}

export default Homepage;