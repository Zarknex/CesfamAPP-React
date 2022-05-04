function Login() {
  return (
    <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid" alt=""/>
        </div>

        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <form>
            <div class="form-outline mb-4">
              <input type="email" id="form1Example13" class="form-control form-control-lg" />
              <label class="form-label" for="form1Example13">Usuario</label>
            </div>
  
            <div class="form-outline mb-4">
              <input type="password" id="form1Example23" class="form-control form-control-lg" />
              <label class="form-label" for="form1Example23">Contraseña</label>
            </div>
  
            <div class="d-flex justify-content-around align-items-center mb-4">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="form1Example3"/>
                <label class="form-check-label" for="form1Example3">Recordar datos</label>
              </div>
              <a href="/password-reset">¿Olvidaste tu contraseña?</a>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  );
}

export default Login;