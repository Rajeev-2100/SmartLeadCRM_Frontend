import useFetch from "./useFetch.jsx";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import { useContext, useState } from "react";
import LeadContext from "./context/LeadContext.jsx";
import MainHeader from "./components/Header/MainHeader.jsx";

function App() {
  const { allLeads, leadsStatus, newLeadData } = useContext(LeadContext);
  const [selectedStatus, setSelectedStatus] = useState("none");
  
  const filteredStatus =
    selectedStatus === "none" || selectedStatus === ""
      ? allLeads 
      : allLeads?.filter((lead) => lead.status === selectedStatus) || newLeadData?.filter((lead) => lead.status === selectedStatus)

  return (
    <>
      <MainHeader />
      <main className="py-0" style={{ height: "100vh" }}>
        <div className="d-flex">
          <div
            className="d-flex flex-column align-items-center py-4"
            style={{ width: "30%", height: "100%" }}
          >
            <h3>SideBar</h3>
            <hr className="bg-danger" />
            <Link
              className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              to={`/leads`}
            >
              <h5>Leads</h5>
            </Link>
            <Link
              className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              to={`/salesView`}
            >
              <h5>Sales</h5>
            </Link>
            <Link
              className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              to={`/agents`}
            >
              <h5>Agents</h5>
            </Link>
            <Link
              className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              to={`/reports`}
            >
              <h5>Reports</h5>
            </Link>
            <Link
              className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              to={`/settings`}
            >
              <h5>Settings</h5>
            </Link>
          </div>
          <div
            className="d-flex flex-column align-items-center bg-danger py-4"
            style={{ width: "70%", marginBottom: "3.5rem" }}
          >
            <h3 className="fs-bold">Main Content</h3>
            <div
              className="w-75 mt-3 d-flex flex-column flex-wrap"
              style={{ height: "100%", width: '85%' }}
            >
              <div
                className="d-flex column-gap-3 flex-wrap overflow-auto "
                style={{ flex: 1, minHeight: 0 }}
              >
                {filteredStatus?.map((lead) => (
                  <div key={lead._id} className="border p-2 m-1 bg-light" style={{ width: '30%', height: '10rem'}}>
                    <p className="m-0">
                      <strong>{lead.name}</strong>
                    </p>
                    <p className="m-0">
                      <b>Status:</b> {lead.status}
                    </p>
                    <p className="mb-2">
                      <b>Priority: </b>
                      {lead.priority}
                    </p>
                    <br />
                  </div>
                ))}
              </div>
              <hr />
              <div className="d-flex flex-column">
                <h5>Lead Status: </h5>
                {leadsStatus?.map((item) => (
                  <p key={item._id} className="m-0">
                    {item._id}: {item.count} Leads
                  </p>
                ))}
              </div>
              <hr />
              <div className="d-flex flex-column">
                <label htmlFor="statusValue">
                  <h5>Quick Filters: </h5>
                </label>
                <select
                  id=""
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="none" id="statusValue">
                    Filter By Status
                  </option>
                  {leadsStatus?.map((status) => (
                    <>
                      <option key={status._id} value={status._id}>
                        {status._id}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <div className="mt-3">
                <Link to={`/addleadform`} className="btn btn-primary w-100">Add New Lead</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
