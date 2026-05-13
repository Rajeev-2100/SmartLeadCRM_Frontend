import LeadStatusHeader from "../components/Header/LeadStatusHeader";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import LeadContext from "../context/LeadContext";
import useFetch from "../useFetch";

const LeadStatusView = () => {
  const [statusValue, setStatusValue] = useState("none");
  const { leadsStatus, allLeads } = useContext(LeadContext);
  const [selectedCloseTime, setSelectedCloseTime] = useState("none");
  const [priorityValue, setPriorityValue] = useState("none");

  // console.log('LeadStatus: ', leadsStatus)

  const { data: priority } = useFetch(
    `http://localhost:3001/leads/${statusValue}`,
  );

  const allFilteredLead = allLeads
    ?.filter((lead) =>
      statusValue === "none" ? true : lead.status === statusValue,
    )
    ?.filter((lead) =>
      priorityValue === "none" ? true : lead.priority === priorityValue,
    )
    ?.filter((lead) =>
      selectedCloseTime === "none" ? true : lead.timeToClose === Number(selectedCloseTime),
    );

  const isFilteredApplied = statusValue !== "none" || priorityValue !== "none" || selectedCloseTime !== "none" ? true : false
  const displayFilteredValue = isFilteredApplied ? allFilteredLead : allLeads;

  const uniquePriority = [
    ...new Map(allLeads?.map((l) => [l.priority, l.priority])).values(),
  ];

   const uniqueTimes = [
    ...new Map(allLeads?.map((lead) => [lead.timeToClose, lead])).values()
  ]

  return (
    <>
      <LeadStatusHeader />
      <main>
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
            className="d-flex flex-column align-items-center bg-danger py-4"
            style={{ width: "70%", marginBottom: "3.5rem" }}
          >
            <h3 className="fs-bold">Lead List by Status</h3>
            <div
              className="w-75 mt-3 d-flex flex-column flex-wrap"
              style={{ height: "100%", width: "85%" }}
            >
              <div className="d-flex column-gap-3 flex-wrap overflow-auto ">
                <label htmlFor="status" className="form-status fs-5">
                  Filter Status
                </label>
                <select
                  name="status"
                  id="status"
                  onChange={(e) => setStatusValue(e.target.value)}
                  className="form-select"
                >
                  <option value="none">Select Status</option>
                  {leadsStatus?.map((status) => (
                    <>
                      <option value={status._id}>{status._id}</option>
                    </>
                  ))}
                </select>
              </div>

              <hr />

              <div className="d-flex flex-column column-gap-3 flex-wrap overflow-auto ">
                {displayFilteredValue?.map((lead) => (
                  <>
                    <div className="d-flex justify-content-between">
                      <p className="fs-5">{lead.name} </p>
                      <p>
                        <b className="fs-6">{lead.salesAgent?.name || "No Agent Assigned"}</b>
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LeadStatusView;
