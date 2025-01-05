import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Typography, message, Text } from "antd";
import { Line } from "react-chartjs-2";
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
import {
  getOrderDashboard,
  getWalletTransactionDashboard,
  getTransactionDashboard,
} from "../../api/admin";
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

// Dummy Data for demonstration
const salesData = [200, 450, 300, 500, 700, 850, 1000];
// const ordersData = [20, 35, 25, 50, 60, 75, 100];
const trafficData = [150, 300, 250, 450, 500, 600, 750];
const customerData = [5, 10, 8, 15, 20, 25, 30];

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(false);
  const [transactionData, setTransactionData] = useState(false);
  const [dashboardTransaction, setDashboardTransaction] = useState(false);
  const fetchOrder = async () => {
    setLoading(true);
    try {
      const data = await getOrderDashboard();
      setOrderData(data?.results || []); // Update the users state
    } catch (error) {
      message.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };
  const fetchWalletTransaction = async () => {
    setLoading(true);
    try {
      const data = await getWalletTransactionDashboard();
      setTransactionData(data?.results || []); // Update the users state
    } catch (error) {
      message.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };
  const fetchDashboardTransaction = async () => {
    setLoading(true);
    try {
      const data = await getWalletTransactionDashboard();
      setDashboardTransaction(data?.results || []); // Update the users state
    } catch (error) {
      message.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrder(); // Fetch all users
    fetchWalletTransaction();
    fetchDashboardTransaction();
  }, []);
  // Chart Data
  const salesChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Sales ($)",

        data: salesData,
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const ordersChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Orders",
        data: orderData,
        borderColor: "rgba(153, 102, 255, 1)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={2}>Statistics AdminDashboard</Typography.Title>

      {/* Top-Level Overview */}
      <Row gutter={16} style={{ marginBottom: "24px" }}>
        <Col span={6}>
          <Card>
            {/* {dashboardTransaction.map((trans) => (
              <Statistic
                title="Total Sales"
                value={dashboardTransaction.totalBalance}
                prefix="$"
              />
            ))} */}
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Orders" value={350} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Active Users" value={200} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="New Customers" value={50} />
          </Card>
        </Col>
      </Row>

      {/* Sales Trend and Orders Trend */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Sales Trend">
            <Line data={salesChartData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Orders Trend">
            <Line data={ordersChartData} />
          </Card>
        </Col>
      </Row>

      {/* Product Insights */}
      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={12}>
          <Card title="Top Products" bordered={false}>
            {/* This could be a dynamic list of products */}
            <ul>
              <li>Product 1: $1500</li>
              <li>Product 2: $1200</li>
              <li>Product 3: $900</li>
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Inventory Overview" bordered={false}>
            {/* Low stock or out of stock items */}
            <ul>
              <li>Product A: Low Stock</li>
              <li>Product B: Out of Stock</li>
            </ul>
          </Card>
        </Col>
      </Row>

      {/* Customer Insights */}
      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={12}>
          <Card title="Customer Feedback">
            <ul>
              <li>Average Rating: 4.5/5</li>
              <li>Positive Reviews: 90%</li>
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Active Users">
            <ul>
              <li>Active Users This Week: 200</li>
              <li>Returning Users: 150</li>
            </ul>
          </Card>
        </Col>
      </Row>

      {/* Sales and Order Value Comparison */}
      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={12}>
          <Card title="Daily Sales">
            <Line
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                  {
                    label: "Daily Sales",
                    data: salesData,
                    borderColor: "rgba(75, 192, 192, 1)",
                    fill: false,
                    tension: 0.1,
                  },
                ],
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Order Value">
            <Line
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                  {
                    label: "Average Order Value ($)",
                    data: customerData,
                    borderColor: "rgba(153, 102, 255, 1)",
                    fill: false,
                    tension: 0.1,
                  },
                ],
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
