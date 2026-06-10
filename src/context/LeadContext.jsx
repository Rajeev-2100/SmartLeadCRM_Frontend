import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";
import AgentsContext from "./AgentsContext";

const LeadContext = createContext();

export function LeadProvider({ children }) {
  const { displayAgents } = useContext(AgentsContext);

  const { data } = useFetch("https://crm-backend-tawny.vercel.app/leads/");

  const { data: statusValue } = useFetch(
    "https://crm-backend-tawny.vercel.app/leads/status-count",
  );

  const leadsStatus = statusValue?.data;

  const [allLeads, setAllLeads] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setAllLeads(data.data);
    }
  }, [data]);

  const navigation = useNavigate();

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
      const res = await fetch("https://crm-backend-tawny.vercel.app/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Successfully Added the Lead Details");

        const selectedAgent = displayAgents.find(
          (agent) => agent._id === salesAgentId,
        );

        const newLead = {
          ...result.data,
          salesAgent: selectedAgent,
        };

        console.log('New Leads: ',newLead)

        setAllLeads((prev) => [...prev, newLead]);
        setName("");
        setLeadSource("");
        setSalesAgentId("");
        setStatus("");
        setPriority("");
        setTimeToClose(0);
        setTags("");

        navigation("/leads");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletedLeadByLeadId = async (leadId) => {
    try {
      const res = await fetch(
        `https://crm-backend-tawny.vercel.app/leads/${leadId}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        alert("Successfully Deleted Lead");

        setAllLeads((prev) => {
          const updated = prev.filter((lead) => lead._id !== leadId);

          console.log(updated);

          return updated;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uniqueTags = [...new Set(allLeads.flatMap((lead) => lead.tags))];

  const uniqueSources = [...new Set(allLeads.map((lead) => lead.source))];

  const uniqueAgents = [
    ...new Map(
      allLeads
        .filter((lead) => lead.salesAgent)
        .map((lead) => [lead.salesAgent._id, lead.salesAgent]),
    ).values(),
  ];

  const uniquePriorities = [...new Set(allLeads.map((lead) => lead.priority))];

  const uniqueStatus = [...new Set(allLeads.map((lead) => lead.status))];

  return (
    <LeadContext.Provider
      value={{
        leadsStatus,

        allLeads,
        setAllLeads,

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
        uniqueSources,
        uniqueAgents,
        uniquePriorities,
        uniqueStatus,
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
