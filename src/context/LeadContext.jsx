import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";
import { useAgents } from "./AgentsContext";
import { toast } from "react-toastify";

const LeadContext = createContext();

export function LeadProvider({ children }) {
  const { agents } = useAgents();
  const navigation = useNavigate();
  
  const hostedUrl = "https://crm-backend-tawny.vercel.app";

  // State
  const [allLeads, setAllLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Form states
  const [name, setName] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [salesAgentId, setSalesAgentId] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [timeToClose, setTimeToClose] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Fetch leads
  const { data, loading: fetchLoading, error: fetchError } = useFetch(`${hostedUrl}/api/all-leads`);
  
  // Fetch status counts
  const { data: statusValue } = useFetch(`${hostedUrl}/leads/status-count`);
  
  const leadsStatus = statusValue?.data || [];

  // Update leads when data is fetched
  useEffect(() => {
    if (data?.data) {
      setAllLeads(data.data);
    }
  }, [data]);

  // Add tag function
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Remove tag function
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Create new lead
  const formLeadHandler = async (e) => {
    e.preventDefault();

    // ✅ Validate all required fields
    if (!name.trim()) {
      toast.error("Lead name is required");
      return;
    }
    if (!leadSource) {
      toast.error("Lead source is required");
      return;
    }
    if (!salesAgentId) {
      toast.error("Sales agent is required");
      return;
    }
    if (!status) {
      toast.error("Status is required");
      return;
    }
    if (!priority) {
      toast.error("Priority is required");
      return;
    }
    if (!timeToClose || parseInt(timeToClose) < 1) {
      toast.error("Time to close must be a positive number");
      return;
    }

    const payload = {
      name: name.trim(),
      source: leadSource,
      salesAgent: salesAgentId,
      status,
      priority,
      timeToClose: parseInt(timeToClose),
      tags: tags.length > 0 ? tags : [],
    };

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${hostedUrl}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Lead added successfully");

        // Find selected agent
        const selectedAgent = agents.find(
          (agent) => agent._id === salesAgentId
        );

        const newLead = {
          ...result.data,
          salesAgent: selectedAgent || salesAgentId,
        };

        // Update local state
        setAllLeads((prev) => [newLead, ...prev]);

        // Reset form
        setName("");
        setLeadSource("");
        setSalesAgentId("");
        setStatus("");
        setPriority("");
        setTimeToClose("");
        setTags([]);
        setTagInput("");

        navigation("/leads");
      } else {
        toast.error(result.message || "Failed to add lead");
        setError(result.message);
      }
    } catch (error) {
      console.error("Error adding lead:", error);
      toast.error(error.message || "Something went wrong");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete lead
  const deletedLeadByLeadId = async (leadId) => {
    if (!leadId) {
      toast.error("Lead ID is required");
      return;
    }

    // Confirm deletion
    if (!window.confirm("Are you sure you want to delete this lead?")) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${hostedUrl}/leads/${leadId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Lead deleted successfully");
        
        // Update local state
        setAllLeads((prev) => prev.filter((lead) => lead._id !== leadId));
      } else {
        const result = await res.json();
        toast.error(result.message || "Failed to delete lead");
        setError(result.message);
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error(error.message || "Something went wrong");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update lead
  const updateLead = async (leadId, updateData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${hostedUrl}/leads/${leadId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Lead updated successfully");
        
        // Update local state
        setAllLeads((prev) =>
          prev.map((lead) =>
            lead._id === leadId ? { ...lead, ...result.data } : lead
          )
        );
        
        return result.data;
      } else {
        toast.error(result.message || "Failed to update lead");
        setError(result.message);
        return null;
      }
    } catch (error) {
      console.error("Error updating lead:", error);
      toast.error(error.message || "Something went wrong");
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Filter leads
  const filterLeads = (filters) => {
    let filtered = allLeads;

    if (filters.status) {
      filtered = filtered.filter(lead => lead.status === filters.status);
    }
    if (filters.source) {
      filtered = filtered.filter(lead => lead.source === filters.source);
    }
    if (filters.priority) {
      filtered = filtered.filter(lead => lead.priority === filters.priority);
    }
    if (filters.agentId) {
      filtered = filtered.filter(lead => 
        typeof lead.salesAgent === 'object' 
          ? lead.salesAgent._id === filters.agentId 
          : lead.salesAgent === filters.agentId
      );
    }
    if (filters.tag) {
      filtered = filtered.filter(lead => lead.tags?.includes(filters.tag));
    }

    return filtered;
  };

  // Unique values for filters
  const uniqueTags = [...new Set(allLeads.flatMap((lead) => lead.tags || []))];
  const uniqueSources = [...new Set(allLeads.map((lead) => lead.source).filter(Boolean))];
  const uniquePriorities = [...new Set(allLeads.map((lead) => lead.priority).filter(Boolean))];
  const uniqueStatus = [...new Set(allLeads.map((lead) => lead.status).filter(Boolean))];

  // Unique agents with details
  const uniqueAgents = [
    ...new Map(
      allLeads
        .filter((lead) => lead.salesAgent)
        .map((lead) => {
          const agent = typeof lead.salesAgent === "object"
            ? lead.salesAgent
            : { _id: lead.salesAgent, name: "Unknown Agent" };
          return [agent._id, agent];
        })
    ).values(),
  ];

  return (
    <LeadContext.Provider
      value={{
        // State
        allLeads,
        leadsStatus,
        loading: loading || fetchLoading,
        error: error || fetchError,
        
        // Form states
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
        tagInput,
        setTagInput,
        addTag,
        removeTag,
        
        // Functions
        formLeadHandler,
        deletedLeadByLeadId,
        updateLead,
        filterLeads,
        
        // Unique values for filters
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