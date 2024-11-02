"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialSignIn from "../SocialSignIn";
import SwitchOption from "../SwitchOption";
import { useState } from "react";
import MagicLink from "../MagicLink";
import Loader from "@/components/Common/Loader";

const SignUp = () => {
  const router = useRouter();
  const [isPassword, setIsPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);
    const data = new FormData(e.currentTarget);
    const value = Object.fromEntries(data.entries());
    const finalData = { ...value };

    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Successfully registered");
        setLoading(false);
        router.push("/signin");
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <section className="bg-[#F4F7FF] py-14 dark:bg-dark lg:py-[90px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp shadow-form relative mx-auto max-w-[525px] overflow-hidden rounded-xl bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]"
              data-wow-delay=".15s"
            >
              <div className="mb-10 text-center">
                <h1>Sign Up</h1>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-[22px]">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-[22px]">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-[22px]">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-9">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-blue-dark"
                  >
                    Sign Up {loading && <Loader />}
                  </button>
                </div>
              </form>

              <p className="text-body-secondary mb-4 text-base">
                By creating an account you are agree with our{" "}
                <a href="/#" className="text-primary hover:underline">
                  Privacy
                </a>{" "}
                and{" "}
                <a href="/#" className="text-primary hover:underline">
                  Policy
                </a>
              </p>

              <p className="text-body-secondary text-base">
                Already have an account?
                <Link
                  href="/signin"
                  className="pl-2 text-primary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
