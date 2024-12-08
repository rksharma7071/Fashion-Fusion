import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/Firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function CollectionList({
  search,
  collections,
  setCollections,
  formUpdate,
  setFormUpdate,
}) {
  const{generateSlug} = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editCollection, setEditCollection] = useState({});

  const handleEdit = (collection) => {
    setIsEditing(true);
    setEditCollection(collection);
  };

  const handleSaveEdit = async () => {
    try {
      const collectionRef = doc(db, "collections", editCollection.id);
      await updateDoc(collectionRef, {
        title: editCollection.title,
        description: editCollection.description,
        slug: generateSlug(editCollection.title),
        updated_at: serverTimestamp(),
      });
      console.log("Document updated with ID: ", editCollection.id);
      setIsEditing(false);
      setEditCollection({});
      setFormUpdate(!formUpdate);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const handleDelete = async (collectionId) => {
    try {
      const collectionRef = doc(db, "collections", collectionId);
      await deleteDoc(collectionRef);
      console.log("Document deleted with ID: ", collectionId);
      setCollections(
        collections.filter((collection) => collection.id !== collectionId)
      );
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCollection({
      ...editCollection,
      [name]: value,
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      {collections && (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Collection name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {collections
              .filter(
                (collection) =>
                  collection.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  collection.description
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )
              .map((collection) => (
                <tr
                  key={collection.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {collection.title}
                  </th>
                  <td className="px-6 py-4">{collection.description}</td>
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <button
                      onClick={() => handleEdit(collection)}
                      className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-500 hover:text-indigo-800 dark:hover:text-indigo-300 transition duration-200 ease-in-out"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 2l6 6-6 6M8 12l-6 6 6 6"
                        ></path>
                      </svg>
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(collection.id)}
                      className="flex items-center text-sm font-medium text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-300 transition duration-200 ease-in-out"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full min-w-[200px] max-w-2xl max-h-full m-auto rounded-md p-3 bg-white dark:bg-gray-800 shadow-lg">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
              Add New Collection
            </h1>
            <div className="space-y-4 flex flex-col justify-center">
              <div className="w-full min-w-[200px] px-5 py-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Title
                </label>
                <input
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type here..."
                  name="title"
                  value={editCollection.title}
                  onChange={handleEditChange}
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
                  placeholder="Type here..."
                  name="description"
                  value={editCollection.description}
                  onChange={handleEditChange}
                  required
                ></textarea>
              </div>
              <div className="flex justify-evenly w-full max-w-sm min-w-[200px] m-auto">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                  onClick={handleSaveEdit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-10
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1000
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
