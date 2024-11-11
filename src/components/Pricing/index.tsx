"use client";
import SectionTitle from "../Common/SectionTitle";
import PricingBox from "./PricingBox";
import { pricingData } from "@/stripe/pricingData";
import { useEffect, useState } from "react";
import { Modal, Input, Button, Radio } from "antd"; // Import Radio from antd
import axios from 'axios'; // Import axios
import usePricingData from "./usePricingData";

const Pricing = () => {
  const { data, loading, error } = usePricingData();
  const [programs, setPrograms] = useState(pricingData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [newProgram, setNewProgram] = useState({
    title: "",
    description: "",
    subscriptionType: "monthly",  // Default to monthly
    monthlyPrice: null,
    oneTimePrice: null,
    // durationInMonths: null,
    isLifetimeAccess: false,
    instructorId: user?.id,
  });

  useEffect(() => {
    const isAnyOneLogin = localStorage.getItem("login_user_data");
    if (isAnyOneLogin) {
      const userData = JSON.parse(isAnyOneLogin);
      setUser(userData);
    }
  }, []);

  const handleAddProgram = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNewProgram((prevProgram) => ({
      ...prevProgram,
      [name]: value,
    }));
  };

  const handleSubscriptionTypeChange = (e: { target: { value: any; }; }) => {
    setNewProgram((prevProgram) => ({
      ...prevProgram,
      subscriptionType: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3333/create-program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newProgram.title,
          description: newProgram.description,
          subscriptionType: newProgram.subscriptionType, // This should be either 'monthly' or 'one-time'
          monthlyPrice: newProgram.monthlyPrice,
          oneTimePrice: newProgram.oneTimePrice,
          isLifetimeAccess: newProgram.isLifetimeAccess,
          instructorId: user?.id || 1, // Ensure this is a valid number
        }),
      });

      if (response.ok) {
        const savedProgram = await response.json();
        // Add the newly created program to the state
        setPrograms((prevPrograms) => [...prevPrograms, savedProgram]);
        // Reset the new program state
        setNewProgram({
          title: "",
          description: "",
          subscriptionType: "", // Reset the subscription type
          monthlyPrice: null,
          oneTimePrice: null,
          isLifetimeAccess: false,
          instructorId: user?.id || 1,
        });
        // Close the modal
        setIsModalOpen(false);
        window.location.reload();
      } else {
        console.error("Failed to create program:", response.statusText);
        // Optionally handle validation errors or display a message to the user
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            title="Our Program"
            paragraph="Join our comprehensive program designed to empower farmers with the knowledge and skills necessary for modern agricultural practices. Together, we can enhance your productivity and sustainability, ensuring a fruitful future for your farming endeavors."
            center
          />
          {user?.user_type !== 'student' && <Button
            onClick={handleAddProgram}
            className="mt-4"
            type="primary"
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
          >
            Add New Program
          </Button>}
        </div>

        {/* Pricing Boxes */}
        <div className="-mx-4 flex flex-wrap justify-center">
          {data.map((product, i) => (
            <PricingBox key={i} product={product} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        title="Add New Program"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okText="Add Program"
        cancelText="Cancel"
        bodyStyle={{
          backgroundColor: document.body.classList.contains("dark")
            ? "#1f1f1f"
            : "#ffffff",
        }}
        okButtonProps={{
          style: {
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            color: "#ffffff",
            cursor: "default",
          },
        }}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <Input
            type="text"
            name="title"
            value={newProgram.title}
            onChange={handleInputChange}
            placeholder="Program title"
            className="dark:bg-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <Input.TextArea
            name="description"
            value={newProgram.description}
            onChange={handleInputChange}
            placeholder="Program description"
            className="dark:bg-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subscription Type</label>
          <Radio.Group onChange={handleSubscriptionTypeChange} value={newProgram.subscriptionType}>
            <Radio value="monthly">Monthly</Radio>
            <Radio value="one-time">One Time</Radio>
          </Radio.Group>
        </div>

        {newProgram.subscriptionType === "monthly" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Price</label>
            <Input
              type="number"
              name="monthlyPrice"
              value={newProgram.monthlyPrice || ''}
              onChange={handleInputChange}
              placeholder="Monthly price"
              className="dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
        )}

        {newProgram.subscriptionType === "one-time" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">One-Time Price</label>
            <Input
              type="number"
              name="oneTimePrice"
              value={newProgram.oneTimePrice || ''}
              onChange={handleInputChange}
              placeholder="One-time price"
              className="dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Pricing;
