import axios from "axios";
import { FormEvent, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";

export default function CommentBox({ blogId }: any) {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState({}); // Tracks visibility of reply form for each comment

  const isAnyOneLogin = localStorage.getItem("login_user_data");
  const userData = isAnyOneLogin ? JSON.parse(isAnyOneLogin) : null;

  const handleCommentSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const res = await axios.post("http://127.0.0.1:3333/create-comment", {
      blog_id: blogId,
      parent_id: null,
      user_id: userData?.id,
      content: comment,
    });

    setCommentsList([{ ...res.data, replies: [] }, ...commentsList]);
    setComment("");
    setShowCommentForm(false);
  };

  useEffect(() => {
    const getComment = async () => {
      const res = await axios.get(`http://127.0.0.1:3333/get-comment/${blogId}`);
      setCommentsList(res.data);
    };
    getComment();
  }, [blogId]);

  const handleReplySubmit = async (e: FormEvent<HTMLFormElement>, index: number, reply: any, comment_id: any) => {
    e.preventDefault();
    const res = await axios.post("http://127.0.0.1:3333/create-comment", {
      blog_id: blogId,
      parent_id: comment_id,
      user_id: userData?.id,
      content: reply,
    });
    const updatedComments = [...commentsList];
    updatedComments[index].replies.push(res.data);
    setCommentsList(updatedComments);
    setShowReplyForm({ ...showReplyForm, [index]: false }); // Hide reply form after submission
  };

  const toggleReplyForm = (index: number) => {
    setShowReplyForm((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="w-full bg-gray-1 pb-12 pt-20 dark:bg-dark-2 mt-12 pt-6 pb-6 rounded-lg">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl bg-white dark:bg-dark-700 rounded-lg p-6 shadow-lg mb-8">
          <h2>Comments</h2>
          {
            userData && <button
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="mb-6 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {showCommentForm ? "Cancel Comment" : "Add Comment"}
            </button>
          }

          {showCommentForm && (
            <form onSubmit={handleCommentSubmit} className="space-y-4 mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
                rows={4}
                className="w-full rounded-md border border-gray-300 p-4 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-dark-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Submit Comment
              </button>
            </form>
          )}

          <div className="mt-8">
            {commentsList.length > 0 ? (
              <div className="space-y-6">
                {commentsList.map((com, index) => (
                  <div key={index} className="p-6 border-b border-gray-200 dark:border-gray-600 rounded-lg shadow-sm bg-gray-50 dark:bg-dark-600">
                    <p className="text-lg text-gray-800 dark:text-gray-300">{com.content}</p>

                    {/* Toggle Reply Form */}
                    {userData && <button
                      onClick={() => toggleReplyForm(index)}
                      className="mt-3 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {showReplyForm[index] ? "Cancel Reply" : "Reply"}
                    </button>}

                    {showReplyForm[index] && (
                      <form
                        onSubmit={(e) => {
                          const replyInput = e.target.elements[`reply-${index}`];
                          handleReplySubmit(e, index, replyInput.value, com.id);
                          replyInput.value = "";
                        }}
                        className="mt-3 space-y-3"
                      >
                        <textarea
                          name={`reply-${index}`}
                          placeholder="Write a reply..."
                          rows={3}
                          className="w-full rounded-md border border-gray-300 p-4 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-dark-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                        />
                        <button
                          type="submit"
                          className="rounded-md bg-green-500 px-4 py-2 text-sm text-white transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                          Submit Reply
                        </button>
                      </form>
                    )}

                    {/* Display Replies */}
                    {com?.replies?.length > 0 && (
                      <div className="mt-4 space-y-3 pl-6 border-l-2 border-gray-200 dark:border-gray-600">
                        {com.replies.map((reply: { content: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, replyIndex: Key | null | undefined) => (
                          <div key={replyIndex} className="text-sm text-gray-700 dark:text-gray-400">
                            <p>{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
    </section>

  );
}
