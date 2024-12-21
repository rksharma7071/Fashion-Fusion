import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-white mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to={"/"}
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            {/* <img
              src="https://FashionFusion.com/docs/images/logo.svg"
              className="h-8"
              alt="Fashion Fusion Logo"
            /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Fashion Fusion
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <Link to={'/'} className="hover:underline me-4 md:me-6">About</Link>
            </li>
            <li>
              <Link to={'/'} className="hover:underline me-4 md:me-6">Privacy Policy</Link>
            </li>
            <li>
              <Link to={'/'} className="hover:underline me-4 md:me-6">Licensing</Link>
            </li>
            <li>
              <Link to={'/contact'} className="hover:underline">Contact Us</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2023{" "}
          <Link href="https://FashionFusion.com/" className="hover:underline">
          Fashion Fusion™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
