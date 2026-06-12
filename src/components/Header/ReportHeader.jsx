import { FaBars } from "react-icons/fa";
import PageHeader from "./PageHeader";

const ReportHeader = ({ toggleSidebar, title }) => {
  return (
   <PageHeader
      title="Report"
      toggleSidebar={toggleSidebar}
    />
  );
};

export default ReportHeader;