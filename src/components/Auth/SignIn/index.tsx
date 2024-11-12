/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SocialSignIn from "../SocialSignIn";
import SwitchOption from "../SwitchOption";
import MagicLink from "../MagicLink";
import Loader from "@/components/Common/Loader";

const Signin = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    checkboxToggle: false,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const isLogin = localStorage.getItem("login_user_data");
    if (isLogin) {
      router.push("/dashboard");
    }
  }, []);
  const loginUser = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:3333/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Login successful");
        localStorage.setItem("login_user_data", JSON.stringify(data));
        window.location.reload();
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-[#F4F7FF] py-14 dark:bg-dark lg:py-20"
    style={{ backgroundImage: `url('/img/bg-2.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]"
              data-wow-delay=".15s"
            >
              <div className="mb-10 text-center">
                Sign In
              </div>
              <form onSubmit={loginUser}>
                <div className="mb-[22px]">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-[22px]">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-9">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-primary/90"
                  >
                    Sign In {loading && <Loader />}
                  </button>
                </div>
              </form>

              <Link
                href="/forgot-password"
                className="mb-2 inline-block text-base text-dark hover:text-primary dark:text-white dark:hover:text-primary"
              >
                Forget Password?
              </Link>
              <p className="text-body-secondary text-base">
                Not a member yet?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
