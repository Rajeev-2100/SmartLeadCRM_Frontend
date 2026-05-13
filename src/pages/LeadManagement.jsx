import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import LeadContext from "../context/LeadContext";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import ManagementHeader from "../components/Header/ManagementHeader";
import AgentsContext from "../context/AgentsContext";

const LeadManagement = () => {
  const [formData, setFormData] = useState({});
  const { leads } = useContext(LeadContext);
  const { agents } = useContext(AgentsContext);

  const [selectedAuthorId, setSelectedAuthorId] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  console.log(comments);
  const { leadId } = useParams();
  const leadDetails = leads?.find((lead) => lead._id === leadId);
  const { data: leadComment } = useFetch(
    `http://localhost:3001/leads/${leadId}/comments`,
  );

  const deletedLead = async (leadId) => {
    try {
      const res = await fetch(`http://localhost:3001/leads/${leadId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("Data: ", data);
      if (data) {
        alert("Details deleted successfully");
        console.log("Deleted Sucess:", res.message);
      } else {
        console.error("Error: ", res.message);
      }
    } catch (error) {
      throw error;
    }
  };


  const displayComments =
    comments.length > 0 ? comments : leadComment?.data || [];

  const formCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()  === "") {
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
        `http://localhost:3001/leads/${leadId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      // console.log(data);

      if (res.ok) {
        alert("New Comment Added successfully");
        const selectedAgent = agents.find(
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
    ...new Map(agents?.map((agent) => [agent.name, agent])).values(),
  ];

  return (
    <>
      <ManagementHeader />
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
              to={`/`}
            >
              <h5>Back to Dashboard</h5>
            </Link>
          </div>
          <div
            className="d-flex flex-column align-items-center bg-danger py-4"
            style={{ width: "70%" }}
          >
            <h3 className="fs-bolder">Lead Details</h3>
            <div
              className="w-75 mt-3 d-flex flex-column py-5"
              style={{ height: "100%" }}
            >
              <div>
                <p className="fs-5">
                  <strong>Lead Name: </strong>
                  {leadDetails?.name}
                </p>
                <p className="fs-5">
                  <strong>Sales Agent: </strong>
                  {leadDetails?.salesAgent?.name || "No Agent Assigned"}
                </p>
                <p className="fs-5">
                  <strong>Lead Source: </strong>
                  {leadDetails?.source}
                </p>
                <p className="fs-5">
                  <strong>Lead Status: </strong>
                  {leadDetails?.status}
                </p>
                <p className="fs-5">
                  <strong>Priority: </strong>
                  {leadDetails?.priority}
                </p>
                <p className="fs-5">
                  <strong>Time to Close: </strong>
                  {leadDetails?.timeToClose}
                </p>
              </div>
              <hr />
              <div className="d-flex flex-row justify-content-center gap-4">
                <Link
                  to={`/edited/${leadDetails?._id}`}
                  className="btn btn-primary"
                >
                  <h6 className="fs-bold d-inline">Edit Lead</h6>
                </Link>
                <Link
                  to={`/leads`}
                  onClick={() => deletedLead(leadDetails?._id)}
                  className="btn btn-primary"
                >
                  <h6 className="fs-bold d-inline">Delete Lead</h6>
                </Link>
              </div>
              <hr />
              <div>
                <h5 className="text-center">Comment Section</h5>
                <div width="100%">
                  {displayComments?.map((comment) => {
                    const date = new Date(comment.createdAt);
                    return (
                      <div
                        className="d-flex justify-content-between"
                        key={comment._id}
                      >
                        <div className="d-flex flex-column">
                          <p className="d-inline m-0">
                            <b>Name: </b>
                            {comment.author.name}
                          </p>
                          <p className="d-inline mb-3">
                            <b>Comment: </b>
                            {comment.commentText}
                          </p>
                        </div>
                        <div className="">{date.toLocaleString()}</div>
                      </div>
                    );
                  })}
                </div>
                <hr />
                <div>
                  <form
                    className="d-flex flex-column"
                    onSubmit={formCommentSubmit}
                  >
                    <label htmlFor="author">
                      <h6>Author:</h6>{" "}
                    </label>
                    <select
                      name="author"
                      value={selectedAuthorId}
                      onChange={(e) => setSelectedAuthorId(e.target.value)}
                    >
                      <option value="">Select Author</option>
                      {uniqueAgents.map((agent) => (
                        <option key={agent._id} value={agent._id}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                    <br />
                    <label htmlFor="comment">
                      <h6>Comment:</h6>{" "}
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="my-4 btn btn-primary " type="submit">
                      Submit
                    </button>
                  </form>
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

export default LeadManagement;
