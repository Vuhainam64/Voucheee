import React from "react";

import { FaChevronRight } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

import { Avatar } from "../../assets/img";
import {
  ChartDashboard,
  StatisticsDashboard,
  CheckVouchers,
} from "./components/SupplierDashboard";

const SupplierDashboard = () => {
  return (
    <div className="w-full h-screen p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <MdOutlineDashboard className="text-xl" />
        <div>Tài Chính</div>
        <FaChevronRight />
        <div>Trang chủ</div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex bg-white p-4 rounded-xl space-x-4">
          <img src={Avatar} alt="logo" className="w-16 h-16 rounded-full" />
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold">GiftPop</div>
              <div className="text-gray-400">Duyệt đơn hàng và tăng cấp độ</div>
            </div>
            <div className="text-2xl font-bold text-primary flex items-center space-x-2">
              <div>Doanh số:</div>
              <div>3.000.000 VND</div>
            </div>
          </div>
        </div>
        <div></div>
        <div className="flex bg-white p-4 rounded-xl space-x-4">
          <div className="space-y-4 w-full">
            <div>
              <div className="flex items-center justify-between w-full">
                <div className="text-2xl font-bold">Thông báo quan trọng</div>
                <div className="flex items-center space-x-2 cursor-pointer text-primary">
                  <div>Xem thêm</div> <FaChevronRight />
                </div>
              </div>
              <div className="text-gray-400 pl-4 py-4">
                Bạn đã được cập nhật! Không có thông báo quan trọng mới cho bạn.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ChartDashboard />
        <StatisticsDashboard />
      </div>
      <CheckVouchers />
    </div>
  );
};

export default SupplierDashboard;
