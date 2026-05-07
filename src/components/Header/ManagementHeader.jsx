import { useContext } from "react";
import LeadContext from "../../context/LeadContext";
import { useParams } from "react-router-dom";

const ManagementHeader = () => {
  const { leadId } = useParams();
  const { leads } = useContext(LeadContext)

  const filteredLead = leads?.find((lead) => lead._id == leadId)
  // console.log(filteredLead)

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid d-flex justify-content-center py-4">
            <h5>Lead Management: {filteredLead?.name}</h5>
          </div>
        </nav>
      </header>
    </>
  );
};

export default ManagementHeader