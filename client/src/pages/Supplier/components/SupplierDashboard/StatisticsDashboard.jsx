import React from "react";
import { Tooltip } from "antd";

import { FaChevronRight } from "react-icons/fa";
import { FaRegCircleQuestion } from "react-icons/fa6";

const StatisticsDashboard = ({ statisticsData }) => {
  return (
    <div className="bg-white p-4 rounded-xl space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold">Thống kê tháng này</div>
          <Tooltip title="Số liệu thống kê từ ngày 1-10-2024 đến ngày 30-10-2024">
            <FaRegCircleQuestion />
          </Tooltip>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer text-primary">
          <div>Xem thêm</div> <FaChevronRight />
        </div>
      </div>
      <div className="space-y-2 text-center">
        <div>Tổng Voucher</div>
        <div className="font-bold text-xl text-primary">
          {statisticsData.totalVouchers}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2 text-center">
          <div>Số voucher đã duyệt</div>
          <div className="font-bold text-xl text-primary">
            {statisticsData.approvedVouchers}
          </div>
        </div>
        <div className="space-y-2 text-center">
          <div>Đang chờ xử lý</div>
          <div className="font-bold text-xl text-primary">
            {statisticsData.pendingVouchers}
          </div>
        </div>
        <div className="space-y-2 text-center">
          <div>Đang chuyển đổi</div>
          <div className="font-bold text-xl text-primary">
            {statisticsData.convertingVouchers}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 text-center">
          <div>Chuyển đổi thành công</div>
          <div className="font-bold text-xl text-primary">
            {statisticsData.convertedVouchers}
          </div>
        </div>
        <div className="space-y-2 text-center">
          <div>Voucher đã sử dụng/ hết hạn/ không tồn tại</div>
          <div className="font-bold text-xl text-primary">
            {statisticsData.usedorexpireVouchers}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
