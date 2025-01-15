import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

import { AiFillAccountBook } from "react-icons/ai";
import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa6";

import { AllProduct, DiscountCodeModal } from "./components/SellerProduct";

const SellerProduct = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalVoucher, setTotalVoucher] = useState(0);

  return (
    <div className="w-full h-full p-8 flex flex-col">
      <div className="flex items-center space-x-2">
        <AiFillAccountBook className="text-xl" />
        <div>Sản Phẩm</div>
        <FaChevronRight />
        <div className="font-bold">Quản Lý Sản Phẩm</div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl">Quản Lý Sản Phẩm</div>
          <div className="flex items-center space-x-4 py-2">
            <div
              className="flex items-center space-x-2 border-primary text-primary 
              bg-white p-2 px-4 rounded-md cursor-pointer"
              onClick={() => setIsModalVisible(true)}
            >
              <div>Quản lý mã giảm giá</div>
            </div>
            <Link
              to={"/seller/publish"}
              className="flex items-center space-x-2 bg-primary text-white rounded-md 
              p-2 px-4 cursor-pointer hover:no-underline hover:text-gray-200"
            >
              <FaPlus />
              <div>Thêm sản phẩm</div>
            </Link>
          </div>
        </div>

        <div className="w-full flex bg-white rounded-xl px-4 justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="">Tổng quan sản phẩm</div>
            <div className="w-225">
              <ProgressBar
                completed={(totalVoucher / 100) * 100}
                bgColor={"#33acc7"}
              />
            </div>
            <div>{totalVoucher}/100</div>
          </div>
          <div className="space-x-2 flex items-center text-primary">
            <div>Chi tiết</div>
            <FaChevronDown />
          </div>
        </div>

        <AllProduct setTotalVoucher={setTotalVoucher} />
      </div>

      {/* Modal quản lý mã giảm giá */}
      <DiscountCodeModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default SellerProduct;
