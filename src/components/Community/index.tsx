"use client";
import { useState } from "react";
import RightSideBar from "./RightSideBar";
import CreatePost from "./CreatePost";

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

const Community = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(data[0]);

  return (
    <>
      <section
        id="team"
        className="flex h-full min-h-screen w-full flex-col overflow-hidden bg-gray-1 pt-20 dark:bg-dark-2"
      >
        <div className="flex flex-1">
          <div className="w-full space-y-6 lg:w-1/5 lg:space-y-8">
            <div className="flex h-full flex-col bg-white p-6 shadow dark:bg-dark dark:shadow-none">
              <h2 className="mb-4 text-center text-xl font-semibold text-gray-800 dark:text-white">
                Course Name
              </h2>
              <button onClick={()=> setIsModalOpen(true)} className="w-full rounded-md bg-blue-500 px-4 py-2 text-left font-medium text-white transition duration-200 hover:bg-blue-700">
                Add New Content
              </button>
              <div className="mt-4 space-y-2">
                {data.map((item) => (
                  <button
                    key={item.section}
                    onClick={() => setSelectedSection(item)}
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

          <RightSideBar />
        </div>
      </section>

      {isModalOpen && (
        <CreatePost setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};

export default Community;
