'use client'
import { useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import axios from "axios";

const CreatePost = ({communityId, isModalOpen, setIsModalOpen}: any) => {
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postImage, setPostImage] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const isAnyOneLogin = localStorage.getItem("login_user_data");
    if (isAnyOneLogin) {
      const userData = JSON.parse(isAnyOneLogin);
      setUser(userData);
    }
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = {
      title: title,
      content: content,
      post_image: postImage,
      additional_images: JSON.stringify(images),
      additional_videos: JSON.stringify(videos),
      created_by: user?.id,
      program_id: communityId,
    };

    const res = await axios.post('http://127.0.0.1:3333/create-post', data);

    if (res.status === 200) {
      alert('Content added successfully!');
      window.location.reload();
    } else {
      alert('Error adding content');
    }
    setIsModalOpen(false);
  };

  const addImageField = () => setImages([...images, null]);
  const addVideoField = () => setVideos([...videos, null]);

  const handleImageChange = (index: number, file: any) => {
    const newImages = [...images];
    newImages[index] = file?.name;
    setImages(newImages);
  };

  const handleVideoChange = (index: number, file: any) => {
    const newVideos = [...videos];
    newVideos[index] = file?.name;
    setVideos(newVideos);
  };

  const removeImageField = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const removeVideoField = (index: number) => {
    const newVideos = videos.filter((_, i) => i !== index);
    setVideos(newVideos);
  };

  return (
    <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg dark:bg-dark-2 w-full max-w-lg">
          <h3 className="text-lg font-semibold mb-4 dark:text-white p-6">Add New Content</h3>
          <div className="p-6 overflow-y-auto" style={{ maxHeight: '70vh' }}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mb-2 w-full border border-gray-300 p-2 dark:border-gray-600 dark:bg-dark-1 dark:text-white"
              />
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={(e) => setPostImage(e.target.files?.[0].name)}
                required
                className="mb-2 w-full border border-gray-300 p-2 dark:border-gray-600 dark:bg-dark-1 dark:text-white"
              />
              <textarea
                name="content"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="mb-2 w-full border border-gray-300 p-2 dark:border-gray-600 dark:bg-dark-1 dark:text-white"
              />

              <div className="mb-4">
                <h4 className="dark:text-white">Additional Images</h4>
                {images.map((_, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, e.target.files?.[0] || null)}
                      className="flex-1 border border-gray-300 p-2 dark:border-gray-600 dark:bg-dark-1 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="ml-2 text-red-600 dark:text-red-400"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="flex items-center text-blue-500 dark:text-blue-400"
                >
                  <PlusOutlined /> Add Photo
                </button>
              </div>

              <div className="mb-4">
                <h4 className="dark:text-white">Additional Videos</h4>
                {videos.map((_, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleVideoChange(index, e.target.files?.[0] || null)}
                      className="flex-1 border border-gray-300 p-2 dark:border-gray-600 dark:bg-dark-1 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => removeVideoField(index)}
                      className="ml-2 text-red-600 dark:text-red-400"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addVideoField}
                  className="flex items-center text-blue-500 dark:text-blue-400"
                >
                  <PlusOutlined /> Add Video
                </button>
              </div>

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
      </div>
    </Modal>
  );
};

export default CreatePost;
