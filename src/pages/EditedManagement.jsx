// EditedManagement.jsx
import { Link, useNavigate, useParams } from "react-router-dom";
import EditedManagementHeader from "../components/Header/EditedManagementHeader";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import LeadContext from "../context/LeadContext";
import AgentsContext from "../context/AgentsContext";
import { toast } from "react-toastify";

const EditedManagement = () => {
  const { leadId } = useParams();
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  const navigation = useNavigate();

  const { allLeads, newLeadData, setNewLeadData } = useContext(LeadContext);

  const { allAgents } = useContext(AgentsContext);

  const displayLeads = newLeadData?.length > 0 ? newLeadData : allLeads || [];

  const leadDetails = displayLeads.find((lead) => lead._id === leadId);

  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    priority: "",
    timeToClose: 1,
    tags: "",
  });

  useEffect(() => {
    if (leadDetails) {
      setFormData({
        name: leadDetails.name || "",
        source: leadDetails.source || "",
        salesAgent: leadDetails.salesAgent?._id || "",
        status: leadDetails.status || "",
        priority: leadDetails.priority || "",
        timeToClose: leadDetails.timeToClose || 1,
        tags: Array.isArray(leadDetails.tags) ? leadDetails.tags[0] || "" : "",
      });
    }
  }, [leadDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "timeToClose" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, source, salesAgent, status, priority, timeToClose, tags } =
      formData;

    if (
      !name ||
      !source ||
      !salesAgent ||
      !status ||
      !priority ||
      !timeToClose ||
      !tags
    ) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      name,
      source,
      salesAgent,
      status,
      priority,
      timeToClose: Number(timeToClose),
      tags: [tags],
    };

    try {
      const res = await fetch(
        `https://crm-backend-tawny.vercel.app/leads/${leadId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success("Successfully, Edited the Lead Details");

      setNewLeadData((prev) =>
        (prev || allLeads).map((lead) =>
          lead._id === leadId ? data.data : lead,
        ),
      );

      navigation("/leads");
    } catch (error) {
      console.log(error);
    }
  };

  const uniqueAgents = [...new Map(allAgents?.map((a) => [a._id, a])).values()];

  const uniquePriorities = [...new Set(displayLeads.map((l) => l.priority))];

  const uniqueStatus = [...new Set(displayLeads.map((l) => l.status))];

  const uniqueSources = [...new Set(displayLeads.map((l) => l.source))];

  const uniqueTags = [...new Set(displayLeads.flatMap((l) => l.tags || []))];

  return (
    <>
      <EditedManagementHeader toggleSidebar={toggleSidebar} />

      <main
        className="container-fluid py-4"
        style={{ backgroundColor: "#f4f7fb", minHeight: "100vh" }}
      >
        <div className="row g-3">
          {showSidebar && (
            <div className="col-12 col-md-3">
              <div className="bg-white shadow-sm rounded-4 p-4 h-100">
                <h4 className="fw-bold text-center mb-4">Sidebar</h4>
                <hr />

                <div className="d-grid gap-3">
                  <Link className="btn btn-outline-secondary" to="/">
                    Dashboard
                  </Link>
                  <Link
                    className="btn"
                    style={{ backgroundColor: "#4f6ef7", color: "#fff" }}
                    to="/leads"
                  >
                    Leads
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className={showSidebar ? "col-12 col-md-9" : "col-12"}>
            <div
              className="rounded-4 shadow-lg p-4 p-md-5"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e3e8ef", height: "96vh" }}
            >
              <div className="text-center mb-4">
                <h2 className="fw-bold text-dark">Edit Lead Management</h2>
                <p className="text-muted">Update lead information</p>
              </div>
              <div className="w-75 mx-auto mt-3">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12 mb-3">
                      <label htmlFor="name"><b>Lead Name: </b></label>
                      <input
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Lead Name"
                      />
                    </div>

                    <div className="col-md-6  mb-3">
                      <label htmlFor="source"><b>Source: </b></label>
                      <select
                        className="form-select"
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                      >
                        <option value="">Source</option>
                        {uniqueSources.map((s, i) => (
                          <option key={i}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="agentName"><b>Lead Owner Name: </b></label>
                      <select
                        className="form-select"
                        name="salesAgent"
                        value={formData.salesAgent}
                        onChange={handleChange}
                      >
                        <option value="">Agent</option>
                        {uniqueAgents.map((a) => (
                          <option key={a._id} value={a._id}>
                            {a.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="status"><b>Lead Status: </b></label>
                      <select
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="">Status</option>
                        {uniqueStatus.map((s, i) => (
                          <option key={i}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="priority"><b>Priority: </b></label>
                      <select
                        className="form-select"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                      >
                        <option value="">Priority</option>
                        {uniquePriorities.map((p, i) => (
                          <option key={i}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="timeToClose"><b>Time of Close Days: </b></label>
                      <input
                        type="number"
                        className="form-control"
                        name="timeToClose"
                        value={formData.timeToClose}
                        onChange={handleChange}
                        placeholder="Days To Close"
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="tags"><b>Tags: </b></label>
                      <select
                        className="form-select"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                      >
                        <option value="">Tags</option>
                        {uniqueTags.map((t, i) => (
                          <option key={i}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12 mb-5">
                      <button
                        className="btn w-100"
                        style={{ backgroundColor: "#4f6ef7", color: "#fff" }}
                      >
                        Update Lead
                      </button>
                    </div>
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

export default EditedManagement;