import { createContext, useContext, useState } from "react";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";

const LeadContext = createContext();

export function LeadProvider({ children }) {
  const { data } = useFetch(`http://localhost:3001/leads/`);

  const leads = data?.data || [];

  const { data: statusValue } = useFetch(
    `http://localhost:3001/leads/status-count`,
  );

  const leadsStatus = statusValue?.data;

  const [newLeadData, setNewLeadData] = useState([]);

  const [name, setName] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [salesAgentId, setSalesAgentId] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [timeToClose, setTimeToClose] = useState(0);
  const [tags, setTags] = useState("");

  const navigation = useNavigate();

  const allLeads = newLeadData.length > 0 ? newLeadData : leads;

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

      if (
        res.ok &&
        name !== "" &&
        leadSource !== "" &&
        salesAgentId !== "" &&
        status !== "" &&
        priority !== "" &&
        timeToClose !== 0 &&
        tags !== ""
      ) {
        alert("Successfully Added the Lead Details");

        const updatedLeads =
          newLeadData.length > 0
            ? [...newLeadData, data.data]
            : [...leads, data.data];

        setNewLeadData(updatedLeads);

        navigation("/leads");
      }

      setName("");
      setLeadSource("");
      setSalesAgentId("");
      setStatus("");
      setPriority("");
      setTimeToClose("");
      setTags("");
    } catch (error) {
      console.log(error);
    }
  };

  const deletedLeadByLeadId = async (leadId) => {
    try {
      const res = await fetch(`http://localhost:3001/leads/${leadId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Successfully Deleted Lead");

        const updatedLeads =
          newLeadData.length > 0
            ? newLeadData.filter((lead) => lead._id !== leadId)
            : leads.filter((lead) => lead._id !== leadId);

        setNewLeadData(updatedLeads);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uniqueTags = [...new Set(allLeads?.flatMap((lead) => lead.tags))];

  const uniqueSources = [...new Set(allLeads?.map((lead) => lead.source))];

  const uniqueAgents = [
    ...new Map(
      allLeads
        ?.filter((lead) => lead.salesAgent)
        ?.map((lead) => [lead.salesAgent._id, lead.salesAgent]),
    ).values(),
  ];

  const uniquePriorities = [...new Set(allLeads?.map((lead) => lead.priority))];

  const uniqueStatus = [...new Set(allLeads?.map((lead) => lead.status))];

  return (
    <LeadContext.Provider
      value={{
        leadsStatus,

        leads,
        allLeads,
        newLeadData,
        setNewLeadData,

        name,
        setName,

        leadSource,
        setLeadSource,

        salesAgentId,
        setSalesAgentId,

        status,
        setStatus,

        priority,
        setPriority,

        timeToClose,
        setTimeToClose,

        tags,
        setTags,

        formLeadHandler,
        deletedLeadByLeadId,

        uniqueTags,
        uniqueStatus,
        uniqueSources,
        uniquePriorities,
        uniqueAgents,
      }}
    >
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
