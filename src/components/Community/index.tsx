"use client";
import { useEffect, useState } from "react";
import RightSideBar from "./RightSideBar";
import CreatePost from "./CreatePost";
import axios from "axios";
import { Image } from "antd";
import { useSearchParams } from "next/navigation";

const Community = () => {
  const searchParams = useSearchParams();
  const communityId = searchParams.get("communityId");
  console.log("communityId", communityId);
  const [user, setUser] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<any>([]);
  const [singleCommunityData, setSingleCommunityData] = useState<any>(null);
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://127.0.0.1:3333/community/${communityId}`);
      if (response?.data && response?.data?.length > 0) {
        setSingleCommunityData(response.data);
        setSelectedSection(response.data[0]);
      }
      const courseName = await axios.get(`http://127.0.0.1:3333/get-course-name/${communityId}`);
      if (courseName?.data) {
        setCourseName(courseName.data[0].title);
      }
    }
    fetchData();
  }, []);

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
                {courseName}
              </h2>
              {
                user?.user_type !== 'student' &&
                <button onClick={() => setIsModalOpen(true)} className="w-full rounded-md bg-blue-500 px-4 py-2 text-left font-medium text-white transition duration-200 hover:bg-blue-700">
                  Add New Content
                </button>
              }
              <div className="mt-4 space-y-2">
                {singleCommunityData && singleCommunityData.map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSection(item)}
                    className={`w-full px-4 py-2 text-left font-medium 
        ${selectedSection?.title === item?.title
                        ? "rounded-md bg-blue-100 text-blue-700 dark:bg-gray-800 dark:text-white"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      } 
        transition duration-200 overflow-hidden whitespace-nowrap text-ellipsis`}
                  >
                    {item?.title}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {
            singleCommunityData === null ? <h1>Nothing to show</h1> :
              <>
                <div className="flex w-full flex-1 flex-col lg:w-3/5">
                  <div className="flex-1 bg-white p-6 shadow dark:bg-dark dark:shadow-none">
                    <div className="mb-6 flex flex-col items-center justify-center space-y-4">
                      {
                        selectedSection?.post_image &&
                        <Image
                          src={`/img/${selectedSection?.post_image}`}
                          alt="Chapter Thumbnail"
                          className="max-h-50 w-full rounded-md shadow"
                          preview={false}
                        />
                      }
                    </div>
                    <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">
                      {selectedSection?.section}
                    </h3>
                    <div className="space-y-4">
                      <div className="mb-4 border-b border-gray-200 pb-4">
                        <h4 className="text-lg font-semibold text-dark dark:text-white">
                          {selectedSection?.title}
                        </h4>
                        <p className="text-sm text-body-color dark:text-dark-6">
                          {selectedSection?.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <RightSideBar selectedSection={selectedSection} />
              </>
          }
        </div>
      </section>

      {isModalOpen && (
        <CreatePost communityId={communityId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};

export default Community;
