function Homepage() {
    return (
            <div class="container px-4 py-5 px-md-5 text-center text-lg-start">
                <div class="row gx-lg-5 align-items-center mb-5">
                    <div class="col-lg-6 mb-6 mb-lg-0" style="z-index: 10">
                        <h1 class="my-5 display-3 fw-bold ls-tight" style="color: hsl(0, 0%, 0%)">
                            <span>Bienvenido a CESFAM</span>
                        </h1>
                        <p class="mb-4 opacity-70" style="color: hsl(0, 0%, 0%)">
                            Por favor introduce tu rut y contraseña para acceder a no me acuerdo
                            que chucha era pero vo dale.
                        </p>
                    </div>
                    <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div class="card bg-glass">
                            <div class="card-body px-4 py-5 px-md-5">
                                <form>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">RUT</label>
                                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                            placeholder="12.345.678-9"/>
                                            <small id="emailHelp" class="form-text text-muted">Por favor no olvides los puntos y el guión.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Contraseña</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Contraseña"/>
                                    </div>
                                    <div class="text-center pt-3">
                                        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Homepage;