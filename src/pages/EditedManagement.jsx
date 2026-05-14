import { Link, useNavigate, useParams } from "react-router-dom";
import EditedManagementHeader from "../components/Header/EditedManagementHeader";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import LeadContext from "../context/LeadContext";
import AgentsContext from "../context/AgentsContext";

const EditedManagement = () => {
  const { leadId } = useParams();

  const navigation = useNavigate();

  const { allLeads, newLeadData, setNewLeadData } = useContext(LeadContext);

  const { allAgents } = useContext(AgentsContext);

  const displayLeads = newLeadData?.length > 0 ? newLeadData : allLeads;

  const leadDetails = displayLeads?.find((lead) => lead._id === leadId);

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
        tags: leadDetails.tags || "",
      });
    }
  }, [leadDetails]);

  const EditFormHandler = async (e) => {
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
      const res = await fetch(`http://localhost:3001/leads/${leadId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Lead Updated Successfully");

        const updatedLeadList = allLeads.map((lead) =>
          lead._id === leadId ? data.data : lead,
        );

        setNewLeadData(updatedLeadList);

        navigation("/leads");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "timeToClose" ? Number(value) : value,
    }));
  };

  const formLeadHandler = async (e) => {
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

    try {
      const res = await fetch(`http://localhost:3001/leads/${leadId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Lead Updated Successfully");

        const updatedLeadList = displayLeads?.map((lead) =>
          lead._id === leadId ? data.data : lead,
        );

        setNewLeadData(updatedLeadList);

        navigation("/leads");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  const uniqueAgents = [
    ...new Map(allAgents?.map((agent) => [agent._id, agent])).values(),
  ];

  const uniquePriorities = [
    ...new Set(displayLeads?.map((lead) => lead.priority)),
  ];

  const uniqueStatus = [...new Set(displayLeads?.map((lead) => lead.status))];

  const uniqueSources = [...new Set(displayLeads?.map((lead) => lead.source))];

  const uniqueTags = [
    ...new Set(displayLeads?.flatMap((lead) => lead.tags || [])),
  ];

  return (
    <>
      <EditedManagementHeader />

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

                <Link className="btn btn-outline-primary rounded-3" to="/leads">
                  Back to Leads
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-9">
            <div className="bg-white shadow rounded-4 p-4 p-md-5">
              <div className="mb-4 text-center">
                <h2 className="fw-bold">Edit Lead Management</h2>

                <p className="text-secondary mb-0">
                  Update lead information and manage sales details.
                </p>
              </div>

              <form onSubmit={formLeadHandler}>
                <div className="row g-4">
                  {/* Lead Name */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Lead Name</label>

                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Enter lead name"
                      value={formData?.name || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Lead Source
                    </label>

                    <select
                      name="source"
                      className="form-select form-select-lg"
                      value={formData?.source || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Source</option>

                      {uniqueSources?.map((src, index) => (
                        <option key={index} value={src}>
                          {src}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Sales Agent
                    </label>

                    <select
                      name="salesAgent"
                      className="form-select form-select-lg"
                      value={formData?.salesAgent || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Agent</option>

                      {uniqueAgents?.map((agent) => (
                        <option key={agent._id} value={agent._id}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Lead Status
                    </label>

                    <select
                      name="status"
                      className="form-select form-select-lg"
                      value={formData?.status || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Status</option>

                      {uniqueStatus?.map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Priority</label>

                    <select
                      name="priority"
                      className="form-select form-select-lg"
                      value={formData?.priority || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Priority</option>

                      {uniquePriorities?.map((priority, index) => (
                        <option key={index} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Time To Close
                    </label>

                    <input
                      type="number"
                      name="timeToClose"
                      className="form-control form-control-lg"
                      placeholder="Days"
                      value={formData?.timeToClose || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Tags</label>

                    <select
                      name="tags"
                      className="form-select form-select-lg"
                      value={formData?.tags || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Tag</option>

                      {uniqueTags?.map((tag, index) => (
                        <option key={index} value={tag}>
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
                      Update Lead
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

export default EditedManagement;
