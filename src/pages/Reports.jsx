import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ReportHeader from "../components/Header/ReportHeader";
import PieChart1 from "./Chart/PieChart1";
import PieChart2 from "./Chart/PieChart2";
import VerticalChart from "./Chart/VerticalChart";

const Reports = () => {
  return (
    <>
      <ReportHeader />

      <main
        className="container-fluid py-4"
        style={{
          backgroundColor: "#f4f7fb",
          minHeight: "100vh",
        }}
      >
        <div className="row g-4">
          <div className="col-12 col-md-3 col-lg-2">
            <div
              className="bg-white shadow-sm rounded-4 p-4 h-100"
              style={{
                minHeight: "85vh",
              }}
            >
              <h4 className="fw-bold text-center mb-4">Sidebar</h4>

              <hr />

              <div className="d-grid">
                <Link className="btn btn-outline-secondary rounded-3" to="/">
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-9 col-lg-10">
            <div className="d-flex flex-column gap-4">
              <div className="bg-white shadow rounded-4 p-4 p-md-5">
                <div className="text-center mb-5">
                  <h2 className="fw-bold">Status Of Closed Lead</h2>

                  <p className="text-secondary mb-0">
                    Visual representation of all lead statuses in the CRM
                    system.
                  </p>
                </div>

                <div className="d-flex justify-content-center">
                  <div
                    className="bg-light rounded-4 shadow-sm p-4"
                    style={{
                      width: "100%",
                      maxWidth: "450px",
                    }}
                  >
                    <PieChart1 />
                  </div>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-12 col-lg-6">
                  <div className="bg-white shadow rounded-4 p-4 h-100">
                    <div className="text-center mb-4">
                      <h3 className="fw-bold">Lead Closed By Sales Agent</h3>

                      <p className="text-secondary mb-0">
                        Overview of leads closed by each sales agent.
                      </p>
                    </div>

                    <div className="d-flex justify-content-center">
                      <div
                        className="bg-light rounded-4 shadow-sm p-4"
                        style={{
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
                      <h3 className="fw-bold">Lead Distribution By Status</h3>

                      <p className="text-secondary mb-0">
                        Distribution of leads based on current status.
                      </p>
                    </div>

                    <div className="d-flex justify-content-center">
                      <div
                        className="bg-light rounded-4 shadow-sm p-4"
                        style={{
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
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Reports;
