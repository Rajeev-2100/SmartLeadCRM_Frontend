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

      <main>
        <div className="d-flex">
          <div
            className="d-flex flex-column align-items-center py-4 bg-light"
            style={{
              width: "25%",
              minHeight: "100vh",
            }}
          >
            <h3 className="fw-bold">Sidebar</h3>

            <hr className="w-75" />

            <Link className="text-decoration-none text-secondary" to={`/`}>
              <h5>Back to Dashboard</h5>
            </Link>
          </div>

          <div
            className="p-5"
            style={{
              width: "75%",
              backgroundColor: "#f5f7fb",
              minHeight: "100vh",
            }}
          >
            <div className="bg-white shadow rounded-4 p-4">
              <h3 className="text-center fw-bold mb-4">Edit Lead Management</h3>

              <form onSubmit={formLeadHandler}>
                <div className="mb-3">
                  <label className="form-label">Lead Name</label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Lead Source</label>

                  <select
                    name="source"
                    className="form-select"
                    value={formData.source}
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

                <div className="mb-3">
                  <label className="form-label">Sales Agent</label>

                  <select
                    name="salesAgent"
                    className="form-select"
                    value={formData.salesAgent}
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

                <div className="mb-3">
                  <label className="form-label">Lead Status</label>

                  <select
                    name="status"
                    className="form-select"
                    value={formData.status}
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

                <div className="mb-3">
                  <label className="form-label">Priority</label>

                  <select
                    name="priority"
                    className="form-select"
                    value={formData.priority}
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

                <div className="mb-3">
                  <label className="form-label">Time To Close</label>

                  <input
                    type="number"
                    name="timeToClose"
                    className="form-control"
                    value={formData.timeToClose}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Tags</label>

                  <select
                    name="tags"
                    className="form-select"
                    value={formData.tags}
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

                <div className="d-grid">
                  <button className="btn btn-primary" type="submit">
                    Update Lead
                  </button>
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
