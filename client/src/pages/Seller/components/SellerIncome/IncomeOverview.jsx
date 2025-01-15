import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { IncomePayment, IncomeStatement } from "./components/IncomeOverview";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IncomeOverview = () => {
  // Sample data for the line chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "",
        data: [12000, 19000, 3000, 5000, 20000, 30000],
        borderColor: "rgba(54, 162, 235, 0.8)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Monthly Income",
      },
    },
    scales: {
      x: {
        ticks: {
          padding: 10,
          autoSkip: true,
          maxTicksLimit: 6,
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 5,
        },
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3 bg-white p-4 rounded-xl">
          <div className="font-semibold text-xl">Tổng quan thu nhập</div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-slate-200 rounded-md p-4">
              <div className="text-md font-semibold">Chờ thanh toán</div>
              <div className="py-8 font-semibold text-2xl text-primary">
                0.00 đ
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div>Đơn hàng chờ xác nhận</div>
                  <div className="text-primary">0.00 đ</div>
                </div>
                <div className="flex justify-between">
                  <div>Hẹn thanh toán ngày mai</div>
                  <div className="text-primary">0.00 đ</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-200 rounded-md p-4 h-[200px] w-full space-y-2">
              <div className="flex justify-between">
                <div className="text-md font-semibold">
                  Chuyển vào Số dư của tôi
                </div>
                <div
                  className="text-primary bg-white p-1 px-2 rounded-md border
                border-primary cursor-pointer"
                >
                  Quản lý số dư tài khoản Vouchee
                </div>
              </div>
              <div className="relative w-full h-full">
                <Line data={data} options={options} width="100%" height="25%" />
              </div>
            </div>
          </div>
        </div>

        {/* Báo cáo thu nhập */}
        <IncomeStatement />
      </div>

      <IncomePayment />
    </div>
  );
};

export default IncomeOverview;
