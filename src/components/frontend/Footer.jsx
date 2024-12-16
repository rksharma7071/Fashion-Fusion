import React from "react";

function Footer() {
  return (
    <footer className="bg-white mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://FashionFusion.com/"
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
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2023{" "}
          <a href="https://FashionFusion.com/" className="hover:underline">
          Fashion Fusion™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
