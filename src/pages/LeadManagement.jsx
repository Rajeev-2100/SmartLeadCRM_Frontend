import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import LeadContext from "../context/LeadContext";
import useFetch from "../useFetch";
import ManagementHeader from "../components/Header/ManagementHeader";
import AgentsContext from "../context/AgentsContext";

const LeadManagement = () => {
  const { leadId } = useParams();
  const { allLeads } = useContext(LeadContext);

  const leadDetails = allLeads?.find((lead) => lead._id === leadId);
  const { displayAgents } = useContext(AgentsContext);

  const navigation = useNavigate();

  const [selectedAuthorId, setSelectedAuthorId] = useState("");

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  console.log("All Leads Data: ", allLeads);

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
      alert("Comment cannot be empty");
      return;
    }

    if (!selectedAuthorId) {
      alert("Please select author");
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
        alert("New Comment Added Successfully");

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
      <ManagementHeader />

      <main
        className="container-fluid py-3 pb-5"
        style={{ minHeight: "100vh" }}
      >
        <div className="row g-3">
          {/* Sidebar */}
          <div className="col-12 col-md-3">
            <div className="bg-light border rounded p-4 h-100">
              <h3 className="text-center fw-bold mb-4">Sidebar</h3>

              <hr />

              <div className="d-grid">
                <Link className="btn btn-outline-secondary" to={`/`}>
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-9">
            <div className="bg-danger text-white rounded p-3 p-md-4">
              <h2 className="text-center fw-bold mb-4">Lead Details</h2>

              <div className="bg-light text-dark rounded p-4 shadow-sm">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <p className="fs-5">
                      <strong>Lead Name:</strong> {leadDetails?.name}
                    </p>

                    <p className="fs-5">
                      <strong>Sales Agent:</strong>{" "}
                      {leadDetails?.salesAgent?.name || "No Agent Assigned"}
                    </p>

                    <p className="fs-5">
                      <strong>Lead Source:</strong> {leadDetails?.source}
                    </p>

                    <p className="fs-5">
                      <strong>Tags :</strong> {leadDetails?.tags?.join(", ")}
                    </p>
                  </div>

                  <div className="col-12 col-md-6">
                    <p className="fs-5">
                      <strong>Lead Status:</strong> {leadDetails?.status}
                    </p>

                    <p className="fs-5">
                      <strong>Priority:</strong> {leadDetails?.priority}
                    </p>

                    <p className="fs-5">
                      <strong>Time To Close:</strong> {leadDetails?.timeToClose}
                    </p>
                  </div>
                </div>

                <hr />

                <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                  <Link
                    to={`/edited/${leadDetails?._id}`}
                    className="btn btn-primary"
                  >
                    Edit Lead
                  </Link>

                  <button
                    onClick={() => {
                      deletedLeadByLeadId(leadDetails?._id);
                      navigate("/leads");
                    }}
                    className="btn btn-dark"
                  >
                    Delete Lead
                  </button>
                </div>
              </div>

              <div className="bg-light text-dark rounded p-4 mt-4 shadow-sm">
                <h4 className="text-center mb-4">Comment Section</h4>

                <div className="d-flex flex-column gap-3">
                  {displayComments?.length > 0 ? (
                    displayComments?.map((comment) => {
                      const date = new Date(comment.createdAt);

                      return (
                        <div
                          key={comment._id}
                          className="border rounded p-3 bg-white"
                        >
                          <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                            <div>
                              <p className="mb-1">
                                <strong>Name:</strong> {comment.author?.name}
                              </p>

                              <p className="mb-0">
                                <strong>Comment:</strong> {comment.commentText}
                              </p>
                            </div>

                            <small className="text-muted">
                              {date.toLocaleString()}
                            </small>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h5 className="text-center">No Comments Yet</h5>
                  )}
                </div>

                <hr className="my-4" />

                <form
                  className="d-flex flex-column gap-3"
                  onSubmit={formCommentSubmit}
                >
                  <div>
                    <label htmlFor="author" className="form-label fw-bold">
                      Author
                    </label>

                    <select
                      name="author"
                      id="author"
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
                  </div>

                  <div>
                    <label htmlFor="comment" className="form-label fw-bold">
                      Comment
                    </label>

                    <textarea
                      id="comment"
                      rows="4"
                      className="form-control"
                      value={comment || ""}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>

                  <button className="btn btn-primary" type="submit">
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
