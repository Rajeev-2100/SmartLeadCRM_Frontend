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

      <main className="container-fluid py-3" style={{ minHeight: "100vh" }}>
        <div className='row g-3'>
          {showSidebar && (
            <div className="col-12 col-md-3">
              <div className="border rounded p-4 bg-light h-100">
                <h3 className="text-center mb-4">SideBar</h3>

                <div className="d-flex flex-column gap-3 text-center">
                  <Link className="btn btn-outline-secondary" to="/leads">
                    Leads
                  </Link>

                  <Link className="btn btn-outline-secondary" to="/salesView">
                    Sales
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
    

          <div className={showSidebar ? "col-12 col-md-9" : 'col-12'}>
            <div className="bg-danger rounded p-3 p-md-4 text-white w-100">
              <h3 className="text-center mb-4">Main Content</h3>

              <div className="row g-3">
                {filteredStatus?.map((lead) => (
                  <div key={lead._id} className="col-12 col-sm-6 col-lg-4">
                    <div className="card h-100 shadow-sm">
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

              <hr className="border-light my-4" />

              <div className="bg-light text-dark rounded p-3">
                <h5>Lead Status</h5>

                <div className="d-flex flex-wrap gap-3 mt-3">
                  {leadsStatus?.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded px-3 py-2 bg-white"
                    >
                      <strong>{item._id}</strong>: {item.count} Leads
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-light my-4" />

              <div className="bg-light text-dark rounded p-3">
                <label htmlFor="statusFilter" className="form-label fw-bold">
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

              <div
                className="my-3 w-100"
                style={{
                  minWidth: "unset",
                }}
              >
                <Link to={`/addleadform`} className="btn btn-primary w-100">
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
