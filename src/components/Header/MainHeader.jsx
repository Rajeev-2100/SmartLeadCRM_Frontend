import { FaBars } from "react-icons/fa";
import PageHeader from "./PageHeader";

const MainHeader = ({ toggleSidebar }) => {
  return (
    <PageHeader
      title="CRM Management"
      toggleSidebar={toggleSidebar}
    />
  );
};

export default MainHeader;
