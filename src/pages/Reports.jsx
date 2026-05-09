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
      <main className="d-flex ">
        <div
          className="d-flex flex-column align-items-center justify-content-center pt-5"
          style={{ width: "18%", height: "100%" }}
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
          className="d-flex flex-column my-5 align-items-center pb-5 gap-5"
          style={{ width: "82%", height: "200vh" }}
        >
          <div
            className="bg-white shadow-lg rounded-5 p-5"
            style={{
              width: "85%",
            }}
          >
            <div className="mb-5">
              <h2 className="fw-bold text-center">Status of Closed Lead</h2>

              <p className="text-center text-secondary mt-3">
                Visual representation of all lead statuses in the CRM system.
              </p>
            </div>

            <div className="d-flex justify-content-center">
              <div
                className="p-4 rounded-4 shadow-sm bg-light"
                style={{
                  width: "400px",
                }}
              >
                <PieChart1 />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center gap-5">
            <div
              className="bg-white shadow-lg rounded-5 p-5"
              style={{
                width: "100%",
              }}
            >
              <div className="mb-5">
                <h2 className="fw-bold text-center">Lead Closed By Sales Agent Name</h2>

                <p className="text-center text-secondary mt-3">
                  Visual representation of all lead statuses in the CRM system.
                </p>
              </div>

              <div className="d-flex justify-content-center">
                <div
                  className="p-4 rounded-4 shadow-sm bg-light"
                  style={{
                    width: "500px",
                  }}
                >
                  < VerticalChart/>
                </div>
              </div>
            </div>
              <div className="d-flex justify-content-center">
            <div
              className="bg-white shadow-lg rounded-5 p-5"
              style={{
                width: "100%",
              }}
            >
              <div className="mb-5">
                <h2 className="fw-bold text-center">Lead Disturbution Chart By Status</h2>

                <p className="text-center text-secondary mt-3">
                  Visual representation of all lead statuses in the CRM system.
                </p>
              </div>

              <div className="d-flex justify-content-center">
                <div
                  className="p-4 rounded-4 shadow-sm bg-light"
                  style={{
                    width: "500px",
                  }}
                >
                  <PieChart2 />
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
