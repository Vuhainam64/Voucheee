import React from "react";
import { Tabs } from "antd";
import { motion } from "framer-motion";
import ProgressBar from "@ramonak/react-progress-bar";

import { AiFillAccountBook } from "react-icons/ai";
import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa6";

import { buttonClick } from "../../animations";
import {
  ActiveProduct,
  AllProduct,
  DeleteProduct,
  InactiveProduct,
  PendingProduct,
  ViolateProduct,
} from "./components/SellerProduct";

const SellerProduct = () => {
  const items = [
    {
      key: "1",
      label: <div className="text-xl">Tất cả</div>,
      children: <AllProduct />,
    },
    {
      key: "2",
      label: <div className="text-xl">Đang hoạt động</div>,
      children: <ActiveProduct />,
    },
    {
      key: "3",
      label: <div className="text-xl">Không hoạt động</div>,
      children: <InactiveProduct />,
    },
    {
      key: "4",
      label: <div className="text-xl">Chờ duyệt</div>,
      children: <PendingProduct />,
    },
    {
      key: "5",
      label: <div className="text-xl">Vi phạm</div>,
      children: <ViolateProduct />,
    },
    {
      key: "6",
      label: <div className="text-xl">Đã xoá</div>,
      children: <DeleteProduct />,
    },
  ];

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

        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default SellerProduct;
