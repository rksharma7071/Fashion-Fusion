import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app, db } from "../firebase/Firebase";
import { useAuth } from "../context/AuthContext";

function CustomerList({ search, users, setUsers, formUpdate, setFormUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState({});
  const { generateSlug } = useAuth();

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditUser(user);
  };

  const handleSaveEdit = async () => {
    try {
      const userRef = doc(db, "users", editUser.id);
      await updateDoc(userRef, {
        name: editUser.name,
        email: editUser.email,
        phone: editUser.phone,
        street: editUser.street,
        city: editUser.city,
        state: editUser.state,
        zip: editUser.zip,
        slug: generateSlug(editUser.name, editUser.id),
        imageURL: editUser.imageURL,
        updated_at: serverTimestamp(),
      });
      console.log("Document updated with ID: ", editUser.id);
      setIsEditing(false);
      setEditUser({});
      setFormUpdate(!formUpdate);
      console.log(editUser);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef);
      console.log("Document deleted with ID: ", userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser({
      ...editUser,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      {users && (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(
                (user) =>
                  user.name.toLowerCase().includes(search.toLowerCase()) ||
                  user.email.toLowerCase().includes(search.toLowerCase()) ||
                  user.phone.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => (
                <tr
                  key={user.uid}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
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
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <button
                      onClick={() => handleEdit(user)}
                      className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition duration-200 ease-in-out"
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
                      onClick={() => handleDelete(user.id)}
                      className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
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
          <div className="w-full min-w-[200px] max-w-2xl max-h-full m-auto rounded-md p-3 bg-white shadow-lg">
            <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Edit Customer
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="w-full min-w-[200px] px-5 py-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type here..."
                  name="name"
                  value={editUser.name}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="w-full min-w-[200px] px-5 py-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type here..."
                  name="email"
                  value={editUser.email}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="w-full min-w-[200px] px-5 py-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type here..."
                  name="phone"
                  value={editUser.phone}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="w-full min-w-[200px] px-5 py-2">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type here..."
                  name="street"
                  value={editUser.street}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="w-full min-w-[200px] px-5 py-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type here..."
                  name="city"
                  value={editUser.city}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="w-full min-w-[200px] px-5 py-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type here..."
                  name="state"
                  value={editUser.state}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="w-full min-w-[200px] px-5 py-2">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Zip
                </label>
                <input
                  type="text"
                  id="zip"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type here..."
                  name="zip"
                  value={editUser.zip}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="w-full min-w-[200px] px-5 py-2">
                <label
                  htmlFor="imageURL"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageURL"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter Image URL"
                  name="imageURL"
                  value={editUser.imageURL}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="flex justify-evenly w-full max-w-sm min-w-[200px] m-auto">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
        <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            1-10
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            1000
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CustomerList;
