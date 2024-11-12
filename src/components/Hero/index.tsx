'use client'
import { Image } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const isAnyOneLogin = localStorage.getItem("login_user_data");
    if (isAnyOneLogin) {
      const userData = JSON.parse(isAnyOneLogin);
      setUser(userData);
    }
  }, []);

  return (
    <>
      <section
        id="home"
        //className="relative overflow-hidden bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]"
        className="relative overflow-hidden bg-green-500 pt-[120px] md:pt-[130px] lg:pt-[160px]"
        style={{ backgroundImage: `url('/img/bg-2.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <div
                className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-6 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]">
                  FOSHOLI
                </h1>
                <p className="mx-auto mb-9 max-w-[600px] text-base font-medium text-white sm:text-lg sm:leading-[1.44]">
                  We dream a better world for all
                </p>
                <ul className="mb-10 flex flex-wrap items-center justify-center gap-5">
                  <li>
                    <Link
                      href={user ? '/dashboard' : '/signin'}
                      className="inline-flex items-center justify-center rounded-md bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2"
                    >
                      {user ? 'Dashboard' : 'Sign In'}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;