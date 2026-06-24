import { Link } from "react-router-dom";
import SalesAgentHeaderView from "../components/Header/SalesAgentHeaderView";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import AgentsContext from "../context/AgentsContext";
import LeadContext from "../context/LeadContext";
import useFetch from "../useFetch";

const AgentsList = () => {
  const { agents, allAgents, newAgentData } = useContext(AgentsContext);
  const { allLeads } = useContext(LeadContext);
  const [showSidebar, setShowSidebar] = useState(true);

  const [agentName, setAgentName] = useState("none");
  const [selectedCloseTime, setSelectedCloseTime] = useState("none");
  const [priorityValue, setPriorityValue] = useState("none");

  const allFilteredLead = allLeads?.filter((lead) => {
    const agentMatch =
      agentName === "none" ? true : lead.salesAgent?.name === agentName;

    const priorityMatch =
      priorityValue === "none" ? true : lead.priority === priorityValue;

    const closeTimeMatch =
      selectedCloseTime === "none"
        ? true
        : lead.timeToClose == selectedCloseTime;

    return agentMatch && priorityMatch && closeTimeMatch;
  });

  const displayFilteredValue = allFilteredLead;

  const uniquePriority = [
    ...new Map(allLeads?.map((l) => [l.priority, l.priority])).values(),
  ];

  const uniqueTimes = [
    ...new Map(allLeads?.map((lead) => [lead.timeToClose, lead])).values(),
  ];

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <>
      <SalesAgentHeaderView toggleSidebar={toggleSidebar} />
      <main
        className="container-fluid py-4"
        style={{
          backgroundColor: "#f4f7fb",
          minHeight: "100vh",
        }}
      >
        <div className="row g-4">
          {showSidebar && (
            <div className="col-12 col-md-3">
              <div className="bg-white shadow rounded-4 p-4 h-100">
                <h3 className="text-center mb-4">SideBar</h3>
                <div className="d-flex flex-column gap-3">
                  <Link className="btn btn-outline-secondary" to="/">
                    <h5 className="mb-0">Back to Dashboard</h5>
                  </Link>

                  <Link
                    className="btn"
                    style={{ backgroundColor: "#4f6ef7", color: "#fff" }}
                    to="/addNewAgents"
                  >
                    <h5 className="mb-0">Add New Agent</h5>
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
                <h2 className="fw-bold text-dark">Lead List By Agent</h2>

                <p className="text-muted mb-0">
                  Filter leads by agent, priority, and closing time.
                </p>
              </div>

              <div
                className="row g-4 mb-5 rounded-4 p-4 shadow-sm"
                style={{ backgroundColor: "#f8fafc" }}
              >
                <div className="col-12 col-md-4">
                  <label htmlFor="agent" className="form-label fw-semibold">
                    Filter Agent
                  </label>

                  <select
                    name="agent"
                    id="agent"
                    className="form-select form-select-lg"
                    onChange={(e) => setAgentName(e.target.value)}
                  >
                    <option value="none">Select Agent Name</option>

                    {allAgents?.map((agent) => (
                      <option value={agent?.name} key={agent?._id}>
                        {agent?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-md-4">
                  <label htmlFor="priority" className="form-label fw-semibold">
                    Filter Priority
                  </label>

                  <select
                    name="priority"
                    id="priority"
                    className="form-select form-select-lg"
                    onChange={(e) => setPriorityValue(e.target.value)}
                  >
                    <option value="none">Select Priority</option>

                    {uniquePriority.map((priority, index) => (
                      <option key={index} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-md-4">
                  <label
                    htmlFor="timeToClose"
                    className="form-label fw-semibold"
                  >
                    Filter Time To Close
                  </label>

                  <select
                    name="timeToClose"
                    id="timeToClose"
                    className="form-select form-select-lg"
                    onChange={(e) => setSelectedCloseTime(e.target.value)}
                  >
                    <option value="none">Select Timing Days</option>

                    {uniqueTimes?.map((lead, index) => (
                      <option key={index} value={lead.timeToClose}>
                        {lead.timeToClose} Days
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row g-3">
                {displayFilteredValue?.length > 0 ? (
                  displayFilteredValue.map((lead) => (
                    <div className="col-12 col-md-6" key={lead._id}>
                      <div
                        className="rounded-4 shadow-sm p-3 h-100"
                        style={{ backgroundColor: "#ffffff", border: "1px solid #eef1f6" }}
                      >
                        <h5 className="fw-bold mb-2">{lead.name}</h5>

                        <p className="mb-1">
                          <strong>Agent:</strong>{" "}
                          {lead.salesAgent?.name || "Not Assigned"}
                        </p>

                        <div className="d-flex flex-wrap gap-2 mt-2">
                          <span
                            className="badge"
                            style={{ backgroundColor: "#ffedd5", color: "#9a3412" }}
                          >
                            {lead.priority}
                          </span>

                          <span
                            className="badge"
                            style={{ backgroundColor: "#dcfce7", color: "#166534" }}
                          >
                            {lead.status}
                          </span>

                          <span
                            className="badge"
                            style={{ backgroundColor: "#e0e7ff", color: "#3730a3" }}
                          >
                            {lead.timeToClose} Days
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5">
                    <h5>No Leads Found</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AgentsList;