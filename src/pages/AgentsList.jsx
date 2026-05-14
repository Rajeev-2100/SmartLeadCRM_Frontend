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
  // console.log("Agent Name: ", allAgents);

  console.log("AllLead: ", allLeads);
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
  console.log("displayFilteredValue: ", displayFilteredValue);

  const uniquePriority = [
    ...new Map(allLeads?.map((l) => [l.priority, l.priority])).values(),
  ];
  console.log("uniquePriority: ", uniquePriority);

  const uniqueTimes = [
    ...new Map(allLeads?.map((lead) => [lead.timeToClose, lead])).values(),
  ];

  return (
    <>
      <SalesAgentHeaderView />
      <main
        className="container-fluid py-4"
        style={{
          backgroundColor: "#f4f7fb",
          minHeight: "100vh",
        }}
      >
        <div className="row g-4">
          <div className="col-12 col-md-3">
            <div
              className="bg-white shadow-sm rounded-4 p-4 h-100"
              style={{
                minHeight: "85vh",
              }}
            >
              <h4 className="fw-bold text-center mb-4">Sidebar</h4>

              <hr />

              <div className="d-grid gap-3">
                <Link className="btn btn-outline-secondary rounded-3" to="/">
                  Back to Dashboard
                </Link>

                <Link className="btn btn-primary rounded-3" to="/addNewAgents">
                  Add New Agent
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-9">
            <div className="bg-white shadow rounded-4 p-4 p-md-5">
              <div className="text-center mb-5">
                <h2 className="fw-bold">Lead List By Agent</h2>

                <p className="text-secondary mb-0">
                  Filter leads by agent, priority, and closing time.
                </p>
              </div>

              <div className="row g-4 mb-5">
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
                    <option value="none">Select Time</option>

                    {uniqueTimes?.map((lead, index) => (
                      <option key={index} value={lead.timeToClose}>
                        {lead.timeToClose} Days
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row g-4">
                {displayFilteredValue?.length > 0 ? (
                  displayFilteredValue?.map((lead) => (
                    <div className="col-12" key={lead._id}>
                      <div className="border rounded-4 p-4 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                          <div>
                            <h5 className="fw-bold mb-1">{lead.name}</h5>

                            <p className="text-secondary mb-0">
                              Assigned Agent:{" "}
                              <span className="fw-semibold">
                                {lead.salesAgent?.name || "No Assigned"}
                              </span>
                            </p>
                          </div>

                          <div className="d-flex gap-2 flex-wrap">
                            <span className="badge bg-primary px-3 py-2">
                              {lead.priority}
                            </span>

                            <span className="badge bg-success px-3 py-2">
                              {lead.status}
                            </span>

                            <span className="badge bg-dark px-3 py-2">
                              {lead.timeToClose} Days
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="text-center py-5">
                      <h5 className="text-secondary">No Leads Found</h5>
                    </div>
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
