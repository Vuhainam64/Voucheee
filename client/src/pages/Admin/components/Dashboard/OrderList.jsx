import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import { getAllOrder } from "../../../../api/admin";
import { useNavigate } from "react-router-dom";

const OrdersList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Function to format the amount into VND currency
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleOrderClick = (orderId) => {
    navigate(`/admin/order/${orderId}`);
  };

  const fetchData = async () => {
    try {
      const result = await getAllOrder();
      setOrders(result.results || []); // Ensure that the result has a 'results' key
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false); // Turn off loading after data is fetched
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Define table columns
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <a onClick={() => handleOrderClick(text)}>{text}</a> // Clickable Order ID
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => formatAmount(text), // Format price as currency
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
      render: (text) => new Date(text).toLocaleString(), // Format date
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
  ];

  // Fallback loading state
  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      />
    );
  }

  // Fallback UI for empty data
  if (orders.length === 0) {
    return <div>No orders available</div>;
  }

  return (
    <Table
      columns={columns}
      dataSource={orders}
      rowKey="id" // Key for each row, should be unique
      pagination={{ pageSize: 5 }} // Pagination
      bordered={false} // Turn off default border styles
      style={{ width: "100%" }} // Custom styles to fill the container
    />
  );
};

export default OrdersList;
