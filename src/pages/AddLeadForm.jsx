import { useContext, useState } from "react";
import Footer from "../components/Footer";
import LeadContext from "../context/LeadContext";
import AddLeadFormHeader from "../components/Header/AddLeadFormHeader";
import { Link, useNavigate } from "react-router-dom";
import AgentsContext from "../context/AgentsContext";

const AddLeadForm = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { allAgents } = useContext(AgentsContext)

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const {
    leadsStatus,
    leads,
    name,
    setName,
    leadSource,
    setLeadSource,
    salesAgentId,
    status,
    setStatus,
    setSalesAgentId,
    priority,
    setPriority,
    timeToClose,
    setTimeToClose,
    tags,
    setTags,
    formLeadHandler,
    uniqueTags,
    uniqueStatus,
    uniqueSources,
    uniquePriorities,
    uniqueAgents,
  } = useContext(LeadContext);

  return (
    <>
      <AddLeadFormHeader toggleSidebar={toggleSidebar} />

      <main className="container-fluid py-3" style={{ minHeight: "100vh" }}>
        <div className="row g-3">
          {showSidebar && (
            <div className="col-12 col-md-3">
              <div className="bg-white shadow rounded-4 p-4 h-100">
                <h3 className="text-center mb-4">SideBar</h3>
                <div className="d-flex flex-column gap-3">
                  <Link className="btn btn-outline-secondary" to="/">
                    <h5 className="mb-0">Back to Dashboard</h5>
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className={showSidebar ? "col-12 col-md-9" : "col-12"}>
            <div className="bg-danger rounded-4 shadow-lg p-4 p-md-5 text-white">
              <h3 className="fs-2 text-center mb-4">Lead Management Form</h3>

              <div className="w-75 mx-auto mt-3">
                <form onSubmit={formLeadHandler}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="form-label fs-4 text-white"
                    >
                      Lead Name
                    </label>

                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Enter Lead Name"
                      value={name || ""}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="my-4">
                    <label className="form-label fs-4 text-white">
                      Lead Source
                    </label>

                    <select
                      className="form-select form-select-lg"
                      value={leadSource || ""}
                      onChange={(e) => setLeadSource(e.target.value)}
                    >
                      <option value="">Select Lead Source</option>

                      {uniqueSources?.map((source, index) => (
                        <option key={index} value={source}>
                          {source}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="my-4">
                    <label className="form-label fs-4 text-white">
                      Sales Agent
                    </label>

                    <select
                      className="form-select form-select-lg"
                      value={salesAgentId || ""}
                      onChange={(e) => setSalesAgentId(e.target.value)}
                    >
                      <option value="">Select Sales Agent</option>

                      {allAgents?.map((agent) => (
                        <option key={agent._id} value={agent._id}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="my-4">
                    <label className="form-label fs-4 text-white">
                      Lead Status
                    </label>

                    <select
                      className="form-select form-select-lg"
                      value={status || ""}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>

                      {uniqueStatus?.map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="my-4">
                    <label className="form-label fs-4 text-white">
                      Priority
                    </label>

                    <select
                      className="form-select form-select-lg"
                      value={priority || ""}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="">Select Priority</option>

                      {uniquePriorities?.map((pri, index) => (
                        <option key={index} value={pri}>
                          {pri}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="my-4">
                    <label className="form-label fs-4 text-white">
                      Time To Close
                    </label>

                    <input
                      className="form-control form-control-lg"
                      type="number"
                      placeholder="Days to close"
                      value={timeToClose || ""}
                      onChange={(e) => setTimeToClose(e.target.value)}
                    />
                  </div>

                  <div className="my-4">
                    <label className="form-label fs-4 text-white">Tags</label>

                    <select
                      className="form-select form-select-lg"
                      value={tags || ""}
                      onChange={(e) => setTags(e.target.value)}
                    >
                      <option value="">Select Tag</option>

                      {uniqueTags?.map((tag, index) => (
                        <option key={index} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-center mt-5">
                    <button
                      className="btn btn-primary px-5 py-2 fw-bold"
                      style={{ width: "30vw" }}
                      type="submit"
                    >
                      Create Lead
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AddLeadForm;
