import { Link, useParams } from "react-router-dom";
import EditedManagementHeader from "../components/Header/EditedManagementHeader";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import LeadContext from "../context/LeadContext";
import AgentsContext from "../context/AgentsContext";

const EditedManagement = () => {
  const { leadId } = useParams();
  const { leads } = useContext(LeadContext);
  const { agents } = useContext(AgentsContext);
  const leadDetails = leads?.find((lead) => lead._id == leadId);

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
        timeToClose: leadDetails.timeToClose || 0,
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

    // console.log(formData);

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
      // console.log("Data: ", data);

      if (res.ok) {
        alert("Lead updated successfully");
        setFormData({
          name: "",
          source: "",
          salesAgent: salesAgent._id || "",
          status: "",
          priority: "",
          timeToClose: 1,
          tags: "",
        });
        return;
      }
    } catch (error) {
      // console.error(error);
      alert("Something went wrong");
    }
  };

  const uniqueAgents = [
    ...new Map(agents?.map((agent) => [agent.name, agent])).values(),
  ];
  const uniquePriorities = [...new Set(leads?.map((lead) => lead.priority))];
  const uniqueStatus = [...new Set(leads?.map((lead) => lead.status))];
  const uniqueSources = [...new Set(leads?.map((l) => l.source))];
  const uniqueTags = [...new Set(leads?.flatMap((l) => l.tags || []))];
  // console.log("Unique Agents: ", uniqueAgents);

  return (
    <>
      <EditedManagementHeader />
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
            className="d-flex flex-column bg-danger p-4"
            style={{ width: "70%" }}
          >
            <div className="">
              <h5 className="text-center fs-3">
                Form Edition of Lead Management{" "}
              </h5>
              <form
                style={{ width: "100%", height: "100vh" }}
                onSubmit={formLeadHandler}
              >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Lead Name:
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                    name="name"
                    value={formData?.name || ""}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="source" className="form-label">
                    Lead Source
                  </label>
                  <select
                    name="source"
                    id="source"
                    className="form-select"
                    onChange={handleChange}
                    value={formData?.source || ""}
                  >
                    <option value="">Select the source</option>
                    {uniqueSources?.map((src, i) => (
                      <>
                        <option key={i} value={src}>
                          {src}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="salesAgent" className="form-label">
                    Sales Agent:{" "}
                  </label>
                  <select
                    name="salesAgent"
                    id="salesAgent"
                    value={formData?.salesAgent || ""}
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Select the Agent</option>
                    {uniqueAgents?.map((agent) => (
                      <>
                        <option key={agent._id} value={agent._id}>
                          {agent.name}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Lead Status:{" "}
                  </label>
                  <select
                    name="status"
                    id="status"
                    value={formData.status || ""}
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Select the Status</option>
                    {uniqueStatus?.map((status, index) => (
                      <>
                        <option value={status} key={index}>
                          {status}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="leadPriority" className="form-label">
                    Priority:{" "}
                  </label>
                  <select
                    name="priority"
                    id="leadPriority"
                    value={formData?.priority || ""}
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Select the Priority</option>
                    {uniquePriorities?.map((pri, index) => (
                      <>
                        <option value={pri} key={index}>
                          {pri}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="timeToClose" className="form-label">
                    Time to Close:{" "}
                  </label>
                  <br />
                  <input
                    type="number"
                    name="timeToClose"
                    placeholder="Days to Close"
                    value={formData?.timeToClose || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="leadTags" className="form-label">
                    Tags:{" "}
                  </label>
                  <select
                    name="tags"
                    value={formData?.tags || ""}
                    id="leadTags"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Select the tag</option>
                    {uniqueTags?.map((tag, i) => (
                      <>
                        <option key={i} value={tag}>
                          {tag}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <br />
                <div className="mt-2 d-grid gap-2">
                  <button className="btn btn-primary" type="submit">
                    Submit Button
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
