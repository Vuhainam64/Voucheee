import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import { Avatar } from "../../assets/img";
import { DashboardMenus, signOutAction } from "../../utils/helpers";
import { dropdownMenu } from "../../animations";

const UserProfileContainer = () => {
  const user = useSelector((state) => state.user?.user);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center cursor-pointer relative">
      {/* name content  */}
      <div className="flex flex-col items-start justify-start gap-1">
        <h2 className="text-lg font-bold text-primary capitalize text-nowrap">
          {user?.displayName}
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center
            border-2 border-gray-600 text-sm text-heroSecondory"
          >
            $
          </div>
          {user?.walletBalance ? (
            <React.Fragment>
              <p className="text-lg font-semibold text-primary">
                {user?.walletBalance}
              </p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p className="text-lg font-semibold text-heroPrimary">0</p>
            </React.Fragment>
          )}
        </div>
      </div>
      {/* img content  */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        className="w-14 h-14 rounded-full p-1 flex items-center
        justify-center relative bg-gradient-to-b from-heroPrimary to bg-heroSecondory"
      >
        <img
          src={user?.photoURL ? user?.photoURL : Avatar}
          alt="Avatar"
          className="w-full h-full object-cover rounded-full"
        />
        <div
          className="w-4 h-4 rounded-full bg-secondory absolute
          bottom-1 right-0 flex items-center justify-center border border-gray-600"
        >
          <FaChevronDown className="text-[10px] text-textSecondory" />
        </div>
      </div>

      {/* dropdown section  */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            {...dropdownMenu}
            onMouseLeave={() => setIsHovered(false)}
            className="absolute top-16 right-0 bg-white border shadow-md flex
            flex-col items-start justify-start w-64 px-3 py-2 gap-4 z-50"
          >
            {DashboardMenus &&
              DashboardMenus.map((menu, index) => (
                <React.Fragment key={index}>
                  {menu.isAdmin ? (
                    <div className="flex items-center justify-between w-full">
                      <Link
                        to={menu.uri}
                        className="py-2 px-1 font-semibold hover:text-heroSecondory"
                        key={menu.id}
                      >
                        {menu.menu}
                      </Link>
                      <FaChevronRight />
                    </div>
                  ) : (
                    <Link
                      to={menu.uri}
                      className="py-2 px-1 font-semibold hover:text-heroSecondory"
                      key={menu.id}
                    >
                      {menu.menu}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            <button
              type="button"
              onClick={signOutAction}
              className="px-4 py-2 w-full rounded-md bg-textPrimary text-primary
              active:scale-95 transition-all ease-in-out duration-150"
            >
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileContainer;
