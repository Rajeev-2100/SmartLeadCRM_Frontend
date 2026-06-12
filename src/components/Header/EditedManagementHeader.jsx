import { FaBars } from "react-icons/fa";
import PageHeader from "./PageHeader";

const EditedManagementHeader = ({ toggleSidebar }) => {
  return (
    <>
      <PageHeader
        title="Edited Lead Management"
        toggleSidebar={toggleSidebar}
      />
    </>
  );
};

export default EditedManagementHeader;
