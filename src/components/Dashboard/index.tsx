// Import necessary modules
'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import CreateBlog from "./CreateBlog";

const membershipData = [
  {
    id: 1,
    courseName: "Advanced UI Design",
    membershipType: "Premium",
    thumbnail: "/images/courses/course-01.png",
  },
  {
    id: 2,
    courseName: "JavaScript Essentials",
    membershipType: "Standard",
    thumbnail: "/images/courses/course-02.png",
  },
];

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [activeSection, setActiveSection] = useState("membership");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<Blob | null>(null);

  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const isAnyOneLogin = localStorage.getItem("login_user_data");
    if (isAnyOneLogin) {
      const userData = JSON.parse(isAnyOneLogin);
      setUser(userData);
      setName(userData.name);
      setEmail(userData.email);
    }
  }, []);

  // Function to handle profile picture upload as blob
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file); // Directly store the file (blob)
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", newPassword ? newPassword : user.password);
    if (profileImage) formData.append("image", profileImage);
    const updatedUser = {
      id: user.id,
      name,
      email,
      user_type: user.user_type,
      password: newPassword || user.password,
      profile_picture: profileImage || user.image,
    };

    try {
      const response = await fetch("http://127.0.0.1:3333/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        localStorage.setItem("login_user_data", JSON.stringify(updatedUser));
        setUser(updatedUser);
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Failed to update user: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user. Please try again.");
    }

  };

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
                    user?.image
                      ? user.image
                      : "/images/team/blank-profile-picture-973460_640.png"
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
                {user?.membershipType !== "Student" && (
                  <button
                    className={`w-full text-left py-2 font-medium text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-dark-3 transform hover:scale-105 transition duration-200 ${activeSection === "createBlog" ? "bg-gray-200 dark:bg-dark-3" : ""
                      }`}
                    onClick={() => setActiveSection("createBlog")}
                  >
                    Create Blog
                  </button>
                )}
                <button
                  className={`w-full text-left py-2 font-medium text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-dark-3 transform hover:scale-105 transition duration-200 ${activeSection === "appointment" ? "bg-gray-200 dark:bg-dark-3" : ""
                    }`}
                  onClick={() => setActiveSection("appointment")}
                >
                  Appointment
                </button>
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
                    {membershipData.map((membership) => (
                      <div
                        key={membership.id}
                        className="bg-gray-100 dark:bg-dark-4 p-4 rounded-lg shadow-md"
                      >
                        <Image
                          src={membership.thumbnail}
                          alt={membership.courseName}
                          width={150}
                          height={100}
                          className="w-full h-auto rounded-md mb-4"
                        />
                        <p className="text-sm font-semibold text-dark dark:text-white">
                          {membership.courseName}
                        </p>
                        <p className="text-xs text-body-color dark:text-dark-6">
                          {membership.membershipType} Membership
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeSection === "settings" && (
                <form onSubmit={handleSubmit} className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 text-dark dark:text-white">
                    Settings
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                        Profile Picture
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border rounded-lg p-2"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
                    >
                      Update Settings
                    </button>
                  </div>
                </form>
              )}
              {activeSection === "createBlog" && (
                <CreateBlog />
              )}
              {activeSection === "appointment" && (
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-dark dark:text-white">
                    Appointment
                  </h4>
                  <p>Your appointments will be displayed here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
