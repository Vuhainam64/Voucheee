import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Select, message } from "antd";
import { getAllTopup } from "../../../../api/admin";
import moment from "moment";

const TopUpList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchData = async () => {
    try {
      const result = await getAllTopup();
      setData(result.results);
      setFilteredData(result.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
      message.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to format the amount into VND currency
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Handle filtering
  const handleSearch = () => {
    let filtered = [...data];

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // Filter by date range (using only dd/mm/yyyy for filtering)

    setFilteredData(filtered);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  // Columns for the Ant Design table
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <Button type="link">{text}</Button>, // Make ID clickable
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
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Expire Time",
      dataIndex: "exprireTime",
      key: "exprireTime",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => formatAmount(text),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Select
        placeholder="Select Status"
        value={statusFilter}
        onChange={handleStatusChange}
        style={{ marginBottom: "10px", width: "200px" }}
      >
        <Select.Option value="">All</Select.Option>
        <Select.Option value="PAID">PAID</Select.Option>
        <Select.Option value="PENDING">PENDING</Select.Option>
      </Select>

      <Button
        onClick={handleSearch}
        type="primary"
        style={{ marginLeft: "10px" }}
      >
        Filter
      </Button>

      <Table
        columns={columns}
        dataSource={filteredData} // Display filtered data
        rowKey="id" // Key for each row, should be unique
        pagination={{ pageSize: 5 }} // Pagination
        bordered={false} // Turn off default border styles
        style={{ width: "100%" }} // Custom styles to fill the container
      />
    </div>
  );
};

export default TopUpList;
