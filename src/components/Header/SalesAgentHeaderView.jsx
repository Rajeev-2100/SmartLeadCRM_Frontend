import { FaBars } from "react-icons/fa";
import PageHeader from "./PageHeader";

const SalesAgentHeaderView = ({ toggleSidebar, title }) => {
  return (
    <>
    <PageHeader
      title="Lead By Sales Agent"
      toggleSidebar={toggleSidebar}
    />
    </>
  );
};

export default SalesAgentHeaderView;
