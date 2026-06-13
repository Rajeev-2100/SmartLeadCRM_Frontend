// Setting.jsx
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SettingHeader from "../components/Header/SettingHeader";
import { useContext, useState } from "react";
import LeadContext from "../context/LeadContext";
import AgentsContext from "../context/AgentsContext";

const Setting = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const { allAgents, displayAgents, deleteListByAgent } =
    useContext(AgentsContext);

  const { allLeads, deletedLeadByLeadId } = useContext(LeadContext);

  return (
    <>
      <SettingHeader toggleSidebar={toggleSidebar} />

      <main
        className="container-fluid py-3"
        style={{ backgroundColor: "#f4f7fb", minHeight: "100vh" }}
      >
        <div className="row g-3">
          {showSidebar && (
            <div className="col-12 col-md-3">
              <div className="bg-white shadow rounded-4 p-4 h-100">
                <h4 className="fw-bold text-center mb-4">Sidebar</h4>

                <hr />

                <div className="d-grid">
                  <Link className="btn btn-outline-secondary rounded-3" to="/">
                    Back to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className={showSidebar ? "col-12 col-md-9" : "col-12"}>
            <div
              className="rounded-4 shadow-lg p-4 p-md-5"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e3e8ef" }}
            >
              <div className="text-center mb-5">
                <h2 className="fw-bold text-dark">Settings Dashboard</h2>

                <p className="text-muted mb-0">
                  Manage sales agents and lead records.
                </p>
              </div>

              <div className="row g-4">
                <div className="col-12 col-xl-6">
                  <div
                    className="shadow rounded-4 p-4 h-100"
                    style={{ backgroundColor: "#f8fafc" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h3 className="fw-bold text-dark m-0">Sales Agents</h3>

                      <span
                        className="badge fs-6 px-3 py-2"
                        style={{ backgroundColor: "#e0e7ff", color: "#3730a3" }}
                      >
                        {allAgents?.length}
                      </span>
                    </div>

                    <div
                      className="overflow-auto pe-2"
                      style={{ maxHeight: "600px" }}
                    >
                      {displayAgents?.length > 0 ? (
                        displayAgents.map((agent) => (
                          <div
                            key={agent._id}
                            className="shadow-sm rounded-4 p-3 mb-3 bg-white"
                          >
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                              <div>
                                <h5 className="text-dark fw-semibold mb-1">
                                  {agent?.name}
                                </h5>

                                <p className="text-secondary mb-0">
                                  Assigned Sales Agent
                                </p>
                              </div>

                              <button
                                className="btn btn-outline-danger rounded-3 px-4"
                                onClick={() => deleteListByAgent(agent.name)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-5">
                          <h6 className="text-secondary">
                            No Agents Available
                          </h6>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-xl-6">
                  <div
                    className="shadow rounded-4 p-4 h-100"
                    style={{ backgroundColor: "#f8fafc" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h3 className="fw-bold text-dark m-0">Lead Records</h3>

                      <span
                        className="badge fs-6 px-3 py-2"
                        style={{ backgroundColor: "#dcfce7", color: "#166534" }}
                      >
                        {allLeads?.length}
                      </span>
                    </div>

                    <div
                      className="overflow-auto pe-2"
                      style={{ maxHeight: "600px" }}
                    >
                      {allLeads?.length > 0 ? (
                        allLeads.map((lead) => (
                          <div
                            key={lead._id}
                            className="shadow-sm rounded-4 p-3 mb-3 bg-white"
                          >
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                              <div>
                                <h5 className="text-dark fw-semibold mb-1">
                                  {lead.name}
                                </h5>

                                <p className="text-secondary mb-0">
                                  Lead Record
                                </p>
                              </div>

                              <button
                                className="btn btn-outline-danger rounded-3 px-4"
                                onClick={() => deletedLeadByLeadId(lead._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-5">
                          <h6 className="text-secondary">No Leads Available</h6>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Setting;