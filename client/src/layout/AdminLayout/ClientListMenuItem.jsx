import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FaChevronDown } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

const ClientListMenuItem = ({ menu, isClose }) => {
  const [isSubMenu, setIsSubMenu] = useState(false);

  return (
    <React.Fragment>
      <NavLink
        to={menu.uri}
        onClick={() => setIsSubMenu(!isSubMenu)}
        className={`group flex items-center gap-x-4 cursor-pointer p-2 
        px-3 bg-primary hover:bg-teal-600 hover:shadow-lg rounded-md
        w-full ${menu.spacing ? "mt-12" : "mt-4"} ${
          isSubMenu && "bg-teal-600"
        }`}
      >
        <span
          className={`w-8 h-8 flex items-center justify-center rounded-full
        bg-third group-hover:bg-gradient-to-br group-hover:from-heroPrimary
        group-hover:to-heroSecondory ${
          isSubMenu && "bg-gradient-to-br from-heroPrimary to-heroSecondory"
        }`}
        >
          {
            <menu.Icon
              className={`text-xl block float-left text-textPrimary hover:text-secondory`}
            />
          }
        </span>
        <span
          className={`text-textPrimary group-hover:text-textSecondory text-base
        font-medium flex-1 duration-200 ${isClose && "hidden"} ${
            isSubMenu && "text-textSecondory"
          }`}
        >
          {menu.title}
        </span>
        {menu.submenu && !isClose && (
          <FaChevronDown
            className={`text-textPrimary duration-200 ${
              isSubMenu && "text-textSecondory rotate-180"
            }`}
          />
        )}
      </NavLink>
      <AnimatePresence>
        {menu.submenu && isSubMenu && !isClose && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-primary mt-2 rounded-md"
          >
            {menu.subMenuItems.map((item, index) => (
              <Link
                to={item.uri}
                className={`group flex items-center gap-x-4 cursor-pointer
              py-3 px-4 w-full`}
                key={index}
              >
                <span>
                  {
                    <item.Icon
                      className="text-xl  block float-left
                text-textPrimary group-hover:text-heroPrimary"
                    />
                  }
                </span>
                <span
                  className={`text-textPrimary group-hover:text-heroPrimary
                  text-base font-medium flex-1 duration-200 ${
                    isClose && "hidden"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default ClientListMenuItem;
