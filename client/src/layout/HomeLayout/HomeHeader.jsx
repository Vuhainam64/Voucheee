import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaSearch } from "react-icons/fa";

import { Logo } from "../../assets/img";
import UserProfileDetails from "./UserProfileDetails";

const HomeHeader = () => {
  const user = useSelector((state) => state.user?.user);

  return (
    <div className="flex items-center justify-between bg-primary">
      <Link to="/">
        <img src={Logo} alt="logo" className="p-4" />
      </Link>
      <div className="">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 w-full">
            <FaSearch />
          </div>
          <input
            type="search"
            className="block w-full p outline-none rounded-md px-8 py-2 items-center"
            placeholder="Tìm kiếm voucher..."
          />
        </div>
      </div>
      <div className="relative inline-block text-left">
        {user ? (
          <UserProfileDetails />
        ) : (
          <Link
            to={"/auth/login"}
            className="bg-white p-2 px-8 rounded-2xl m-2"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
