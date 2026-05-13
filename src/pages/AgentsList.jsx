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
      <main className="py-0">
        <div className="d-flex">
          <div
            className="d-flex flex-column align-items-center py-4"
            style={{ width: "30%", height: "100%" }}
          >
            <h3>SideBar</h3>
            <hr className="bg-danger" />
            <Link
              className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              to={`/`}
            >
              <h5>Back to Dashboard</h5>
            </Link>
          </div>

          <div
            className="d-flex flex-column align-items-center bg-danger py-5"
            style={{ width: "70%", marginBottom: "3.5rem", left: 0 }}
          >
            <h3 className="fs-bold">Lead List by Agent</h3>
            <div
              className="w-75 mt-2 d-flex flex-column flex-wrap py-4"
              style={{ height: "100%", width: "85%" }}
            >
              <div className="d-flex column-gap-3 flex-wrap overflow-auto">
                <label htmlFor="status" className="form-status fs-5">
                  Filter Agent
                </label>
                <select
                  name="agent"
                  id="agent"
                  onChange={(e) => setAgentName(e.target.value)}
                  className="form-select"
                >
                  <option value="none">Select the Agent Name</option>
                  {allAgents?.map((agent) => {
                    // console.log('Agent: ',agent),
                    return (
                      <>
                        <option value={agent?.name} key={agent?._id}>
                          {agent?.name}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>

              <hr />

              <div className="d-flex flex-column column-gap-3 flex-wrap overflow-auto ">
                {displayFilteredValue?.map((lead) => (
                  // console.log("SalesAgent: ", lead),
                  <>
                    <div className="d-flex justify-content-between">
                      <p className="fs-5">{lead.name} </p>
                      <p>
                        <b className="fs-6">
                          {lead.salesAgent?.name || "No Assigned"}
                        </b>
                      </p>
                    </div>
                  </>
                ))}
              </div>

              <hr />

              <div className="d-flex column-gap-3 flex-wrap overflow-auto ">
                <label htmlFor="priority" className="form-label fs-5">
                  Filter Priority:{" "}
                </label>
                <select
                  name="priority"
                  id="priority"
                  className="form-select"
                  onChange={(e) => setPriorityValue(e.target.value)}
                >
                  <option value="none">Select the priority</option>
                  {uniquePriority.map((priority, index) => (
                    <>
                      <option key={index} value={priority}>
                        {priority}
                      </option>
                    </>
                  ))}
                </select>
              </div>

              <hr />

              <div className="d-flex column-gap-3 flex-wrap overflow-auto">
                <label htmlFor="timeToClose" className="form-label fs-5">
                  Filter Time to Close:{" "}
                </label>
                <select
                  name="timeToClose"
                  id="timeToClose"
                  className="form-select"
                  onChange={(e) => setSelectedCloseTime(e.target.value)}
                >
                  <option value="none">Select the time</option>
                  {uniqueTimes?.map((lead) => (
                    <>
                      <option value={lead.timeToClose}>
                        {lead.timeToClose}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <hr />

              <div className="text-center">
                <Link
                  className="btn btn-primary py-2 px-5"
                  to={`/addNewAgents`}
                >
                  Add New Agent
                </Link>
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
