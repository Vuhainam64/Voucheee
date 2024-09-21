import React from "react";
import { Tabs } from "antd";

import { FaChevronRight } from "react-icons/fa";
import { LuBarChartHorizontal } from "react-icons/lu";

import {
  AllOrder,
  CancelOrder,
  DeliveredOrder,
  PackagingOrder,
  PaidingOrder,
  RefundOrder,
} from "./components/SellerOrder";

const tabs = [
  {
    key: "1",
    label: <div className="text-xl">Tất cả</div>,
    children: <AllOrder />,
  },
  {
    key: "2",
    label: <div className="text-xl">Chưa thanh toán</div>,
    children: <PaidingOrder />,
  },
  {
    key: "3",
    label: <div className="text-xl">Chờ xử lý & bàn giao</div>,
    children: <PackagingOrder />,
  },
  {
    key: "4",
    label: <div className="text-xl">Đã giao hàng</div>,
    children: <DeliveredOrder />,
  },
  {
    key: "5",
    label: <div className="text-xl">Huỷ đơn hàng</div>,
    children: <CancelOrder />,
  },
  {
    key: "6",
    label: <div className="text-xl">Hoàn hàng hoặc Hoàn tiền</div>,
    children: <RefundOrder />,
  },
];

const SellerOrder = () => {
  return (
    <div className="w-full h-full p-8 flex flex-col">
      <div className="flex items-center space-x-2">
        <LuBarChartHorizontal className="text-xl" />
        <div>Đơn Hàng</div>
        <FaChevronRight />
        <div className="font-bold">Quản Lý Đơn Hàng</div>
      </div>

      <div className="text-xl font-semibold py-4">Quản lý đơn hàng</div>
      <Tabs defaultActiveKey="1" items={tabs} className="pt-4" />
    </div>
  );
};

export default SellerOrder;
