import { FaBars } from "react-icons/fa";
import PageHeader from "./PageHeader";

const AgentsHeader = ({ toggleSidebar }) => {
  return (
    <>
      <PageHeader
      title="Sales Agent Management"
      toggleSidebar={toggleSidebar}
    />
    </>
  );
};

export default AgentsHeader;
