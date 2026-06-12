import { useContext } from "react";
import LeadContext from "../../context/LeadContext";
import { useParams } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import PageHeader from "./PageHeader";

const ManagementHeader = ({ toggleSidebar }) => {
  const { leadId } = useParams();
  const { leads } = useContext(LeadContext);

  const filteredLead = leads?.find((lead) => lead._id === leadId);
  // console.log(filteredLead)

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
