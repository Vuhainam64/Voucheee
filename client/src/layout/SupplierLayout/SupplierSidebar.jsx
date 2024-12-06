import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FaChevronRight } from "react-icons/fa";

import { Logo, logoPrimary } from "../../assets/img";
import { SupplierMenus } from "../../utils/helpers";
import ClientListMenuItem from "./ClientListMenuItem";

const SupplierSidebar = () => {
  const [isClose, setIsClose] = useState(false);
  return (
    <div
      className={`${
        isClose ? "w-20 px3" : "w-80"
      } py-3 relative bg-third border-r border-secondory h-full
        duration-200 flex flex-col items-center justify-start 
        overflow-y-auto scrollbar-none`}
    >
      {/* absolute action button  */}
      <div
        onClick={() => {
          setIsClose(!isClose);
        }}
        className="absolute -right-3 px-1 py-4 bg-gradient-to-br from-heroPrimary 
        to-heroSecondory rounded-md cursor-pointer group"
      >
        <FaChevronRight
          className={`text-sm text-white duration-200 ${
            !isClose && "rotate-[540deg]"
          }`}
        />
      </div>

      {/* top section  */}
      <div
        className={`w-full duration-200 inline-flex items-center
        justify-between gap-2 ${!isClose && "px-6"}`}
      >
        {/* image container  */}
        <div className="flex items-center">
          <Link to={"/"} className="cursor-pointer">
            <img
              src={logoPrimary}
              alt="logo"
              className="w-12 min-w-[48px] object-contain
            h-auto block float-left mx-3"
            />
          </Link>
          <p
            className={`font-serif text-textPrimary font-extrabold 
            uppercase tracking-[5px] ${isClose && "scale-0"} duration-200`}
          >
            <img src={Logo} alt="logo" className="h-6" />
            <span className="text-heroPrimary block">Dashboard</span>
          </p>
        </div>
      </div>

      {/* Menu section  */}
      <ul className={`pt-2 w-full ${!isClose && "px-4"}`}>
        {SupplierMenus.map((menu, index) => (
          <React.Fragment key={index}>
            <ClientListMenuItem menu={menu} isClose={isClose} />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default SupplierSidebar;
