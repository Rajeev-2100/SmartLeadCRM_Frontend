// Reports.jsx
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ReportHeader from "../components/Header/ReportHeader";
import PieChart1 from "./Chart/PieChart1";
import PieChart2 from "./Chart/PieChart2";
import VerticalChart from "./Chart/VerticalChart";
import { useState } from "react";

const Reports = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <>
      <ReportHeader toggleSidebar={toggleSidebar} />

      <main
        className="container-fluid py-3"
        style={{
          backgroundColor: "#f4f7fb",
          minHeight: "100vh",
        }}
      >
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
            <div className="d-flex flex-column gap-4">
              <div
                className="shadow rounded-4 p-4 p-md-5"
                style={{ backgroundColor: "#ffffff", border: "1px solid #e3e8ef" }}
              >
                <div className="text-center">
                  <h2 className="fw-bold text-dark">Reports Dashboard</h2>

                  <p className="text-muted mb-5 fs-5">
                    Visual overview of leads and sales performance.
                  </p>
                </div>
                <div className="text-center mb-5">
                  <div className="row g-4">
                    <div className="col-12 col-lg-6">
                      <div className="bg-white shadow rounded-4 p-4 h-100">
                        <div className="text-center mb-4">
                          <h3 className="fw-bold">
                            Lead Closed By Sales Agent
                          </h3>

                          <p className="text-secondary mb-0">
                            Overview of leads closed by each sales agent.
                          </p>
                        </div>

                        <div className="d-flex justify-content-center">
                          <div
                            className="rounded-4 shadow-sm p-4"
                            style={{
                              backgroundColor: "#f8fafc",
                              width: "100%",
                              maxWidth: "500px",
                            }}
                          >
                            <VerticalChart />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-6">
                      <div className="bg-white shadow rounded-4 p-4 h-100">
                        <div className="text-center mb-4">
                          <h3 className="fw-bold">
                            Lead Distribution By Status
                          </h3>

                          <p className="text-secondary mb-0">
                            Distribution of leads based on current status.
                          </p>
                        </div>

                        <div className="d-flex justify-content-center">
                          <div
                            className="rounded-4 shadow-sm p-4"
                            style={{
                              backgroundColor: "#f8fafc",
                              width: "100%",
                              maxWidth: "500px",
                            }}
                          >
                            <PieChart2 />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="fw-bold text-center text-dark">Status Of Closed Lead</h2>

                  <p className="text-muted mb-3 text-center">
                    Visual representation of all lead statuses in the CRM
                    system.
                  </p>
                </div>

                <div className="d-flex justify-content-center">
                  <div
                    className="rounded-4 shadow-sm p-4"
                    style={{
                      backgroundColor: "#f8fafc",
                      width: "100%",
                      maxWidth: "450px",
                    }}
                  >
                    <PieChart1 />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Reports;