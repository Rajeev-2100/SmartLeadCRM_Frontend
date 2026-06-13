// AddNewAgents.jsx
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

  return (
    <>
      <AddAgentHeader toggleSidebar={toggleSidebar} title="Add New Lead" />
      <main className="container-fluid py-3" style={{ backgroundColor: "#f4f7fb", minHeight: "100vh" }}>
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
            <div
              className="rounded-4 shadow-lg p-4 p-md-5"
              style={{ backgroundColor: "#4f6ef7", color: "#fff" }}
            >
              <h3 className="fs-2 text-center mb-4">Sales Agent Form</h3>
              <div
                className="mx-auto mt-3"
                style={{
                  height: "53vh",
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

                  <div className="mb-4">
                    <label htmlFor="agentEmail" className="form-label fs-4 text-white">
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
                  <div className="mt-4">
                    <button
                      className="btn w-100"
                      style={{ backgroundColor: "#ffffff", color: "#4f6ef7", fontWeight: 600 }}
                      type="submit"
                    >
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