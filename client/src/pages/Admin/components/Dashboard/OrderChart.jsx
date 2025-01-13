import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getAllOrder } from "../../../../api/admin";
import { Button } from "antd"; // Import Button only
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrdersChart = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("PAID"); // Default status is "PAID"

  // Function to fetch data
  const fetchData = async () => {
    try {
      const result = await getAllOrder();
      setOrders(result.results); // Assuming result contains your orders data
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle status change
  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus); // Update the status based on user selection
  };

  // Process orders to get count of selected status orders per day in the last week
  const getOrdersPerDay = () => {
    const today = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const ordersCount = daysOfWeek.reduce((acc, day, index) => {
      const targetDate = new Date();
      targetDate.setDate(today.getDate() - index); // Get the date for the specific day in the past week
      const targetDay = targetDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      acc[targetDay] = 0;

      // Loop through orders and count selected status ones for each specific day
      orders.forEach((order) => {
        if (order.status === status) {
          const orderDate = new Date(order.createDate);
          const orderDay = orderDate.toLocaleDateString("en-US", {
            weekday: "long",
          });

          if (orderDay === targetDay) {
            acc[targetDay] += 1;
          }
        }
      });

      return acc;
    }, {});

    // Return the data in the correct format, ensuring integer count for each day
    return daysOfWeek.map((day) => ({
      day,
      orders: ordersCount[day] || 0, // Ensure the count is an integer
    }));
  };

  const data = getOrdersPerDay();

  // Data for the chart
  const chartData = {
    labels: data.map((item) => item.day), // Labels for the x-axis (days of the week)
    datasets: [
      {
        label: `${status} Orders`,
        data: data.map((item) => item.orders), // Data for the y-axis (number of orders)
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Background color for the line
        fill: true, // Whether to fill the area under the line
        tension: 0.4, // Smoothing of the line
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${status} Orders in the Last Week`,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: 300 }}>
      {/* Status buttons to toggle between PAID and PENDING */}
      <Button.Group style={{ marginBottom: "20px" }}>
        <Button
          onClick={() => handleStatusChange("PAID")}
          type={status === "PAID" ? "primary" : "default"}
        >
          PAID
        </Button>
        <Button
          onClick={() => handleStatusChange("PENDING")}
          type={status === "PENDING" ? "primary" : "default"}
        >
          PENDING
        </Button>
      </Button.Group>

      {/* Line chart */}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default OrdersChart;
