import { useContext } from "react";
import LeadContext from "../../context/LeadContext";
import { useParams } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import PageHeader from "./PageHeader";

const ManagementHeader = ({ toggleSidebar }) => {
  const { leadId } = useParams();
  const { allLeads } = useContext(LeadContext);

  const filteredLead = allLeads?.find((lead) => lead._id === leadId);
  console.log('Filtered Lead: ',filteredLead)

  return (
    <>
      <PageHeader
        title={`Lead Management: ${filteredLead?.name}`}
        toggleSidebar={toggleSidebar}
      />
    </>
  );
};

export default ManagementHeader;
