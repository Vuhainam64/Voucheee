import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaSearch } from "react-icons/fa";
import { logoPrimary } from "../../assets/img";
import UserProfileDetails from "./UserProfileDetails";

const HomeHeader = () => {
  const user = useSelector((state) => state.user?.user);
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-between bg-white w-full ${
        hasShadow ? "shadow-xl" : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center w-full justify-between">
        <Link to="/">
          <img src={logoPrimary} alt="logo" className="p-4 h-20" />
        </Link>
        <div className="">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 w-full text-primary">
              <FaSearch />
            </div>
            <input
              type="search"
              className="block w-full outline-none rounded-md px-8 py-2 items-center border bg-gray-200 min-w-620"
              placeholder="Tìm kiếm voucher..."
            />
          </div>
        </div>
        <div className="relative inline-block text-left">
          {user ? (
            <UserProfileDetails />
          ) : (
            <Link
              to="/auth/login"
              className="bg-white p-2 px-8 rounded-2xl m-2"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
