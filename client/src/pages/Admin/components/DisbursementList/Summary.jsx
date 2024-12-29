import React, { useEffect, useState } from "react";

import { getChartTransaction } from "../../../../api/withdraw";

const Summary = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPeople, setTotalPeople] = useState(0);
  const [lastUpdate, setLastUpdate] = useState("");

  // Lấy dữ liệu từ API
  const loadSummaryData = async () => {
    try {
      const data = await getChartTransaction(); // Lấy dữ liệu từ API
      setTotalAmount(data.sumAmount); // Cập nhật tổng số tiền
      setTotalPeople(data.countItem); // Cập nhật số lượng giải ngân
      setLastUpdate(new Date(data.newestItem).toLocaleDateString("vi-VN")); // Cập nhật ngày cập nhật
    } catch (err) {
      console.error("Error loading summary data:", err);
    }
  };

  // Gọi loadSummaryData khi component được mount
  useEffect(() => {
    loadSummaryData();
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 space-y-2">
      <div className="text-gray-600">Số lượng giải ngân</div>
      <div className="text-xl font-bold">{totalPeople}</div>
      <div className="text-gray-600">Tổng tiền</div>
      <div className="text-xl font-bold">{totalAmount.toLocaleString()} đ</div>
      <div className="text-gray-600">Cập nhật tới</div>
      <div className="text-xl font-bold">{lastUpdate}</div>
    </div>
  );
};

export default Summary;
