// LeadManagement.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import LeadContext from "../context/LeadContext";
import useFetch from "../useFetch";
import ManagementHeader from "../components/Header/ManagementHeader";
import AgentsContext from "../context/AgentsContext";
import { toast } from "react-toastify";


const LeadManagement = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  console.log('Show SIderBar: ',showSidebar)


  const { leadId } = useParams();
  const { allLeads, deletedLeadByLeadId } = useContext(LeadContext);

  const leadDetails = allLeads?.find((lead) => lead._id === leadId);
  const { displayAgents } = useContext(AgentsContext);

  const navigation = useNavigate();

  const [selectedAuthorId, setSelectedAuthorId] = useState("");

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const { data: leadComment } = useFetch(
    `https://crm-backend-tawny.vercel.app/leads/${leadId}/comments`,
  );

  const displayComments =
    comments.length > 0
      ? [...(leadComment?.data || []), ...comments]
      : leadComment?.data || [];

  const formCommentSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }

    if (!selectedAuthorId) {
      toast.error("Please select author");
      return;
    }

    const payload = {
      commentText: comment,
      author: selectedAuthorId,
    };

    try {
      const res = await fetch(
        `https://crm-backend-tawny.vercel.app/leads/${leadId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("New Comment Added Successfully");

        const selectedAgent = displayAgents.find(
          (agent) => agent._id === selectedAuthorId,
        );

        const newComment = {
          ...data.data,
          author: selectedAgent,
        };

        setComments((prev) => [...prev, newComment]);

        setComment("");
        setSelectedAuthorId("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const uniqueAgents = [
    ...new Map(displayAgents?.map((agent) => [agent.name, agent])).values(),
  ];

  return (
    <>
      <ManagementHeader toggleSidebar={toggleSidebar} />

      <main
        className="container-fluid py-3 pb-5"
        style={{ backgroundColor: "#f4f7fb", minHeight: "100vh" }}
      >
        <div className="row g-3">
          {/* Sidebar */}
          {showSidebar && (
            <div className="col-12 col-md-3">
              <div className="bg-white shadow rounded-4 p-4 h-100">
                <h3 className="text-center mb-4">Sidebar</h3>
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
              style={{ backgroundColor: "#ffffff", border: "1px solid #e3e8ef" }}
            >
              <h2 className="text-center fw-bold mb-4 text-dark">Lead Details</h2>

              {/* Info Cards */}
              <div className="row g-3 justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                  <div
                    className="text-dark rounded-4 shadow-sm p-3 h-100"
                    style={{ backgroundColor: "#f8fafc" }}
                  >
                    <p>
                      <strong>Lead Name:</strong> {leadDetails?.name}
                    </p>
                    <p>
                      <strong>Sales Agent:</strong>{" "}
                      {leadDetails?.salesAgent?.name || "No Agent"}
                    </p>
                    <p>
                      <strong>Lead Source:</strong> {leadDetails?.source}
                    </p>
                    <p>
                      <strong>Tags:</strong> {leadDetails?.tags?.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-5">
                  <div
                    className="text-dark rounded-4 shadow-sm p-3 h-100"
                    style={{ backgroundColor: "#f8fafc" }}
                  >
                    <p>
                      <strong>Status:</strong> {leadDetails?.status}
                    </p>
                    <p>
                      <strong>Priority:</strong> {leadDetails?.priority}
                    </p>
                    <p>
                      <strong>Time To Close:</strong> {leadDetails?.timeToClose}
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                <Link
                  to={`/edited/${leadDetails?._id}`}
                  className="btn"
                  style={{ backgroundColor: "#4f6ef7", color: "#fff" }}
                >
                  Edit Lead
                </Link>

                <button
                  onClick={() => {
                    deletedLeadByLeadId(leadDetails?._id);
                    navigate("/leads");
                  }}
                  className="btn btn-outline-danger"
                >
                  Delete Lead
                </button>
              </div>

              {/* Comments */}
              <div className="bg-white text-dark rounded-4 p-4 mt-4 shadow-sm">
                <h4 className="text-center mb-4">Comments</h4>

                <div className="row g-3">
                  {displayComments?.length > 0 ? (
                    displayComments.map((comment) => (
                      <div key={comment._id} className="col-12 col-md-6">
                        <div className="border rounded-4 p-3 h-100 shadow-sm">
                          <p className="mb-1">
                            <strong>{comment.author?.name}</strong>
                          </p>
                          <p className="mb-2">{comment.commentText}</p>
                          <small className="text-muted">
                            {new Date(comment.createdAt).toLocaleString()}
                          </small>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center">No Comments Yet</div>
                  )}
                </div>

                {/* Comment Form */}
                <form
                  className="mt-4 d-flex flex-column gap-3"
                  onSubmit={formCommentSubmit}
                >
                  <select
                    className="form-select"
                    value={selectedAuthorId || ""}
                    onChange={(e) => setSelectedAuthorId(e.target.value)}
                  >
                    <option value="">Select Author</option>
                    {uniqueAgents?.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>

                  <textarea
                    rows="3"
                    className="form-control"
                    value={comment || ""}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <button
                    className="btn"
                    style={{ backgroundColor: "#4f6ef7", color: "#fff" }}
                  >
                    Submit Comment
                  </button>
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

export default LeadManagement;