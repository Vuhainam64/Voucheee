import React, { useState, useEffect } from "react";
import { Table, Tag, message, Select, Button } from "antd";
import { getAllWithdraw } from "../../../../api/admin";
import moment from "moment";

const WithdrawList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchData = async () => {
    try {
      const result = await getAllWithdraw();
      setData(result.results);
      setFilteredData(result.results); // Initialize filtered data with the result
    } catch (error) {
      console.error("Error fetching data: ", error);
      message.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle filtering
  const handleSearch = () => {
    let filtered = [...data];

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    setFilteredData(filtered);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  // Columns for the withdraw wallet transaction table
  const withdrawColumns = [
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
    },
    {
      title: "Bank Account",
      dataIndex: "bankAccount",
      key: "bankAccount",
    },
    {
      title: "Before Balance",
      dataIndex: "beforeBalance",
      key: "beforeBalance",
      render: (text) => text.toLocaleString("vi-VN"),
    },
    {
      title: "After Balance",
      dataIndex: "afterBalance",
      key: "afterBalance",
      render: (text) => text.toLocaleString("vi-VN"),
    },
    {
      title: "Amount Withdrawn",
      dataIndex: "amount",
      key: "amount",
      render: (text) => text.toLocaleString("vi-VN"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={text === "PENDING" ? "orange" : "green"}>{text}</Tag>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
      render: (text) => moment(text).format("DD/MM/YYYY, h:mm:ss A"),
    },
  ];

  // Columns for the main transaction table
  const mainColumns = [
    {
      title: "Transaction ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={text === "PAID" ? "green" : "red"}>{text}</Tag>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
      render: (text) => moment(text).format("DD/MM/YYYY, h:mm:ss A"),
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => text.toLocaleString("vi-VN"),
    },
    {
      title: "Wallet Type",
      dataIndex: "walletType",
      key: "walletType",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* Filter controls */}
      <div style={{ marginBottom: "16px" }}>
        <Select
          value={statusFilter}
          onChange={handleStatusChange}
          style={{ width: 200 }}
          placeholder="Filter by Status"
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="PAID">PAID</Select.Option>
          <Select.Option value="PENDING">PENDING</Select.Option>
        </Select>
        <Button
          type="primary"
          style={{ marginLeft: "10px" }}
          onClick={handleSearch}
        >
          Apply Filter
        </Button>
      </div>

      {/* Main transaction table */}
      <Table
        columns={mainColumns}
        dataSource={filteredData} // Use filteredData instead of data
        pagination={{ pageSize: 5 }}
        rowKey="id"
        style={{ marginBottom: "20px" }}
      />

      {/* Withdraw wallet transaction table */}
      {/* <Table
        columns={withdrawColumns}
        dataSource={filteredData.flatMap((item) =>
          item.withdrawWalletTransaction ? [item.withdrawWalletTransaction] : []
        )} // Flatten withdraw wallet transactions
        pagination={{ pageSize: 5 }}
        rowKey="id"
      /> */}
    </div>
  );
};

export default WithdrawList;
