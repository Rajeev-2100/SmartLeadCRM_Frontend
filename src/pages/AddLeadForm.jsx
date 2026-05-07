import { useContext, useState } from "react";
import Footer from "../components/Footer";
import LeadContext from "../context/LeadContext";
import AddLeadFormHeader from "../components/Header/AddLeadFormHeader";

const AddLeadForm = () => {
  const { leads } = useContext(LeadContext);
  const [formData, setFormData] = useState(false);
  const [name, setName] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [salesAgentId, setSalesAgentId] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [timeToClose, setTimeToClose] = useState(0);
  const [tags, setTags] = useState("");

  const formLeadHandler = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      source: leadSource,
      salesAgent: salesAgentId,
      status,
      priority,
      timeToClose,
      tags,
    };

    try {
      const res = await fetch(`http://localhost:3001/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log('Data: ',data)
      if (
        name !== "" &&
        leadSource !== "" &&
        salesAgent !== "" &&
        status !== "" &&
        priority !== "" &&
        timeToClose !== 0 &&
        tags !== ""
      ) {
        alert('Successfully Added the Lead Details')
        setFormData(true);
      }

      setName("");
      setLeadSource("");
      setSalesAgentId("");
      setStatus("");
      setPriority("");
      setTimeToClose("");
      setTags("");
    } catch (error) {
      throw error;
    }
  };

  const uniqueTags = [
    ...new Set(leads?.flatMap((lead) => lead.tags))
  ]

  // console.log(uniqueTags)

  const uniqueSources = [
    ...new Set(leads?.map((lead) => lead.source)).values()
  ]

  // console.log(uniqueSources)

  const uniqueAgents = [
    ...new Map(leads?.map((l) => [l.salesAgent._id, l.salesAgent])).values(),
  ];

  const uniquePriorities = [...new Set(leads?.map((lead) => lead.priority))];

  const uniqueStatus = [...new Set(leads?.map((lead) => lead.status))];

  return (
    <>
      <AddLeadFormHeader />
      <main className="container py-4" style={{ marginBottom: "3.5rem" }}>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ width: "100%" }}
        >
          <h1>Leads Form</h1>
          <form style={{ width: "100%" }} onSubmit={formLeadHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Lead Name:
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="form-control"
                id="name"
                value={name}
              />
            </div>
            <div className="mb-3">
              <label for="leadSource" className="form-label">
                Lead Source
              </label>
              <select
                name="leadSource"
                id="leadSource"
                value={leadSource || ""}
                className="form-select"
                onChange={(e) => setLeadSource(e.target.value)}
              >
                <option value="none">Select Lead Source</option>
                {uniqueSources?.map((source, index) => (
                  <>
                    <option value={source} key={index}>{source}</option>
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
                value={salesAgentId || ""}
                className="form-select"
                onChange={(e) => setSalesAgentId(e.target.value)}
              >
                <option value="none">Select SalesAgent Name</option>
                {uniqueAgents?.map((agent) => (
                  <>
                    <option value={agent._id}>{agent.name}</option>
                  </>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="leadStatus" className="form-label">
                Lead Status:{" "}
              </label>
              <select
                name="status"
                id="leadStatus"
                value={status || ""}
                className="form-select"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="none">Select Status</option>
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
                value={priority || ""}
                className="form-select"
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="none">Select Priority </option>
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
                id="timeToClose"
                value={timeToClose || ""}
                placeholder="Days to Close"
                onChange={(e) => setTimeToClose(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="leadTags" className="form-label">
                Tags:{" "}
              </label>
              <select
                name="tags"
                id="leadTags"
                className="form-select"
                value={tags || ""}
                onChange={(e) => setTags(e.target.value)}
              >
                <option value="none">Select Tag</option>
                {uniqueTags?.map((tag, index) => (
                  <>
                    <option value={tag} key={index}>{tag}</option>
                  </>
                ))}
              </select>
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" type="submit">
                Submit Button
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AddLeadForm;
