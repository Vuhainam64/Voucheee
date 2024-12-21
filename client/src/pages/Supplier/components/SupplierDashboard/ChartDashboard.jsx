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

const getWeekData = (data) => {
  const today = new Date();
  const currentWeekDay = today.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  const currentDate = today.getDate();

  const startOfWeek = currentDate - currentWeekDay + 1; // Monday
  const endOfWeek = startOfWeek + 7; // Sunday

  return data.filter((item) => {
    const itemDate = new Date(item.year, item.month - 1, item.day);
    return (
      itemDate.getDate() >= startOfWeek &&
      itemDate.getDate() <= endOfWeek &&
      itemDate.getDay() >= 1 && // Monday
      itemDate.getDay() <= 7 // Sunday
    );
  });
};

const ChartDashboard = ({ dayDashboard }) => {
  const weekData = getWeekData(dayDashboard);

  const chartData = {
    labels: weekData.map((data) => `Ngày ${data.day}`),
    datasets: [
      {
        label: "Lợi nhuận (VND)",
        data: weekData.map((data) => data.totalAmount),
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
        text: "Dòng tiền từ Thứ 2 đến Chủ Nhật tuần này (VND)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Ngày",
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
        <div className="text-gray-400">
          Đến GMT+7 {new Date().toLocaleTimeString()}
        </div>
      </div>
      <div>
        <Bar data={chartData} options={options} height={100} />
      </div>
    </div>
  );
};

export default ChartDashboard;
