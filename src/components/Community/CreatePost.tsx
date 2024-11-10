'use client'
import { useState } from "react";

const CreatePost = ({setIsModalOpen}: any) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [postImage, setPostImage] = useState<any>(null)
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [video1, setVideo1] = useState('');
  const [video2, setVideo2] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg dark:bg-dark-2">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Add New Content</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            required
            className="mb-2 w-full border border-gray-300 p-2 dark:border-gray-600 dark:bg-dark-1 dark:text-white"
          />
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={(e)=> setPostImage( e.target.files?.[0])}
            required
            className="mb-2 w-full border border-gray-300 p-2 dark:border-gray-600 dark:bg-dark-1 dark:text-white"
          />
          <textarea
            name="content"
            placeholder="Content"
            value={content}
            onChange={(e)=> setContent(e.target.value)}
            required
            className="mb-2 w-full border border-gray-300 p-2 dark:border-gray-600 dark:bg-dark-1 dark:text-white"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="mr-2 rounded-md border border-gray-300 px-4 py-2 dark:border-gray-600 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Add Content
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost;