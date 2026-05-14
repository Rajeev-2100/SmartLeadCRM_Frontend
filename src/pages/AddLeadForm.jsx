import { useContext, useState } from "react";
import Footer from "../components/Footer";
import LeadContext from "../context/LeadContext";
import AddLeadFormHeader from "../components/Header/AddLeadFormHeader";
import { useNavigate } from "react-router-dom";

const AddLeadForm = () => {
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
      <AddLeadFormHeader />

      <main
        className="container-fluid py-4"
        style={{
          backgroundColor: "#f4f7fb",
          minHeight: "100vh",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="bg-white shadow rounded-4 p-4 p-md-5">
              <div className="text-center mb-5">
                <h2 className="fw-bold">Lead Management Form</h2>

                <p className="text-secondary mb-0">
                  Create and manage new sales leads.
                </p>
              </div>

              <form onSubmit={formLeadHandler}>
                <div className="row g-4">
                  {/* Lead Name */}
                  <div className="col-12">
                    <label htmlFor="name" className="form-label fw-semibold">
                      Lead Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      placeholder="Enter lead name"
                      className="form-control form-control-lg"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label
                      htmlFor="leadSource"
                      className="form-label fw-semibold"
                    >
                      Lead Source
                    </label>

                    <select
                      name="leadSource"
                      id="leadSource"
                      value={leadSource || ""}
                      className="form-select form-select-lg"
                      onChange={(e) => setLeadSource(e.target.value)}
                    >
                      <option value="">Select Lead Source</option>

                      {uniqueSources?.map((source, index) => (
                        <option value={source} key={index}>
                          {source}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label
                      htmlFor="salesAgent"
                      className="form-label fw-semibold"
                    >
                      Sales Agent
                    </label>

                    <select
                      name="salesAgent"
                      id="salesAgent"
                      value={salesAgentId || ""}
                      className="form-select form-select-lg"
                      onChange={(e) => setSalesAgentId(e.target.value)}
                    >
                      <option value="">Select Sales Agent</option>

                      {uniqueAgents?.map((agent) => (
                        <option value={agent._id} key={agent._id}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label
                      htmlFor="leadStatus"
                      className="form-label fw-semibold"
                    >
                      Lead Status
                    </label>

                    <select
                      name="status"
                      id="leadStatus"
                      value={status || ""}
                      className="form-select form-select-lg"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>

                      {uniqueStatus?.map((status, index) => (
                        <option value={status} key={index}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label
                      htmlFor="leadPriority"
                      className="form-label fw-semibold"
                    >
                      Priority
                    </label>

                    <select
                      name="priority"
                      id="leadPriority"
                      value={priority || ""}
                      className="form-select form-select-lg"
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="">Select Priority</option>

                      {uniquePriorities?.map((pri, index) => (
                        <option value={pri} key={index}>
                          {pri}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label
                      htmlFor="timeToClose"
                      className="form-label fw-semibold"
                    >
                      Time To Close
                    </label>

                    <input
                      type="number"
                      id="timeToClose"
                      placeholder="Days to close"
                      className="form-control form-control-lg"
                      value={timeToClose || ""}
                      onChange={(e) => setTimeToClose(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <label
                      htmlFor="leadTags"
                      className="form-label fw-semibold"
                    >
                      Tags
                    </label>

                    <select
                      name="tags"
                      id="leadTags"
                      className="form-select form-select-lg"
                      value={tags || ""}
                      onChange={(e) => setTags(e.target.value)}
                    >
                      <option value="">Select Tag</option>

                      {uniqueTags?.map((tag, index) => (
                        <option value={tag} key={index}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 pt-2">
                    <button
                      className="btn btn-primary btn-lg w-100 rounded-3"
                      type="submit"
                    >
                      Create Lead
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AddLeadForm;
