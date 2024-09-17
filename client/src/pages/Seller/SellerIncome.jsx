import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import { FaChevronRight } from "react-icons/fa";
import { PiCoinThin } from "react-icons/pi";

const SellerIncome = () => {
  return (
    <div className="w-full h-full p-8 flex flex-col">
      <div className="flex items-center space-x-2">
        <PiCoinThin className="text-xl" />
        <div>Tài Chính</div>
        <FaChevronRight />
        <div className="font-bold">Thu Nhập Của Tôi</div>
      </div>

      <div className="flex flex-col py-2">
        <div className="font-bold text-xl">Thu nhập của tôi</div>
        <div>
          <div className="py-4">
            <div className="flex flex-wrap -mb-px text-xl font-medium text-center">
              <NavLink
                to={"/seller/myIncome/incomeOverview"}
                className={({ isActive }) =>
                  isActive
                    ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-primary text-primary hover:text-heroSecondary"
                    : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                }
              >
                Tổng quan Thu nhập
              </NavLink>
              <NavLink
                to={"/seller/myIncome/incomeStatement"}
                className={({ isActive }) =>
                  isActive
                    ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-primary text-primary hover:text-heroSecondary"
                    : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                }
              >
                Sao kê Thu nhập
              </NavLink>
              <NavLink
                to={"/seller/myIncome/incomeDetails"}
                className={({ isActive }) =>
                  isActive
                    ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-primary text-primary hover:text-heroSecondary"
                    : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                }
              >
                Chi tiết Thu nhập
              </NavLink>
              <NavLink
                to={"/seller/myIncome/incomeInvoice"}
                className={({ isActive }) =>
                  isActive
                    ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-primary text-primary hover:text-heroSecondary"
                    : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                }
              >
                Hoá đơn
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default SellerIncome;
