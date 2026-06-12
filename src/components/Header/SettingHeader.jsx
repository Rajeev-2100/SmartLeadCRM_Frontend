import { FaBars } from "react-icons/fa";
import PageHeader from "./PageHeader";

const SettingHeader = ({ toggleSidebar, title }) => {
  return (
    <PageHeader
      title="Setting"
      toggleSidebar={toggleSidebar}
    />
  );
};

export default SettingHeader;