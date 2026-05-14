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
        : String(lead.timeToClose) === String(selectedCloseTime);

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

      <main className="container-fluid py-3" style={{ minHeight: "100vh" }}>
        <div className="row g-3">
          <div className="col-12 col-md-3">
            <div className="bg-light border rounded p-4 h-100">
              <h3 className="text-center mb-4">SideBar</h3>

              <hr />

              <div className="d-grid">
                <Link className="btn btn-outline-secondary" to={`/`}>
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-9">
            <div className="bg-danger rounded p-3 p-md-4 text-white">
              <h2 className="fw-bold text-center mb-4">Leads Management</h2>

              <div className="bg-light text-dark rounded p-3 mb-4">
                <div className="row g-3">
                  <div className="col-12 col-md-4">
                    <label htmlFor="status" className="form-label fw-bold">
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

                  <div className="col-12 col-md-4">
                    <label htmlFor="priority" className="form-label fw-bold">
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

                  <div className="col-12 col-md-4">
                    <label htmlFor="timeToClose" className="form-label fw-bold">
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
                </div>
              </div>

              <div className="row g-3">
                {filteredLeads?.length > 0 ? (
                  filteredLeads?.map((lead) => (
                    <div key={lead._id} className="col-12">
                      <div className="card shadow-sm border-0">
                        <div className="card-body">
                          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                            <div className="text-dark">
                              <h5 className="fw-bold">{lead.name}</h5>

                              <p className="mb-1">
                                <strong>Status:</strong> {lead.status}
                              </p>

                              <p className="mb-1">
                                <strong>Priority:</strong> {lead.priority}
                              </p>

                              <p className="mb-0">
                                <strong>Agent:</strong>{" "}
                                {lead.salesAgent?.name || "No Agent"}
                              </p>
                            </div>

                            <div>
                              <Link
                                to={`/leads/${lead._id}`}
                                className="btn btn-primary w-100"
                              >
                                Open Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5">
                    <h4>No Leads Found</h4>
                  </div>
                )}
              </div>

              <div className="w-100 add-lead-btn my-5 ">
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
};

export default Leads;
