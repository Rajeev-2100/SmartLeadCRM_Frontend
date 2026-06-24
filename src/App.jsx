import useFetch from "./useFetch.jsx";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import { useContext, useState } from "react";
import LeadContext from "./context/LeadContext.jsx";
import MainHeader from "./components/Header/MainHeader.jsx";
import "../src/styles.css";

function App() {
  const { allLeads, leadsStatus } = useContext(LeadContext);

  const [selectedStatus, setSelectedStatus] = useState("none");
  const [showSidebar, setShowSidebar] = useState(true);

  const filteredStatus =
    selectedStatus === "none" || selectedStatus === ""
      ? allLeads
      : allLeads?.filter((lead) => lead.status === selectedStatus);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <>
      <MainHeader toggleSidebar={toggleSidebar} />

      <main
        className="container-fluid py-3"
        style={{ backgroundColor: "#f4f7fb", minHeight: "100vh" }}
      >
        <div className="row g-3">
          {showSidebar && (
            <div className="col-12 col-md-3">
              <div className="bg-white shadow rounded-4 p-4 h-100">
                <h3 className="text-center mb-4">SideBar</h3>

                <div className="d-flex flex-column gap-3 text-center">
                  <Link className="btn btn-outline-secondary" to="/leads">
                    Leads
                  </Link>

                  <Link className="btn btn-outline-secondary" to="/salesView">
                    LeadList
                  </Link>

                  <Link className="btn btn-outline-secondary" to="/agents">
                    Agents
                  </Link>

                  <Link className="btn btn-outline-secondary" to="/reports">
                    Reports
                  </Link>

                  <Link className="btn btn-outline-secondary" to="/settings">
                    Settings
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className={showSidebar ? "col-12 col-md-9" : "col-12"}>
            <div
              className="rounded-4 shadow-lg p-3 p-md-4 w-100"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e3e8ef" }}
            >
              <h3 className="text-center mb-4 text-dark">Main Content</h3>

              <div className="row g-3">
                {filteredStatus?.map((lead) => (
                  <div key={lead._id} className="col-12 col-sm-6 col-lg-4">
                    <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: "#f8fafc" }}>
                      <div className="card-body text-dark">
                        <h5 className="card-title">{lead.name}</h5>

                        <p className="card-text mb-1">
                          <strong>Status:</strong> {lead.status}
                        </p>

                        <p className="card-text">
                          <strong>Priority:</strong> {lead.priority}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="my-4" />

              <div className="rounded-4 p-3" style={{ backgroundColor: "#f8fafc" }}>
                <h5 className="text-dark">Lead Status</h5>

                <div className="d-flex flex-wrap gap-3 mt-3">
                  {leadsStatus?.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-3 px-3 py-2 bg-white text-dark"
                    >
                      <strong>{item._id}</strong>: {item.count} Leads
                    </div>
                  ))}
                </div>
              </div>

              <hr className="my-4" />

              <div className="rounded-4 p-3" style={{ backgroundColor: "#f8fafc" }}>
                <label htmlFor="statusFilter" className="form-label fw-bold text-dark">
                  Quick Filters
                </label>

                <select
                  id="statusFilter"
                  className="form-select"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="none">Filter By Status</option>

                  {leadsStatus?.map((status) => (
                    <option key={status._id} value={status._id}>
                      {status._id}
                    </option>
                  ))}
                </select>
              </div>

              <div className="my-3 w-100">
                <Link
                  to={`/addleadform`}
                  className="btn w-100"
                  style={{ backgroundColor: "#4f6ef7", color: "#fff" }}
                >
                  Add New Lead
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;