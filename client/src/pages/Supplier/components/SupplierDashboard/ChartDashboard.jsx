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

const ChartDashboard = ({ monthData }) => {
  const chartData = {
    labels: monthData.map((data) => `Tháng ${data.month}`),
    datasets: [
      {
        label: "Lợi nhuận (VND)",
        data: monthData.map((data) => data.totalAmount),
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
        <Bar data={chartData} options={options} height={100} />
      </div>
    </div>
  );
};

export default ChartDashboard;
