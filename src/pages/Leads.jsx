import Footer from "../components/Footer";
import { useContext, useState } from "react";
import LeadContext from "../context/LeadContext";
import { Link } from "react-router-dom";
import LeadListHeader from "../components/Header/LeadListHeader";

const Leads = () => {
  const { allLeads, newLeadData } = useContext(LeadContext);

  const displayLeads = newLeadData?.length > 0 ? newLeadData : allLeads;

  const [statusValue, setStatusValue] = useState("none");

  const [priorityValue, setPriorityValue] = useState("none");

  const [selectedCloseTime, setSelectedCloseTime] = useState("none");

  const filteredLeads = displayLeads?.filter((lead) => {
    const statusMatch =
      statusValue === "none" ? true : lead.status === statusValue;

    const priorityMatch =
      priorityValue === "none" ? true : lead.priority === priorityValue;

    const closeTimeMatch =
      selectedCloseTime === "none"
        ? true
        : lead.timeToClose == selectedCloseTime;

    return statusMatch && priorityMatch && closeTimeMatch;
  });

  const uniqueStatus = [...new Set(displayLeads?.map((lead) => lead.status))];

  const uniquePriority = [
    ...new Set(displayLeads?.map((lead) => lead.priority)),
  ];

  const uniqueTimes = [
    ...new Set(displayLeads?.map((lead) => lead.timeToClose)),
  ];

  return (
    <>
      <LeadListHeader />

      <main className="py-0">
        <div className="d-flex">
          <div
            className="d-flex flex-column align-items-center py-4"
            style={{
              width: "30%",
              height: "100%",
            }}
          >
            <h3>SideBar</h3>

            <hr className="bg-danger w-100" />

            <Link
              className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              to={`/`}
            >
              <h5>Back to Dashboard</h5>
            </Link>
          </div>

          <div
            className="d-flex flex-column align-items-center bg-danger py-5"
            style={{
              width: "70%",
              marginBottom: "3.5rem",
            }}
          >
            <h3 className="fw-bold">Leads Management</h3>

            <div
              className="w-75 mt-2 d-flex flex-column flex-wrap py-4"
              style={{
                height: "100%",
                width: "85%",
              }}
            >
              <div className="d-flex column-gap-3 flex-wrap overflow-auto">
                <label htmlFor="status" className="form-label fs-5">
                  Filter Status
                </label>

                <select
                  name="status"
                  id="status"
                  className="form-select"
                  onChange={(e) => setStatusValue(e.target.value)}
                >
                  <option value="none">Select Status</option>

                  {uniqueStatus?.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <hr />

              <div className="d-flex column-gap-3 flex-wrap overflow-auto">
                <label htmlFor="priority" className="form-label fs-5">
                  Filter Priority
                </label>

                <select
                  name="priority"
                  id="priority"
                  className="form-select"
                  onChange={(e) => setPriorityValue(e.target.value)}
                >
                  <option value="none">Select Priority</option>

                  {uniquePriority?.map((priority, index) => (
                    <option key={index} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>

              <hr />

              <div className="d-flex column-gap-3 flex-wrap overflow-auto">
                <label htmlFor="timeToClose" className="form-label fs-5">
                  Filter Time To Close
                </label>

                <select
                  name="timeToClose"
                  id="timeToClose"
                  className="form-select"
                  onChange={(e) => setSelectedCloseTime(e.target.value)}
                >
                  <option value="none">Select Time</option>

                  {uniqueTimes?.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <hr />

              <div className="d-flex flex-column gap-3">
                {filteredLeads?.length > 0 ? (
                  filteredLeads?.map((lead) => (
                    <div
                      key={lead._id}
                      className="bg-light p-3 rounded shadow-sm"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5>{lead.name}</h5>

                          <p className="mb-1">
                            <b>Status:</b> {lead.status}
                          </p>

                          <p className="mb-1">
                            <b>Priority:</b> {lead.priority}
                          </p>

                          <p className="mb-1">
                            <b>Agent:</b> {lead.salesAgent?.name || "No Agent"}
                          </p>
                        </div>

                        <div>
                          <Link
                            to={`/edited/${lead._id}`}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h4 className="text-white text-center">No Leads Found</h4>
                )}
              </div>

              <hr />

              <div className="text-center">
                <Link
                  className="btn btn-light px-5 py-2"
                  to={`/leadManagement`}
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
};

export default Leads;
