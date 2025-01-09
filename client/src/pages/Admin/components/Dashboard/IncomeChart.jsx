import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format, startOfWeek, getDay } from "date-fns";
import { getAllPartnerTransaction } from "../../../../api/admin";

// Register required chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionChart = () => {
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    // Simulating an API call
    const fetchData = async () => {
      const json = await getAllPartnerTransaction();
      setTransactionData(json.results); // Assuming results is the array of transactions
    };

    fetchData();
  }, []);

  if (!transactionData) {
    return <div>Loading...</div>;
  }

  // Function to group transactions by day of the week
  const groupByDayOfWeek = (transactions) => {
    // Initialize an array for each day of the week (Sunday - Saturday)
    const daysOfWeek = [0, 1, 2, 3, 4, 5, 6]; // 0 = Sunday, 6 = Saturday
    const result = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.transactionDate);
      const dayOfWeek = getDay(transactionDate); // Get the day of the week (0 = Sunday, 6 = Saturday)

      // Accumulate the amount for the respective day of the week
      result[Object.keys(result)[dayOfWeek]] += transaction.amountIn;
    });

    return result;
  };

  // Group the transactions by day of the week
  const groupedData = groupByDayOfWeek(transactionData);

  // Extract the labels and amounts for the chart
  const labels = Object.keys(groupedData);
  const amounts = Object.values(groupedData);

  // Chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Amount In (Per Day of Week)",
        data: amounts,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Transaction Amount by Day of the Week</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default TransactionChart;
