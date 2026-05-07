import { useState } from "react";
import Footer from "../components/Footer";
import AddAgentHeader from "../components/Header/AddAgentHeader";
import { Link } from "react-router-dom";

const AddNewAgents = () => {
  const [formData, setFormData] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const formNewAgent = async (event) => {
    event.preventDefault();

    const payload = {
      name,
      email,
    };

    try {
      const res = await fetch("http://localhost:3001/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Data: ", data);
      if(data){
        alert('Successfully added the New Agent')
      }
      
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <AddAgentHeader />
      <main>
        <div className="d-flex">
          <div
            className="d-flex flex-column align-items-center py-4"
            style={{ width: "30%", height: "100%" }}
          >
            <h3>SideBar</h3>
            <hr className="bg-danger" />
            <Link
              className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              to={`/`}
            >
              <h5>Back to Dashboard</h5>
            </Link>
          </div>
          <div
            className="d-flex flex-column align-items-center bg-danger py-4 "
            style={{ width: "70%", height: "80%", marginBottom: "3.5rem" }}
          >
            <h3 className="fs-2">Sales Agent List</h3>
            <div
              className="w-75 mt-3 d-flex justify-content-center flex-column"
              style={{ height: "100%" }}
            >
              <form onSubmit={formNewAgent}>
                <div className="my-4">
                  <label htmlFor="agentName" className="form-label fs-4">
                    Agents Name:{" "}
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Enter your Name"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                    aria-label=".form-control-lg example"
                  />
                </div>

                <div className="my-4">
                  <label htmlFor="agentEmail" className="form-label fs-4">
                    Email Address:{" "}
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Enter your Email"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label=".form-control-lg example"
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
      </main>
      <Footer />
    </>
  );
};

export default AddNewAgents;
