import React from "react";
import { Alert, Progress, Tabs } from "antd";

import { FaChevronRight } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { LuBarChartHorizontal } from "react-icons/lu";

import { DetailReview } from "./components/SellerReview";

const tabs = [
  {
    key: "1",
    label: <div className="text-xl">Chi tiết đánh giá</div>,
    children: <DetailReview />,
  },
  // {
  //   key: "2",
  //   label: <div className="text-xl">Chờ được đánh giá</div>,
  //   children: <PendingReview />,
  // },
];

const SellerReview = () => {
  return (
    <div className="w-full h-full p-8 flex flex-col">
      <div className="flex items-center space-x-2">
        <LuBarChartHorizontal className="text-xl" />
        <div>Đơn Hàng</div>
        <FaChevronRight />
        <div className="font-bold">Quản Lý Đánh Giá</div>
      </div>
      <div className="py-4">
        <Alert
          message={
            <div className="p-1">
              Bạn có{" "}
              <span className="text-blue-500">
                1 sản phẩm cần được cải thiện.
              </span>
            </div>
          }
          type="warning"
          showIcon
        />
      </div>
      {/* <div className="bg-white p-4 rounded-lg">
        <div className="font-bold text-xl">Tổng quan</div>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg mt-4 space-y-4">
            <div className="font-bold">Chờ được đánh giá</div>
            <div className="flex items-center space-x-2">
              <FaRegCircleCheck className="text-green-500 text-xl" />
              <div>Xuất sắc, tất cả đơn hàng đã được đánh giá</div>
            </div>
            <div>Đánh giá mới: 0</div>
            <div>Hết hạn hôm nay: 0</div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg mt-4 space-y-4">
            <div className="font-bold">Chờ phản hồi</div>
            <div className="flex items-center space-x-2">
              <FaRegCircleCheck className="text-green-500 text-xl" />
              <div>Xuất sắc, tất cả đánh giá đã được phản hồi</div>
            </div>
            <div>Phản hồi mới: 0</div>
            <div>Hết hạn hôm nay: 0</div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg mt-4 space-y-4">
            <div className="font-bold">Sản phẩm đã có đánh giá</div>
            <div className="text-3xl font-bold text-primary">12.7%</div>
            <div>
              <div>
                Mục tiêu <span className="font-bold">92.0%</span>
              </div>
              <Progress percent={12.7} showInfo={false} status="exception" />
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg mt-4 space-y-4">
            <div className="font-bold">Đánh giá nhà bán hàng tích cực</div>
            <div className="text-3xl font-bold text-primary">100.0%</div>
            <div>
              <div>
                Mục tiêu <span className="font-bold">92.0%</span>
              </div>
              <Progress percent={12.7} showInfo={false} />
            </div>
          </div>
        </div>
      </div> */}
      <Tabs defaultActiveKey="1" items={tabs} className="pt-4" />
    </div>
  );
};

export default SellerReview;
