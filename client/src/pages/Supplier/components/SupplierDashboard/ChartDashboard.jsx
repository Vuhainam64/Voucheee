import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

import { FaChevronRight } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const data = {
  labels: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  datasets: [
    {
      label: "Lợi nhuận",
      data: [
        12000, 19000, 3000, 5000, 20000, 15000, 18000, 22000, 24000, 10000,
        30000, 25000,
      ],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Dòng tiền hàng tháng (VND)",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Tháng",
      },
    },
    y: {
      title: {
        display: true,
        text: "Số tiền (VND)",
      },
      ticks: {
        beginAtZero: true,
      },
    },
  },
};

const ChartDashboard = () => {
  return (
    <div className="bg-white p-4 rounded-xl space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Phân tích nâng cao</div>
        <div className="flex items-center space-x-2 cursor-pointer text-primary">
          <div>Xem thêm</div> <FaChevronRight />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div>Thời gian thực</div>
        <div className="text-gray-400">Đến GMT+7 10:14:37</div>
      </div>
      <div>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartDashboard;
