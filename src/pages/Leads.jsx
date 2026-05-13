import Footer from "../components/Footer";
import { useContext, useState } from "react";
import LeadContext from "../context/LeadContext";
import { Link } from "react-router-dom";
import LeadListHeader from "../components/Header/LeadListHeader";
import AgentsContext from "../context/AgentsContext";

const Leads = () => {
  const { leads } = useContext(LeadContext);
  const { agents } = useContext(AgentsContext);
  console.log(leads)

  const [selectedAgent, setSelectedAgent] = useState("none");
  const [selectedCloseTime, setSelectedCloseTime] = useState("none");

  const bothFilteredLead = leads
    ?.filter((lead) =>
      selectedAgent === "none" ? true : lead.salesAgent?.name === selectedAgent,
    )
    ?.filter((lead) =>
      selectedCloseTime === "none"
        ? true
        : lead.timeToClose === Number(selectedCloseTime),
    );

  const uniqueTimes = [
    ...new Map(leads?.map((agent) => [agent.timeToClose, agent])).values()
  ]

  const uniqueAgents = [
    ...new Map(agents?.map((agent) => [agent.name, agent])).values(),
  ];

  console.log('Unique Agent: ', uniqueAgents);
  
  return (
    <>
      <LeadListHeader />
      <main className="py-0 " style={{ height: "100vh" }}>
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
            className="d-flex flex-column align-items-center bg-danger py-4 "
            style={{ width: "70%", marginBottom: "3.5rem" }}
          >
            <h3 className="fs-bold">Lead Overview</h3>
            <div
              className="w-75 mt-3 d-flex flex-column"
              style={{ height: "100%" }}
            >
              <div
                className="d-flex column-gap-3 flex-wrap overflow-auto"
                style={{ flex: 1, minHeight: 0 }}
              >
                {bothFilteredLead?.map(
                  (lead) => (
                    (
                      <div
                        key={lead._id}
                        className="border p-2 m-1 bg-light"
                        style={{ width: "30%", height: "10rem" }}
                      >
                        <p className="m-0">
                          <strong>{lead.name}</strong>
                        </p>
                        <p className="m-0">
                          <b>Status:</b> {lead.status}
                        </p>
                        <p>
                          <b>Name: </b>
                          {lead.salesAgent?.name || "Unassigned Agent"}
                        </p>
                        <Link
                          className="btn btn-primary mb-3"
                          to={`/leads/${lead._id}`}
                        >
                          Lead Details
                        </Link>
                        <br />
                      </div>
                    )
                  ),
                )}
              </div>
              <hr />

              <div className="d-flex flex-column">
                <label htmlFor="salesAgent">
                  <h5>Filter By Sales Agent: </h5>
                </label>
                <select
                  name="salesAgent"
                  id="salesAgent"
                  onChange={(e) => setSelectedAgent(e.target.value)}
                >
                  <option value="none">Filter By Sales Agent</option>
                  {uniqueAgents?.map((agent) => (
                    <>
                      <option value={agent.name} key={agent._id}>
                        {agent.name}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <br />

              <div className="d-flex flex-column">
                <label htmlFor="sortBy">
                  <h5>Sort by: (Time-To-Close)</h5>
                </label>
                <select
                  name="sortBy"
                  id="sortBy"
                  onChange={(e) => setSelectedCloseTime(e.target.value)}
                >
                  <option value="none">Priority </option>
                  {uniqueTimes?.map((agent) => (
                    <>
                      <option value={agent?.timeToClose} key={agent._id}>
                        {agent?.timeToClose}
                      </option>
                    </>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <Link to={`/addleadform`} className="btn btn-primary">
                  Add New Lead{" "}
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

export default Leads;
