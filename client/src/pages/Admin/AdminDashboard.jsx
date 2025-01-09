import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Typography, message, Tabs } from "antd";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import {
  getOrderDashboard,
  getWalletTransactionDashboard,
  getTransactionDashboard,
} from "../../api/admin";
import OrdersList from "./components/Dashboard/OrderList";
import PaidOrdersChart from "./components/Dashboard/OrderChart";
import IncomeChart from "./components/Dashboard/IncomeChart";
import RefundList from "./components/Dashboard/RefundList";
import TopUpList from "./components/Dashboard/TopUpTransaction";
import TabPane from "antd/es/tabs/TabPane";
import WithdrawList from "./components/Dashboard/WithdrawTransaction";
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

// Dummy Data for demonstration

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(false);

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

  useEffect(() => {
    fetchOrder(); // Fetch all users
  }, []);
  // Chart Data

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={2}>Thống kê hệ thống</Typography.Title>

      {/* Sales Trend and Orders Trend */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Doanh thu">
            <IncomeChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Orders Trend">
            <PaidOrdersChart />
          </Card>
        </Col>
      </Row>

      {/* Product Insights */}
      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={12}>
          <Card title="Danh sách order" bordered={false}>
            <OrdersList />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Yêu cầu hoàn tiền" bordered={false}>
            <RefundList />
          </Card>
        </Col>
      </Row>

      {/* Customer Insights */}
      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card title="Thống kê nạp - rút tiền">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Nạp tiền" key="1">
                <TopUpList />
              </TabPane>
              <TabPane tab="Rút tiền" key="2">
                <WithdrawList />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>

      {/* Sales and Order Value Comparison */}
    </div>
  );
};

export default AdminDashboard;
