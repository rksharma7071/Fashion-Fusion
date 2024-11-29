import React, { useState } from 'react'
import ProductList from './ProductList';
import { useAuth } from '../context/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

function Products() {
  const { products, setProducts, collections } = useAuth();
  const [addPop, setAddPop] = useState(false);
  const [product, setProduct] = useState({});
  const [formUpdate, setFormUpdate] = useState(false);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState(product.categories || []); // Selected categories
  const [inputValue, setInputValue] = useState("");

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const createProduct = async (product) => {
    try {
      const docRef = await addDoc(collection(db, "products"), product);
      console.log("Document Written with ID: ", docRef.id);
    } catch (e) {
      console.log("Error adding product: ", e);
    }
  }

  const handleAddProductForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    createProduct(product);
    setProduct({ ...product, [name]: '', });
  }

  // ---------------------
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddCategory = (collectionName) => {
    if (!categories.includes(collectionName)) {
      const updatedCategories = [...categories, collectionName];
      setCategories(updatedCategories);
      handleProductChange({ target: { name: "categories", value: updatedCategories } });
    }
    setInputValue(""); // Clear the input field after adding
  };

  const handleRemoveCategory = (category) => {
    const updatedCategories = categories.filter((item) => item !== category);
    setCategories(updatedCategories);
    handleProductChange({ target: { name: "categories", value: updatedCategories } });
  };

  // Filter collections based on input
  const filteredCollections = collections.filter((col) =>
    col.name?.toLowerCase().includes(inputValue.toLowerCase())
  );

  

  console.log(product)
  return (
    <div className="p-4 sm:ml-64">
      {addPop &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full min-w-[200px] max-w-2xl max-h-full m-auto rounded-md p-3 bg-white dark:bg-gray-800 shadow-lg">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
              Add New Product
            </h1>
            <form className="space-y-4 flex flex-col justify-center" onSubmit={handleAddProductForm}>
              <div className="w-full min-w-[200px] px-5 py-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input type='text' id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type here..." name='title' value={product.title} onChange={handleProductChange} required />
              </div>
              <div className="w-full min-w-[200px] px-5 py-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea id="description" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" rows="4" placeholder="Type here..." name='description' value={product.description} onChange={handleProductChange} required ></textarea>
              </div>
              <div className='grid grid-cols-2'>
                <div className="w-full min-w-[200px] px-5 py-2">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
                  <input type='number' id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type here..." name='price' value={product.price} onChange={handleProductChange} required />
                </div>
                <div className="w-full min-w-[200px] px-5 py-2">
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                  <input type='number' id="stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type here..." name='stock' value={product.stock} onChange={handleProductChange} required />
                </div>
                <div className="w-full min-w-[200px] px-5 py-2">
                  <label htmlFor="categories" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categories</label>
                  <input type='text' id="categories" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type here..." name='categories' value={product.categories} onChange={handleProductChange} required />
                </div>
                <div className="w-full min-w-[200px] px-5 py-2">
                  <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                  <input type='url' id="imageURL" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type here..." name='imageURL' value={product.imageURL} onChange={handleProductChange} required />
                </div>
              </div>
              <div className="flex justify-evenly w-full max-w-sm min-w-[200px] m-auto">
                <button type="button" onClick={() => setAddPop(!addPop)} className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600">Submit</button>
              </div>
            </form>
          </div>
        </div>
      }
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative w-1/2">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
        </div>
        <div>
          <button onClick={() => setAddPop(!addPop)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600">Add Collection</button>
        </div>
      </div>
      {/* <ProductList search={search} products={products} setProduct={setProduct} formUpdate={formUpdate} setFormUpdate={setFormUpdate} /> */}
    </div>
  )
}

export default Products