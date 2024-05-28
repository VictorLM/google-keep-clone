import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-white fixed-top border-bottom "
      style={{ height: "70px" }}
    >
      <div className="container-xxl px-5 d-flex justify-content-between">
        <Link className="navbar-brand" href="/">
          <Image src="/images/logo.png" width={40} height={40} alt="logo" />
          <span className="ms-2">Keep Clone</span>
        </Link>

        <input
          type="text"
          className="form-control form-control-lg w-50 bg-light"
          id="exampleFormControlInput1"
          placeholder="Pesquisar"
        />

        <div className="d-flex">
          <button
            type="button"
            className="btn btn-lg btn-outline-secondary p-0 px-1 border-0 me-3"
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>

          <div className="dropdown dropstart">
            <Link
              href="#"
              className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Image
                src="/images/default-avatar.jpg"
                className="rounded-circle"
                width={32}
                height={32}
                alt="Avatar"
              />
            </Link>
            <ul className="dropdown-menu text-small shadow">
              <li>
                <Link className="dropdown-item" href="/">
                  Sair
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
