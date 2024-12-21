import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app, db } from "../firebase/Firebase";
import CustomerList from "./CustomerList";
import { useAuth } from "../context/AuthContext";

function Customers() {
  const { users, setUsers, generateSlug } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [addPop, setAddPop] = useState(false);
  const [formUpdate, setFormUpdate] = useState(false);
  const auth = getAuth(app);
  const [search, setSearch] = useState("");



  const createUser = async (uid) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        uid: uid,
        name: name,
        email: email,
        phone: phone,
        slug: generateSlug(name, uid),
        created_at: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      setFormUpdate(!formUpdate);
      setUsers([
        ...users,
        {
          uid: uid,
          name: name,
          email: email,
          phone: phone,
          created_at: serverTimestamp(),
        },
      ]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleUserForm = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await createUser(user.uid);
      setAddPop(false);
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Register1", error.message);
    }
  };

  useEffect(() => {
    setSearch(search);
  }, [search]);

  return (
    <div className="p-4 sm:ml-64">
      {addPop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full min-w-[200px] max-w-2xl max-h-full m-auto rounded-md p-3 bg-white shadow-lg">
            <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Add New Customer
            </h1>
            <form
              className="space-y-4 flex flex-col justify-center"
              onSubmit={handleUserForm}
            >
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
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
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
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
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
                  type="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  required
                />
              </div>
              <div className="w-full min-w-[200px] px-5 py-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>

              <div className="flex justify-end m-auto gap-5 px-5 py-2">
                <button
                  type="button"
                  onClick={() => setAddPop(!addPop)}
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative w-1/2">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
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
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            id="table-search"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
        <div>
          <button
            onClick={() => setAddPop(!addPop)}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Customer
          </button>
        </div>
      </div>
      <CustomerList
        search={search}
        users={users}
        setUsers={setUsers}
        formUpdate={formUpdate}
        setFormUpdate={setFormUpdate}
      />
    </div>
  );
}

export default Customers;
