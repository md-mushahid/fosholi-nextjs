'use client';
import { use, useEffect, useState } from "react";
import axios from "axios";

const CreateBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState<Blob | null>(null);
  const [blogContent, setBlogContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const isAnyOneLogin = localStorage.getItem("login_user_data");
    if (isAnyOneLogin) {
      const userData = JSON.parse(isAnyOneLogin);
      setUser(userData);
    }
  }, []);

  const handleBlogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if title and content are provided
    if (!blogTitle || !blogContent) {
      setError("Please fill in all required fields.");
      return;
    }
    setError(null); // Reset error state on new submission attempt

    const response = await axios.post("http://127.0.0.1:3333/create-blog", {
      title: blogTitle,
      content: blogContent,
      image: blogImage,
      user_id: user?.id || 0,
    });

    if (response) {
      alert("Blog post created successfully!");
      setBlogTitle("");
      setBlogImage(null);
      setBlogContent("");
    } else {
      setError(`Failed to create blog`);
    }
  };

  const handleBlogImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogImage(file);
    }
  };

  return (
    <form onSubmit={handleBlogSubmit} className="mb-8">
      <h4 className="text-xl font-semibold mb-4 text-dark dark:text-white">
        Create Blog
      </h4>
      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error if any */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
            Blog Title
          </label>
          <input
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
            Blog Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBlogImageChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
            Blog Content
          </label>
          <textarea
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            className="w-full border rounded-lg p-2 h-64 resize-none"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-half bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Blog"}
        </button>
      </div>
    </form>
  );
};

export default CreateBlog;