import { FaBars } from "react-icons/fa";

const PageHeader = ({ title, toggleSidebar }) => {
  return (
    <header className="bg-body-tertiary shadow-sm py-3">
      <div className="container-fluid position-relative">
        <div
          className="position-absolute top-50 start-0 translate-middle-y ms-5"
          onClick={toggleSidebar}
          style={{ cursor: "pointer" }}
        >
          <FaBars size={30} />
        </div>

        <div className="text-center">
          <h2 className="mb-0 fw-bold">{title}</h2>
        </div>

      </div>
    </header>
  );
};

export default PageHeader;