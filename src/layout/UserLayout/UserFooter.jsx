import React from "react";
import { Link } from "react-router-dom";

import { logoPrimary } from "../../assets/img";

const UserFooter = () => {
  return (
    <div className="w-full border-t">
      <div className="grid md:grid-cols-3 my-8">
        <div className="flex mt-2">
          <p className="text-sm text-gray-600 text-center w-full">
            © Copyright 2024. All Rights Reserved
          </p>
        </div>

        <div className="flex justify-center mt-5 md:mt-0 items-center">
          <Link
            to={"/"}
            className="flex-shrink-0 font-semibold flex items-center router-link-exact-active router-link-active"
          >
            <img src={logoPrimary} alt="logo" className="h-10" />
          </Link>
        </div>

        <ul className="flex justify-center mt-5 md:mt-1">
          <li className="mr-10">
            <Link
              to={"/privacy-policy"}
              className="text-gray-600  transition-colors duration-300 hover:text-blue-600"
            >
              {" "}
              Privacy Policy{" "}
            </Link>
          </li>
          <li className="list-disc pl-3">
            <Link
              to={"/terms-conditions"}
              className="text-gray-600  transition-colors duration-300 hover:text-blue-600"
            >
              {" "}
              Terms & Conditions{" "}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserFooter;
