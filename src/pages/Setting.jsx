import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SettingHeader from "../components/Header/SettingHeader";
import { useContext, useState } from "react";
import LeadContext from "../context/LeadContext";
import AgentsContext from "../context/AgentsContext";

const Setting = () => {
  const { allAgents, displayAgents, deleteListByAgent } = useContext(AgentsContext);

  const { allLeads, deletedLeadByLeadId } = useContext(LeadContext);

  return (
    <>
      <SettingHeader />
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f7fb",
        }}
      >
        <div className="d-flex">
          <div
            className="bg-white shadow-sm d-flex flex-column align-items-center py-5"
            style={{
              width: "20%",
              minHeight: "100vh",
            }}
          >
            <h3 className="fw-bold">Sidebar</h3>

            <hr className="w-75" />

            <Link className="text-decoration-none text-secondary" to={`/`}>
              <h5>Back to Dashboard</h5>
            </Link>
          </div>

          <div
            className="py-5 px-4"
            style={{
              width: "80%",
            }}
          >
            <div className="mb-5 text-center">
              <h4 className="fw-bold">Settings Dashboard</h4>

              <p className="text-secondary">
                Manage sales agents and lead records.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-lg-6">
                <div className="bg-white rounded-4 shadow p-4 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold m-0">Sales Agents</h3>
                    <span className="badge bg-primary fs-6">
                      {allAgents?.length}
                    </span>
                  </div>
                  <div
                    className="overflow-auto pe-2"
                    style={{
                      maxHeight: "500px",
                    }}
                  >
                    {displayAgents?.map((agent) => (
                      <div
                        key={agent._id}
                        className="d-flex justify-content-between align-items-center border rounded-3 p-3 mb-3 bg-light"
                      >
                        <div>
                          <h6 className="m-0 fw-semibold">{agent.name}</h6>
                          <small className="text-secondary">
                            Assigned Agent
                          </small>
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          value={agent.name}
                          onClick={() => deleteListByAgent(agent.name)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="bg-white rounded-4 shadow p-4 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold m-0">Lead Names</h3>

                    <span className="badge bg-success fs-6">
                      {allLeads?.length}
                    </span>
                  </div>

                  <div
                    className="overflow-auto pe-2"
                    style={{
                      maxHeight: "500px",
                    }}
                  >
                    {allLeads?.map((lead) => (
                      <div
                        key={lead._id}
                        className="d-flex justify-content-between align-items-center border rounded-3 p-3 mb-3 bg-light"
                      >
                        <div>
                          <h6 className="m-0 fw-semibold">{lead.name}</h6>

                          <small className="text-secondary">Lead Record</small>
                        </div>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          value={lead._id}
                          onClick={(e) => deletedLeadByLeadId(e.target.value)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
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
