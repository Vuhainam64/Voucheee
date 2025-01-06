import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { getAllPartnerTransaction } from "../../../../api/admin";
const PartnerTransaction = () => {
  const [data, setdata] = useState([]);
  // Function to format the amount into VND currency
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const fetchData = async () => {
    try {
      const result = await getAllPartnerTransaction();
      setdata(result.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
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

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id" // Key for each row, should be unique
      pagination={{ pageSize: 5 }} // Pagination
      bordered={false} // Turn off default border styles
      style={{ width: "100%" }} // Custom styles to fill the container
    />
  );
};

export default PartnerTransaction;
