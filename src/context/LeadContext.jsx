import { createContext, useContext, useState } from "react";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";

const LeadContext = createContext();

export function LeadProvider({ children }) {
  const { data } = useFetch(`http://localhost:3001/leads/`);
  const leads = data?.data;

  const { data: statusValue } = useFetch(`http://localhost:3001/leads/status-count`)

  const leadsStatus = statusValue?.data
  // console.log("Lead Status: ", leadStatus)


  const [newLeadData, setNewLeadData] = useState([])
  const [formData, setFormData] = useState(false);
  const [name, setName] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [salesAgentId, setSalesAgentId] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [timeToClose, setTimeToClose] = useState(0);
  const [tags, setTags] = useState("");
  const navigation = useNavigate()

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
        salesAgentId !== "" &&
        status !== "" &&
        priority !== "" &&
        timeToClose !== 0 &&
        tags !== ""
      ) {
        alert('Successfully Added the Lead Details')
        setFormData(true);
        setNewLeadData((prev) => [...(prev || []), data.data])
        navigation('/leads')
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

  const allLeads = [...(leads || []), ...(newLeadData || [])]

  const uniqueTags = [
    ...new Set(leads?.flatMap((lead) => lead.tags))
  ]

  const uniqueSources = [
    ...new Set(leads?.map((lead) => lead.source)).values()
  ]

  const uniqueAgents = [
    ...new Map(leads?.map((l) => [l.salesAgent._id, l.salesAgent])).values(),
  ];

  const uniquePriorities = [...new Set(leads?.map((lead) => lead.priority))];

  const uniqueStatus = [...new Set(leads?.map((lead) => lead.status))];

  return (
    <LeadContext.Provider value={{ leadsStatus, allLeads, setNewLeadData, leads, name, setName, leadSource, setLeadSource, status, setStatus, salesAgentId, setSalesAgentId, priority, setPriority, timeToClose, setTimeToClose, tags, setTags, formLeadHandler, uniqueTags, uniqueStatus, uniqueSources, uniquePriorities, uniqueAgents }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLead() {
  const context = useContext(LeadContext);

  if (!context) {
    throw new Error("useLead must be used within LeadProvider");
  }

  return context;
}

export default LeadContext;