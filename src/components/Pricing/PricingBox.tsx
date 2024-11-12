'use client';
import axios from "axios";
import React, { useEffect, useState } from "react";

const PricingBox = ({ product }: { product: any }) => {
  const [user, setUser] = React.useState<any>(null);
  const [isPurchased, setIsPurchsed] = useState(false);

  useEffect(() => {
    const isAnyOneLogin: any = localStorage.getItem("login_user_data");
    if (isAnyOneLogin) {
      const userData = JSON.parse(isAnyOneLogin);
      const checkIsPurchased = async () => {
        const res: any = await axios.get(`http://127.0.0.1:3333/get-purchased-pricing/${userData.id}/${product.id}`);
        if (res === true) {
          setIsPurchsed(true);
        }
      };
      checkIsPurchased();
      setUser(userData);
    }
  }, []);

  const handleSubscription = async (e: any) => {
    e.preventDefault();
    const isAnyOneLogin: any = JSON.parse(localStorage.getItem("login_user_data"));
    if (!isAnyOneLogin) {
      window.location.href = "http://localhost:3000/signin";
      return;
    }
    const res = await axios.post(
      "http://127.0.0.1:3333/payment",
      {
        product,
        user_id: isAnyOneLogin.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.href = res.data.url;
  };

  // DELETE request to delete pricing
  const handleDelete = async () => {
    const isAnyOneLogin = JSON.parse(localStorage.getItem("login_user_data"));
    if (!isAnyOneLogin) {
      window.location.href = "http://localhost:3000/signin";
    }

    try {
      const res = await axios.post(`http://127.0.0.1:3333/delete-pricing`, { product_id: product.id });
      if (res.status === 200) {
        alert("Pricing has been deleted successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting pricing:", error);
      alert("Failed to delete pricing.");
    }
  };

  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div
        className="relative z-10 mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14"
        data-wow-delay=".1s"
      >
        {product.nickname === "Premium" && (
          <p className="absolute right-[-50px] top-[60px] inline-block -rotate-90 rounded-bl-md rounded-tl-md bg-primary px-5 py-2 text-base font-medium text-white">
            Recommended
          </p>
        )}
        <span className="mb-5 block text-xl font-medium text-dark dark:text-white">
          {product?.title}
        </span>
        <h2 className="mb-11 text-4xl font-semibold text-dark dark:text-white xl:text-[42px] xl:leading-[1.21]">
          <span className="text-xl font-medium">$ </span>
          <span className="-ml-1 -tracking-[2px]">
            {(product.monthly_price || product.one_time_price).toLocaleString(
              "en-US",
              {
                currency: "USD",
              }
            )}
          </span>
          <span className="text-base font-normal text-body-color dark:text-dark-6">
            {" "}
            {product.subscription_type === 'one-time' ? "For One Season" : "Per Month"}
          </span>
        </h2>
        <div className="w-full">
          {
            isPurchased || user?.user_type === 'instructor' ?
              <button
                onClick={()=> window.location.href = `/community?communityId=${product.id}`}
                className="inline-block rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white transition duration-300 hover:bg-primary/90"
              >
                View
              </button> :
              <button
                onClick={handleSubscription}
                className="inline-block rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white transition duration-300 hover:bg-primary/90"
              >
                Purchase Now
              </button>

          }

        </div>
        {
          user?.user_type === 'instructor' &&
          <>
            <div className="w-full mt-4">
              <button
                onClick={handleDelete}
                className="inline-block rounded-md bg-red-600 px-7 py-3 text-center text-base font-medium text-white transition duration-300 hover:bg-red-700"
              >
                Delete Pricing
              </button>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default PricingBox;
