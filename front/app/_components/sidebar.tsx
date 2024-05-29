import { usePathname } from "next/navigation";
import Link from "next/link";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="d-flex flex-column">
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            href="/notes"
            className={
              pathname == "/notes"
                ? "nav-link active"
                : "nav-link link-body-emphasis"
            }
          >
            <i className="bi bi-lightbulb pe-none me-4"></i>
            Anotações
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href="/archive"
            className={
              pathname == "/archive"
                ? "nav-link active"
                : "nav-link link-body-emphasis"
            }
          >
            <i className="bi bi-archive pe-none me-4"></i>
            Arquivo
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href="/trash"
            className={
              pathname == "/trash"
                ? "nav-link active"
                : "nav-link link-body-emphasis"
            }
          >
            <i className="bi bi-trash pe-none me-4"></i>
            Lixeira
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
