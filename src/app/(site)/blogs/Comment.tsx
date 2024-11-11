import axios from "axios";
import { useEffect, useState } from "react";

export default function CommentBox({ blogId }) {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const userData = JSON.parse(localStorage.getItem("login_user_data") || "{}");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        await axios.post("http://127.0.0.1:3333/create-comment", {
          blog_id: blogId,
          parent_id: null,
          user_id: userData.id,
          content: comment,
        });
        setCommentsList([{ content: comment, replies: [] }, ...commentsList]);
        setComment("");
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const handleReplySubmit = async (e, index, reply, comment_id) => {
    e.preventDefault();
    if (reply.trim()) {
      try {
        await axios.post("http://127.0.0.1:3333/create-comment", {
          blog_id: blogId,
          parent_id: comment_id,
          user_id: userData.id,
          content: reply,
        });
        const updatedComments = commentsList.map((com, idx) =>
          idx === index ? { ...com, replies: [...com.replies, { content: reply }] } : com
        );
        setCommentsList(updatedComments);
      } catch (error) {
        console.error("Error submitting reply:", error);
      }
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:3333/get-comment/${blogId}`);
        setCommentsList(res.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    getComments();
  }, [blogId]);

  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-gray-700">Comment Box</h2>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          rows={4}
          className="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </form>

      <div className="mt-6">
        <h3 className="mb-2 text-xl font-semibold text-gray-700">Comments</h3>
        {commentsList.length > 0 ? (
          <div className="space-y-4">
            {commentsList.map((com, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition duration-300 hover:bg-gray-100"
              >
                <p className="text-gray-800">{com.content}</p>

                {/* Reply section */}
                <form
                  onSubmit={(e) => {
                    const replyInput = e.target.elements[`reply-${index}`];
                    handleReplySubmit(e, index, replyInput.value, com.id);
                    replyInput.value = "";
                  }}
                  className="mt-2"
                >
                  <textarea
                    name={`reply-${index}`}
                    placeholder="Write a reply..."
                    rows={2}
                    className="mb-2 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="rounded bg-green-500 px-3 py-1 text-white transition duration-300 hover:bg-green-600"
                  >
                    Reply
                  </button>
                </form>

                {/* Display replies */}
                {com.replies.length > 0 && (
                  <div className="mt-3 space-y-2 border-l-2 border-gray-300 pl-4">
                    {com.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} className="rounded-md bg-gray-100 p-2">
                        <p className="text-gray-700">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
