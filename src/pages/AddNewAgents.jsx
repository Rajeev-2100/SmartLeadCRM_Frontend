import { useContext, useState } from "react";
import Footer from "../components/Footer";
import AddAgentHeader from "../components/Header/AddAgentHeader";
import { Link } from "react-router-dom";
import AgentsContext from "../context/AgentsContext";
import useFetch from "../useFetch";

const AddNewAgents = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const {
    allAgents,
    fullAgentData,
    formNewAgent,
    setName,
    name,
    email,
    setEmail,
    newAgentData,
    setSuccessMessage,
    successMessage,
  } = useContext(AgentsContext);
  // console.log('Full Agent Data: ', allAgents)

  return (
    <>
      <AddAgentHeader toggleSidebar={toggleSidebar} title="Add New Lead" />
      <main className="container-fluid py-3">
        <div className="row g-3">
          {showSidebar && (
            <div className="col-12 col-md-3">
              <div className="bg-white shadow rounded-4 p-4 h-100">
                <h3 className="text-center mb-4">SideBar</h3>
                <div className="d-flex flex-column gap-3">
                  <Link className="btn btn-outline-secondary" to="/">
                    <h5 className="mb-0">Back to Dashboard</h5>
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className={showSidebar ? "col-12 col-md-9" : "col-12"}>
            <div className="bg-danger rounded-4 shadow-lg p-4 p-md-5 text-white">
              <h3 className="fs-2 text-center mb-4">Sales Agent Form</h3>
              <div
                className="mx-auto mt-3"
                style={{
                  maxWidth: "700px",
                  width: "100%",
                }}
              >
                <form onSubmit={formNewAgent}>
                  <div className="mb-4">
                    <label htmlFor="agentName" className="form-label fs-4">
                      Agents Name:{" "}
                    </label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Enter your Name"
                      value={name || ""}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="my-4">
                    <label
                      htmlFor="agentEmail"
                      className="form-label fs-4 text-white"
                    >
                      Email Address:{" "}
                    </label>
                    <input
                      className="form-select form-select-lg"
                      type="text"
                      placeholder="Enter your Email"
                      value={email || ""}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <button className="btn btn-primary my-4" type="submit">
                      Submit Button
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AddNewAgents;
