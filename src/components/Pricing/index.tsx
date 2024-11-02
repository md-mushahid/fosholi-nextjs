"use client";
import SectionTitle from "../Common/SectionTitle";
import PricingBox from "./PricingBox";
import { pricingData } from "@/stripe/pricingData";
import { useState } from "react";

const Pricing = () => {
  const [programs, setPrograms] = useState(pricingData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProgram, setNewProgram] = useState({
    id: programs.length + 1,
    name: "",
    price: 0,
    description: "",
  });

  const handleAddProgram = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProgram((prevProgram) => ({
      ...prevProgram,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setPrograms([...programs, newProgram]);
    setNewProgram({
      id: programs.length + 2, // Increment for the next new program
      name: "",
      price: 0,
      description: "",
    });
    setIsModalOpen(false);
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

          <button
            onClick={handleAddProgram}
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add New Program
          </button>
        </div>

        {/* Pricing Boxes */}
        <div className="-mx-4 flex flex-wrap justify-center">
          {programs.map((product, i) => (
            <PricingBox key={i} product={product} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Add New Program</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <input
                type="text"
                name="name"
                value={newProgram.name}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                placeholder="Program title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
              <input
                type="number"
                name="price"
                value={newProgram.price}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                placeholder="Program price"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                name="description"
                value={newProgram.description}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                placeholder="Program description"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Add Program
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
