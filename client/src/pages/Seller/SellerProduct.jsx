import React from "react";
import { motion } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

import { AiFillAccountBook } from "react-icons/ai";
import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa6";

import { buttonClick } from "../../animations";

const SellerProduct = () => {
  return (
    <div className="w-full h-full p-8 flex flex-col">
      <div className="flex items-center space-x-2">
        <AiFillAccountBook className="text-xl" />
        <div>Sản Phẩm</div>
        <FaChevronRight />
        <div className="font-bold">Quản Lý Sản Phẩm</div>
      </div>

      {/* code ở đây  */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl">Quản Lý Sản Phẩm</div>
          <div className="flex items-center space-x-4 py-2">
            <div
              className="flex items-center space-x-2 border-primary text-primary 
          bg-white p-2 px-4 rounded-md cursor-pointer"
            >
              <div>Quản lí số lượng lớn</div>
              <FaChevronDown />
            </div>
            <motion.div
              {...buttonClick}
              className="flex items-center space-x-2 bg-primary text-white rounded-md 
          p-2 px-4 cursor-pointer"
            >
              <FaPlus />
              <div>Thêm sản phẩm</div>
            </motion.div>
          </div>
        </div>

        <div className="w-full flex bg-white rounded-xl px-4 justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="">Tổng quan sản phẩm</div>
            <div className="w-225">
              <ProgressBar completed={(31 / 100) * 100} bgColor={"#33acc7"} />
            </div>
            <div>31/100</div>
          </div>
          <div className="space-x-2 flex items-center text-primary">
            <div>Chi tiết</div>
            <FaChevronDown />
          </div>
        </div>

        <div>
          <div className="py-4">
            <div className="flex flex-wrap -mb-px text-xl font-medium text-center">
              <NavLink
                to={"/seller/productList/allProduct"}
                className={({ isActive }) =>
                  isActive
                    ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-primary text-primary hover:text-heroSecondary"
                    : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                }
              >
                Tất cả
              </NavLink>
              <NavLink
                to={"/seller/productList/activeProduct"}
                className={({ isActive }) =>
                  isActive
                    ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-primary text-primary hover:text-heroSecondary"
                    : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                }
              >
                Đang hoạt động
              </NavLink>
              <NavLink
                to={"/seller/productList/InactiveProduct"}
                className={({ isActive }) =>
                  isActive
                    ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-primary text-primary hover:text-heroSecondary"
                    : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                }
              >
                Không hoạt động
              </NavLink>
              <NavLink
                to={"/seller/productList/pendingProduct"}
                className={({ isActive }) =>
                  isActive
                    ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-primary text-primary hover:text-heroSecondary"
                    : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                }
              >
                Chờ duyệt
              </NavLink>
              <NavLink
                to={"/seller/productList/violateProduct"}
                className={({ isActive }) =>
                  isActive
                    ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-primary text-primary hover:text-heroSecondary"
                    : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                }
              >
                Vi phạm
              </NavLink>
              <NavLink
                to={"/seller/productList/deletedProduct"}
                className={({ isActive }) =>
                  isActive
                    ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-primary text-primary hover:text-heroSecondary"
                    : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                }
              >
                Đã xoá
              </NavLink>
            </div>

            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProduct;
