import Link from "next/link";
import Image from "next/image";

export default function Login() {
  return (
    <main className="d-flex align-items-center py-4 bg-body-tertiary h-100">
      <main className="form-signin w-100 m-auto">
        <form>
          <div className="mb-5 d-flex flex-column gap-2 justify-content-center align-items-center">
            <Image src="/images/logo.png" width={50} height={50} alt="logo" />
            <h3 className="fw-light">Google Keep Clone</h3>
          </div>

          <h5 className="mb-3 fw-normal text-center">
            Entre com suas credenciais
          </h5>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value="teste@teste.com"
            />
            <label>Email</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value="teste123"
            />
            <label>Senha</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label">Lembrar-me</label>
          </div>
          <Link href="/notes">
            <button className="btn btn-primary w-100 py-2" type="button">
              Entrar
            </button>
          </Link>
          <p className="mt-5 mb-3 text-body-secondary text-center">
            Copyright &copy; 2024
          </p>
        </form>
      </main>
    </main>
  );
}
