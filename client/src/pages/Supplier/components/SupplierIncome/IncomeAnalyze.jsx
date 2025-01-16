import React from "react";
import { Link } from "react-router-dom";
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

// import IncomeStatement from "./IncomeStatement";

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

const IncomeAnalyze = ({ filteredTransactions }) => {
  // Tổng hợp dữ liệu từ filteredTransactions
  const totalPendingPayment = filteredTransactions.reduce(
    (sum, transaction) =>
      sum + parseFloat(transaction.estimatedPayment.replace(/\D/g, "")),
    0
  );

  // Danh sách 12 cố định
  const months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  // Ghép dữ liệu giao dịch với danh sách 12 tháng
  const chartData = filteredTransactions.reduce((acc, transaction) => {
    const date = new Date(transaction.creationDate);
    const monthIndex = date.getMonth(); // Lấy chỉ số (0-11)
    acc[monthIndex] =
      (acc[monthIndex] || 0) +
      parseFloat(transaction.estimatedPayment.replace(/\D/g, ""));
    return acc;
  }, Array(12).fill(0)); // Khởi tạo 12 với giá trị 0

  // Chuẩn bị dữ liệu biểu đồ
  const data = {
    labels: months,
    datasets: [
      {
        label: "Thu nhập hàng tháng",
        data: chartData,
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
        text: "Thu nhập hàng tháng",
      },
    },
    scales: {
      x: {
        ticks: {
          padding: 10,
          autoSkip: false,
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
    <div className="col-span-4 bg-white p-4 rounded-xl">
      <div className="font-semibold text-xl">Tổng quan thu nhập</div>
      <div className="grid grid-cols-2 gap-4 pt-4">
        <div className="bg-slate-200 rounded-md p-4">
          <div className="text-md font-semibold">Tổng thanh toán</div>
          <div className="py-8 font-semibold text-2xl text-primary">
            {totalPendingPayment.toLocaleString("vi-VN")} đ
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
            <Link
              to={"/supplier/myTransaction"}
              className="text-primary bg-white p-1 px-2 rounded-md border
          border-primary cursor-pointer hover:no-underline hover:text-primary"
            >
              Quản lý số dư tài khoản Vouchee
            </Link>
          </div>
          <div className="relative w-full h-full">
            <Line data={data} options={options} width="100%" height="25%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeAnalyze;
