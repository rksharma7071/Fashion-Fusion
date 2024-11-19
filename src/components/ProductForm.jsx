import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "../config/Config";
import ProductList from "./ProductList";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: [],
    price: "",
    compareAtPrice: "",
    inventory: "",
    continueSelling: false,
    sku: "",
    barcode: "",
    weight: "",
    variants: [],
    status: "active",
    tags: [],
  });
  const [variants, setVariants] = useState({});
  const [currentOption, setCurrentOption] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);

  const addCategory = () => {
    if (currentCategory.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        category: [...prevData.category, currentCategory],
      }));
      setCurrentCategory("");
    }
  };

  const removeCategory = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      category: prevData.category.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (currentTag.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, currentTag],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index),
    }));
  };

  const addOption = () => {
    if (currentOption.trim() !== "") {
      setVariants((prev) => ({
        ...prev,
        [currentOption]: prev[currentOption] || [],
      }));
      setCurrentOption("");
    }
  };

  const addValueToOption = (optionName) => {
    if (currentValue.trim() !== "") {
      setVariants((prev) => ({
        ...prev,
        [optionName]: [...prev[optionName], currentValue],
      }));
      setCurrentValue("");
    }
  };

  const removeOption = (optionName) => {
    setVariants((prev) => {
      const updatedVariants = { ...prev };
      delete updatedVariants[optionName];
      return updatedVariants;
    });
  };

  const removeValue = (optionName, valueIndex) => {
    setVariants((prev) => ({
      ...prev,
      [optionName]: prev[optionName].filter((_, index) => index !== valueIndex),
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [db]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      variants: variants,
    };

    console.log("Form Data:", updatedFormData);

    try {
      console.log("formData: ", formData);

      const docRef = await addDoc(collection(db, "Products"), formData);
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.error("Error adding document: ", err);
      // setError(err.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Add Product
        </h2>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={8}
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categories
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={currentCategory}
              onChange={(e) => setCurrentCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={addCategory}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul className="flex mt-2 gap-2">
            {formData.category.map((cat, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-3 py-2 bg-white rounded-lg shadow"
              >
                <span>{cat}</span>
                <button
                  type="button"
                  onClick={() => removeCategory(index)}
                  className="text-black hover:text-gray-800 ml-2"
                >
                  <IoMdClose />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Compare at Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Compare at Price
          </label>
          <input
            type="number"
            name="compareAtPrice"
            value={formData.compareAtPrice}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Inventory */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Inventory
          </label>
          <input
            type="number"
            name="inventory"
            value={formData.inventory}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Continue Selling */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="continueSelling"
            checked={formData.continueSelling}
            onChange={handleChange}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label className="text-sm font-medium text-gray-700">
            Continue Selling When Out of Stock
          </label>
        </div>

        {/* SKU */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SKU
          </label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Barcode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Barcode
          </label>
          <input
            type="text"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight
          </label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Option Name
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={currentOption}
              onChange={(e) => setCurrentOption(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addOption}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 focus:outline-none"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {Object.keys(variants).map((optionName) => (
          <div key={optionName} className="mb-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-800">
                {optionName}
              </h4>
              <button
                type="button"
                onClick={() => removeOption(optionName)}
                className="text-red-500 hover:text-red-600 flex items-center space-x-2"
              >
                <FaTrash />
              </button>
            </div>
            <ul className="mt-2 flex gap-2">
              {variants[optionName].map((value, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between px-3 py-2 bg-white rounded-lg shadow"
                >
                  <span>{value}</span>
                  <button
                    type="button"
                    onClick={() => removeValue(optionName, index)}
                    className="text-black hover:text-gray-800 flex items-center space-x-2 ml-2"
                  >
                    <IoMdClose />
                    {/* <FaTrash /> */}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-1">
                Add Value:
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => addValueToOption(optionName)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 focus:outline-none"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul className="flex mt-2 gap-2">
            {formData.tags.map((tag, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-3 py-2 bg-white rounded-lg shadow"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="text-black hover:text-gray-800 ml-2"
                >
                  <IoMdClose />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
        >
          Save Product
        </button>
      </form>
      <ProductList products={products}/>
    </>
  );
};

export default ProductForm;
