import PageHeader from "./PageHeader";

const AddAgentHeader = ({ toggleSidebar, title }) => {
  return (
    <PageHeader
      title="Add New Sales Agent"
      toggleSidebar={toggleSidebar}
    />
  );
};

export default AddAgentHeader;