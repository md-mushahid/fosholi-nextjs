import axios from "axios";
import { set } from "date-fns";
import { useEffect, useState } from "react";

const Setting = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const uploadImageToImageBB = async () => {
    if (!profileImage) return null;
    const formData = new FormData();
    formData.append("image", profileImage);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=751ba107ccdfcd0750c8d8b97f66956a`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data.url; // Return the uploaded image URL
    } catch (error) {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();  // Remove leading/trailing spaces
    const namePattern = /^[a-zA-Z\s.]+$/;
    if (!trimmedName || !namePattern.test(trimmedName)) {
      alert("Name should only contain letters, spaces, and periods and cannot be empty.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (newPassword.length) {
      const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!newPassword || !passwordPattern.test(newPassword)) {
        alert("Password must be at least 8 characters long and contain at least one letter and one number.");
        return;
      }
    }

    const imageUrl = await uploadImageToImageBB();

    if (!imageUrl && profileImage) {
      alert("Image upload failed. Please try again.");
      return;
    }
    const updatedUser = {
      id: user.id,
      name: name,
      email: email,
      password: newPassword ? newPassword : user.password,
      profile_picture: imageUrl || user.image,
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
        localStorage.setItem("login_user_data", JSON.stringify({...updatedUser, user_type: user?.user_type}));
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
    <div>
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
              New Password
            </label>
            <input
              type="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-1 px-4 rounded-lg hover:bg-blue-600"
          >
            <span className="px-4">Update</span>
          </button>

        </div>
      </form>
    </div>
  );
};

export default Setting;