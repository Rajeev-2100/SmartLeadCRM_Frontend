import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LeadProvider } from "./context/LeadContext.jsx";
import Leads from "./pages/Leads.jsx";
import LeadManagement from "./pages/LeadManagement.jsx";
import AddLeadForm from "./pages/AddLeadForm.jsx";
import SalesList from "./pages/AgentsList.jsx";
import { AgentsProvider } from "./context/AgentsContext.jsx";
import AgentsList from "./pages/AgentsList.jsx";
import AddNewAgents from "./pages/AddNewAgents.jsx";
import LeadStatusView from "./pages/LeadStatusView.jsx";
import EditedManagement from "./pages/EditedManagement.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LeadProvider>
      <AgentsProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/leads/:leadId" element={<LeadManagement />} />
          <Route path="/edited/:leadId" element={<EditedManagement/>} />
          <Route path="/addleadform" element={<AddLeadForm />} />
          <Route path="/agents" element={<AgentsList />} />
          <Route path="/addNewAgents" element={<AddNewAgents/>}/>
          <Route path="/salesView" element={<LeadStatusView/>}/>
        </Routes>
      </AgentsProvider>
    </LeadProvider>
  </BrowserRouter>,
);
