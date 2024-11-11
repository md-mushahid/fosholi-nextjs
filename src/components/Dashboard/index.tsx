'use client';
import { useEffect, useState } from "react";
import CreateBlog from "./CreateBlog";
import Setting from "./Setting";
import { Image } from "antd";
import axios from "axios";
import Link from "next/link";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [activeSection, setActiveSection] = useState("membership");
  const [name, setName] = useState("");
  const [membership, setMembership] = useState([]);

  useEffect(() => {
    const isAnyOneLogin = localStorage.getItem("login_user_data");
    let userData = null;
    if (isAnyOneLogin) {
      userData = JSON.parse(isAnyOneLogin);
      setUser(userData);
      setName(userData.name);
    } else {
      window.location.href = "/signin";
    }
    const getData = async () => {
      const res = await axios.get(`http://127.0.0.1:3333/get-memberships/${userData?.id}`);
      if (res?.status === 200) {
        setMembership(res.data);
      }
    };
    getData();
  }, []);

  return (
    <section
      id="team"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[120px] min-h-screen"
    >
      <div className="container mx-auto h-full">
        <div className="flex flex-wrap lg:flex-nowrap h-full">
          <div className="w-full lg:w-1/4 space-y-6 lg:space-y-8 px-4">
            <div className="rounded-xl bg-white p-6 shadow dark:bg-dark dark:shadow-none">
              <div className="relative mx-auto mb-4 h-[120px] w-[120px]">
                <Image
                  src={
                    user?.profile_picture ?? "/images/team/blank-profile-picture-973460_640.png"
                  }
                  alt={user?.name}
                  className="rounded-full"
                  width={120}
                  height={120}
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-dark dark:text-white">
                  {user?.name}
                </h3>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow dark:bg-dark dark:shadow-none">
              <div className="space-y-2">
                <button
                  className={`w-full text-left py-2 font-medium text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-dark-3 transform hover:scale-105 transition duration-200 ${activeSection === "membership" ? "bg-gray-200 dark:bg-dark-3" : ""
                    }`}
                  onClick={() => setActiveSection("membership")}
                >
                  Membership
                </button>
                <button
                  className={`w-full text-left py-2 font-medium text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-dark-3 transform hover:scale-105 transition duration-200 ${activeSection === "settings" ? "bg-gray-200 dark:bg-dark-3" : ""
                    }`}
                  onClick={() => setActiveSection("settings")}
                >
                  Settings
                </button>
                {user?.user_type !== "student" && (
                  <button
                    className={`w-full text-left py-2 font-medium text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-dark-3 transform hover:scale-105 transition duration-200 ${activeSection === "createBlog" ? "bg-gray-200 dark:bg-dark-3" : ""
                      }`}
                    onClick={() => setActiveSection("createBlog")}
                  >
                    Create Blog
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4 px-4 mt-6 lg:mt-0 flex-1 flex flex-col">
            <div className="rounded-xl bg-white p-6 shadow dark:bg-dark dark:shadow-none flex-1">
              {activeSection === "membership" && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 text-dark dark:text-white">
                    Membership
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {membership?.length > 0 && membership?.map((value: any) => (
                      <>
                        <div
                          className="relative z-10 mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14"
                          data-wow-delay=".1s"
                        >
                          <span className="mb-5 block text-xl font-medium text-dark dark:text-white">
                            {value?.title}
                          </span>
                          <h2 className="mb-11 text-4xl font-semibold text-dark dark:text-white xl:text-[42px] xl:leading-[1.21]">
                          </h2>
                          <div className="w-full">
                            <Link href={`/community?communityId=${value?.id}`}>
                              <button
                                className="inline-block rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white transition duration-300 hover:bg-primary/90"
                              >
                                View
                              </button>
                            </Link>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              )}
              {activeSection === "settings" && (
                <Setting />
              )}
              {activeSection === "createBlog" && (
                <CreateBlog />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
