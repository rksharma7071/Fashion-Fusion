import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/Firebase";

export default function Products() {
  const { products, setProducts, collections, generateSlug } = useAuth();
  const [addPop, setAddPop] = useState(false);
  const [product, setProduct] = useState({});
  const [search, setSearch] = useState("");
  const [catPop, setCatPop] = useState(false);
  const [catSearch, setCatSearch] = useState("");
  const [formUpdate, setFormUpdate] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const createProduct = async (productData) => {
    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...productData,
        slug: generateSlug(productData.title),
        categories: selectedCategories,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
      console.log("Document Written with ID: ", docRef.id);
      // setProducts((prevProducts) => [...prevProducts, {
      //   ...productData,
      //   id: docRef.id,
      // }]);
    } catch (e) {
      console.log("Error adding product: ", e);
    }
  };

  const handleAddProductForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
      categories: selectedCategories,
    });
    createProduct(product);
    setProduct({});
    setSelectedCategories([]);
    setAddPop(false);
    console.log("Product:", product);
  };
  const handleCheckboxChange = (collection) => {
    setSelectedCategories((prev) =>
      prev.includes(collection)
        ? prev.filter((item) => item !== collection)
        : [...prev, collection]
    );
  };

  const selectedTitles = selectedCategories.map((id) => {
    const collection = collections.find((col) => col.id === id);
    return collection ? collection.title : `Unknown Title (${id})`;
  });

  useEffect(() => {
    setSearch(search);
  }, [search]);

  return (
    <div className="p-4 sm:ml-64">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative w-1/2">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
        <div>
          <button
            onClick={() => setAddPop(!addPop)}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Add Product
          </button>
        </div>
      </div>
      {addPop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full min-w-[200px] max-w-2xl max-h-full m-auto rounded-md p-3 bg-white dark:bg-gray-800 shadow-lg">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
              Add New Product
            </h1>
            <form
              className="space-y-4 flex flex-col justify-center"
              onSubmit={handleAddProductForm}
            >
              <div className="w-full min-w-[200px] px-5 py-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Title"
                  name="title"
                  value={product.title}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div className="w-full min-w-[200px] px-5 py-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  rows="4"
                  placeholder="Enter Description"
                  name="description"
                  value={product.description}
                  onChange={handleProductChange}
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-2">
                <div className="w-full min-w-[200px] px-5 py-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Price"
                    name="price"
                    value={product.price}
                    onChange={handleProductChange}
                    required
                  />
                </div>
                <div className="w-full min-w-[200px] px-5 py-2">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Inventory"
                    name="stock"
                    value={product.stock}
                    onChange={handleProductChange}
                    required
                  />
                </div>
                <div className="w-full min-w-[200px] px-5 py-2">
                  <label
                    htmlFor="categories"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Categories
                  </label>
                  <input
                    onClick={() => setCatPop(!catPop)}
                    type="text"
                    readOnly
                    id="categories"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Select Categories"
                    name="categories"
                    value={selectedTitles.join(", ")}
                    onChange={handleProductChange}
                    required
                  />
                  <button
                    onClick={() => setCatPop(!catPop)}
                    className="mt-2 text-blue-600"
                  >
                    {catPop ? "Close Category List" : "Select Categories"}
                  </button>
                  <div
                    id="dropdownSearch"
                    className={`z-10 bg-white rounded-lg shadow dark:bg-gray-700 absolute ${
                      catPop ? "block" : "hidden"
                    }`}
                    aria-hidden="true"
                    data-popper-placement="bottom"
                  >
                    <div className="p-3">
                      <label htmlFor="input-group-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          onChange={(e) => setCatSearch(e.target.value)}
                          id="input-group-search"
                          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Search categories"
                        />
                      </div>
                    </div>
                    <ul
                      className="h-28 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownSearchButton"
                    >
                      {collections
                        .filter((collection) =>
                          collection.title
                            .toLowerCase()
                            .includes(catSearch.toLowerCase())
                        )
                        .map((collection, index) => (
                          <li key={index}>
                            <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                              <input
                                id={`checkbox_${index}`}
                                checked={selectedCategories.includes(
                                  collection.id
                                )}
                                onChange={() =>
                                  handleCheckboxChange(collection.id)
                                }
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                              />
                              <label
                                htmlFor={`checkbox_${index}`}
                                className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                              >
                                {collection.title}
                              </label>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="w-full min-w-[200px] px-5 py-2">
                  <label
                    htmlFor="imageURL"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="imageURL"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Image URL"
                    name="imageURL"
                    value={product.imageURL}
                    onChange={handleProductChange}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end m-auto gap-5 px-5 py-2">
                <button
                  type="button"
                  onClick={() => setAddPop(!addPop)}
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ProductList
        search={search}
        products={products}
        setProduct={setProduct}
        formUpdate={formUpdate}
        setFormUpdate={setFormUpdate}
      />
    </div>
  );
}
