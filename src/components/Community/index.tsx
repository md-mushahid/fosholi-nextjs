'use client';
import { useState } from "react";

const Community = () => {
  const data = [
    { section: "Settings", title: "Profile Settings", content: "Manage your profile and privacy settings." },
    { section: "Create Blog", title: "How to Start a Blog", content: "Tips on creating engaging content for your readers." },
    { section: "Appointment", title: "Upcoming Appointments", content: "See your scheduled meetings and consultations." },
    { section: "Other", title: "Additional Settings", content: "Explore more settings and configurations." },
  ];

  const [selectedSection, setSelectedSection] = useState(data[0]);

  const handleButtonClick = (val: any) => {
    setSelectedSection(val);
  };

  return (
    <section
      id="team"
      className="overflow-hidden bg-gray-1 pt-20 dark:bg-dark-2 min-h-screen w-full h-full flex flex-col"
    >
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/5 space-y-6 lg:space-y-8">
          <div className="bg-white p-6 shadow dark:bg-dark dark:shadow-none h-full flex flex-col">
            {/* Add New Content Button */}
            <button
              className="w-full py-2 font-medium text-left px-4 rounded-md bg-blue-500 text-white hover:bg-blue-700 transition duration-200"
            >
              Add New Content
            </button>

            {/* Existing Buttons */}
            <div className="space-y-2 mt-4">
              {data.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleButtonClick(item)}
                  className={`w-full text-left py-2 font-medium px-4 
                    ${selectedSection.title === item.title ?
                      'text-blue-700 dark:text-white bg-blue-100 dark:bg-gray-800 rounded-md' :
                      'text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}
                    transition duration-200`}
                >
                  {item.section}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="w-full lg:w-4/5 flex-1 flex flex-col">
          <div className="bg-white p-6 shadow dark:bg-dark dark:shadow-none flex-1">
            <h3 className="text-2xl font-semibold mb-4 text-dark dark:text-white">
              {selectedSection?.section}
            </h3>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h4 className="text-xl font-semibold text-dark dark:text-white">
                  {selectedSection.title}
                </h4>
                <p className="text-sm text-body-color dark:text-dark-6">
                  {selectedSection.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;