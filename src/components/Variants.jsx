import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";


function Variants() {
  const [variants, setVariants] = useState({}); // To store option names and their values
  const [currentOption, setCurrentOption] = useState(""); // For temporary option name input
  const [currentValue, setCurrentValue] = useState(""); // For temporary option value input

  // Add a new option
  const addOption = () => {
    if (currentOption.trim() !== "") {
      setVariants((prev) => ({
        ...prev,
        [currentOption]: prev[currentOption] || [], // Initialize with an empty array if not existing
      }));
      setCurrentOption(""); // Reset currentOption input
    }
  };

  // Add a value to an existing option
  const addValueToOption = (optionName) => {
    if (currentValue.trim() !== "") {
      setVariants((prev) => ({
        ...prev,
        [optionName]: [...prev[optionName], currentValue],
      }));
      setCurrentValue(""); // Reset currentValue input
    }
  };

  // Remove an option
  const removeOption = (optionName) => {
    setVariants((prev) => {
      const updatedVariants = { ...prev };
      delete updatedVariants[optionName];
      return updatedVariants;
    });
  };

  // Remove a value from an option
  const removeValue = (optionName, valueIndex) => {
    setVariants((prev) => ({
      ...prev,
      [optionName]: prev[optionName].filter((_, index) => index !== valueIndex),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Variants:", variants);
  };

  useEffect(() => {
    console.log(variants);
  }, [variants]);

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Variants</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Option Name</label> 
          <div className="flex items-center space-x-2">
            <input type="text" value={currentOption} onChange={(e) => setCurrentOption(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="button" onClick={addOption} className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 focus:outline-none">
              <FaPlus />
            </button>
          </div>
        </div>

        {Object.keys(variants).map((optionName) => (
          <div key={optionName} className="mb-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-800">{optionName}</h4>
              <button type="button" onClick={() => removeOption(optionName)} className="text-red-500 hover:text-red-600 flex items-center space-x-2" ><FaTrash /></button>
            </div>
            <ul className="mt-2 space-y-2">
              {variants[optionName].map((value, index) => (
                <li key={index} className="flex items-center justify-between px-3 py-2 bg-white rounded-lg shadow">
                  <span>{value}</span>
                  <button type="button" onClick={() => removeValue(optionName, index)} className="text-red-500 hover:text-red-600 flex items-center space-x-2" >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-1">Add Value:</label>
              <div className="flex items-center space-x-2">
                <input type="text" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="button" onClick={() => addValueToOption(optionName)} className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 focus:outline-none" >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        ))}

        <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none">Save Variants</button>
      </form>
    </div>
  );
}

export default Variants;
