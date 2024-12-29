import React, { useEffect, useState } from "react";
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

import { getChartTransaction } from "../../../../api/withdraw";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const DisbursementChart = () => {
  const [chartData, setChartData] = useState({
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
        label: "Giải ngân mỗi tháng",
        data: Array(12).fill(0), // Khởi tạo với giá trị 0 cho mỗi tháng
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });

  console.log(chartData);

  // Lấy dữ liệu từ API và cập nhật biểu đồ
  const loadChartData = async () => {
    try {
      const data = await getChartTransaction();
      const formattedData = data.allMonths.map((item) => item.totalAmount);

      setChartData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: formattedData, // Cập nhật dữ liệu mới vào chart
          },
        ],
      }));
    } catch (err) {
      console.error("Error loading chart data:", err);
    }
  };

  // Gọi loadChartData khi component được mount
  useEffect(() => {
    loadChartData();
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 col-span-2">
      <Bar data={chartData} height={80} />
    </div>
  );
};

export default DisbursementChart;
