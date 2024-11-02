/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

const Community = () => {
  const data = [
    {
      section: "Settings",
      title: "Profile Settings",
      content: "Manage your profile and privacy settings.",
      thumbnail: ''
    },
    {
      section: "Create Blog",
      title: "How to Start a Blog",
      content: "Tips on creating engaging content for your readers.",
      thumbnail: ''
    },
    {
      section: "Appointment",
      title: "Upcoming Appointments",
      content: "See your scheduled meetings and consultations.",
      thumbnail: ''
    },
    {
      section: "Other",
      title: "Additional Settings",
      content: "Explore more settings and configurations.",
      thumbnail: ''
    },
  ];

  const images = [
    { src: "https://example.com/image1.jpg", alt: "Image 1" },
    { src: "https://example.com/image2.jpg", alt: "Image 2" },
    { src: "https://example.com/image3.jpg", alt: "Image 3" },
  ];

  const videos = [
    { src: "https://example.com/video1.mp4", alt: "Video 1" },
    { src: "https://example.com/video2.mp4", alt: "Video 2" },
  ];

  const pdfs = [
    { src: "https://example.com/document1.pdf", title: "OOP Concepts PDF" },
    { src: "https://example.com/document2.pdf", title: "Advanced Topics PDF" },
  ];

  const [selectedSection, setSelectedSection] = useState(data[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContent, setNewContent] = useState({
    section: '',
    title: '',
    content: '',
    thumbnail: ''
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleButtonClick = (val) => {
    setSelectedSection(val);
  };

  const handleAddNewContent = () => {
    setNewContent({ section: '', title: '', content: '', thumbnail: '' }); // Reset form data
    setThumbnailPreview(null); // Reset preview
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
        setNewContent((prev) => ({ ...prev, thumbnail: file.name })); // Store the file name or path
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    data.push(newContent); // Add new content to the data array
    setIsModalOpen(false); // Close the modal
    setThumbnailPreview(null); // Reset preview
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  return (
    <>
      <section
        id="team"
        className="flex h-full min-h-screen w-full flex-col overflow-hidden bg-gray-1 pt-20 dark:bg-dark-2"
      >
        <div className="flex flex-1">
          {/* Left Sidebar */}
          <div className="w-full space-y-6 lg:w-1/5 lg:space-y-8">
            <div className="flex h-full flex-col bg-white p-6 shadow dark:bg-dark dark:shadow-none">
              {/* Course Name */}
              <h2 className="mb-4 text-center text-xl font-semibold text-gray-800 dark:text-white">
                Course Name
              </h2>

              {/* Add New Content Button */}
              <button onClick={handleAddNewContent} className="w-full rounded-md bg-blue-500 px-4 py-2 text-left font-medium text-white transition duration-200 hover:bg-blue-700">
                Add New Content
              </button>

              {/* Existing Buttons */}
              <div className="mt-4 space-y-2">
                {data.map((item) => (
                  <button
                    key={item.section}
                    onClick={() => handleButtonClick(item)}
                    className={`w-full px-4 py-2 text-left font-medium 
            ${selectedSection.title === item.title
                        ? "rounded-md bg-blue-100 text-blue-700 dark:bg-gray-800 dark:text-white"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      }
            transition duration-200`}
                  >
                    {item.section}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col lg:w-3/5">
            <div className="flex-1 bg-white p-6 shadow dark:bg-dark dark:shadow-none">
              {/* Centered Chapter Name and Thumbnail */}
              <div className="mb-6 flex flex-col items-center justify-center space-y-4">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                  Chapter Name
                </h2>
                <img
                  src="images/team/abc.jpg"
                  alt="Chapter Thumbnail"
                  className="max-h-50 w-full rounded-md shadow"
                />
              </div>

              {/* Section Title and Content */}
              <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">
                {selectedSection?.section}
              </h3>
              <div className="space-y-4">
                <div className="mb-4 border-b border-gray-200 pb-4">
                  <h4 className="text-lg font-semibold text-dark dark:text-white">
                    {selectedSection.title}
                  </h4>
                  <p className="text-sm text-body-color dark:text-dark-6">
                    {selectedSection.content}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Media Sections */}
          <div className="flex w-full flex-col items-center justify-start space-y-8 bg-white p-6 shadow dark:bg-dark-3 lg:w-1/5">
            {/* Image Section */}
            <div className="flex w-full flex-col items-center rounded-md bg-gray-50 p-4 text-center shadow-sm dark:bg-dark-4">
              <h5 className="mb-3 text-lg font-semibold text-dark dark:text-white">
                Images
              </h5>
              <div className="flex items-center justify-center space-x-4">
                <button onClick={handlePrevImage} className="text-blue-500 hover:text-blue-700">&larr;</button>
                <img
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].alt}
                  className="h-auto max-h-48 w-full rounded-lg shadow"
                />
                <button onClick={handleNextImage} className="text-blue-500 hover:text-blue-700">&rarr;</button>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{`${currentImageIndex + 1} of ${images.length}`}</p>
            </div>

            {/* Video Section */}
            <div className="flex w-full flex-col items-center rounded-md bg-gray-50 p-4 text-center shadow-sm dark:bg-dark-4">
              <h5 className="mb-3 text-lg font-semibold text-dark dark:text-white">Videos</h5>
              <div className="flex items-center justify-center space-x-4">
                <button onClick={handlePrevVideo} className="text-blue-500 hover:text-blue-700">&larr;</button>
                <video controls className="h-auto max-h-48 w-full rounded-lg shadow">
                  <source src={videos[currentVideoIndex].src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button onClick={handleNextVideo} className="text-blue-500 hover:text-blue-700">&rarr;</button>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{`${currentVideoIndex + 1} of ${videos.length}`}</p>
            </div>

            {/* Additional Content Section (e.g., PDFs) */}
            <div className="flex w-full flex-col items-center rounded-md bg-gray-50 p-4 text-center shadow-sm dark:bg-dark-4">
              <h5 className="mb-3 text-lg font-semibold text-dark dark:text-white">Resources</h5>
              <ul className="space-y-2">
                {pdfs.map((pdf, index) => (
                  <li key={index}>
                    <a href={pdf.src} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                      {pdf.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg dark:bg-dark-2">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Add New Content</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newContent.title}
                onChange={handleInputChange}
                required
                className="mb-2 w-full border border-gray-300 p-2 dark:border-gray-600 dark:bg-dark-1 dark:text-white"
              />
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="mb-2 w-full border border-gray-300 p-2 dark:border-gray-600 dark:bg-dark-1 dark:text-white"
              />
              {thumbnailPreview && (
                <img src={thumbnailPreview} alt="Thumbnail Preview" className="mb-2 h-auto max-h-48 w-full rounded-md shadow" />
              )}
              <textarea
                name="content"
                placeholder="Content"
                value={newContent.content}
                onChange={handleInputChange}
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
      )}
    </>
  );
};

export default Community;
