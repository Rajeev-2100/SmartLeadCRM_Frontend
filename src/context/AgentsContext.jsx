import { createContext, useContext, useState } from "react";
import useFetch from "../useFetch";
import LeadContext from "./LeadContext";

const AgentsContext = createContext();

export function AgentsProvider({ children }) {
  const { allLeads } = useContext(LeadContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [agentsState, setAgentsState] = useState([]);

  const { data } = useFetch("http://localhost:3001/agents");

  const fetchedAgents = data?.data || [];

  const displayAgents =
    agentsState.length > 0 ? agentsState : fetchedAgents;

  const payLoad = {
    name,
    email,
  };

  const formNewAgent = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/agents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payLoad),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Added new Agent in Sales Data");

        const updatedAgents =
          agentsState.length > 0
            ? [...agentsState, data.data]
            : [...fetchedAgents, data.data];

        setAgentsState(updatedAgents);

        setName("");
        setEmail("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteListByAgent = async (agentName) => {
    try {
      const res = await fetch(
        `http://localhost:3001/agents/${agentName}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        alert("Successfully Deleted Agent");

        const updatedAgents =
          agentsState.length > 0
            ? agentsState.filter(
                (agent) => agent.name !== agentName
              )
            : fetchedAgents.filter(
                (agent) => agent.name !== agentName
              );

        setAgentsState(updatedAgents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AgentsContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        successMessage,
        setSuccessMessage,
        formNewAgent,
        deleteListByAgent,
        allAgents: displayAgents,
        displayAgents,
      }}
    >
      {children}
    </AgentsContext.Provider>
  );
}

export function useAgents() {
  const context = useContext(AgentsContext);

  if (!context) {
    throw new Error(
      "useAgents must be used within AgentsProvider"
    );
  }

  return context;
}

export default AgentsContext;