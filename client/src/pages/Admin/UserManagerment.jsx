import React from "react";
import { Button, Input, Select, Table, Tag } from "antd";
import { FaUserPlus } from "react-icons/fa6";

const { Search } = Input;

const UserManagerment = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  // Dummy data for the table
  const dataSource = [
    {
      key: "1",
      name: "John Doe",
      status: "active",
      permission: "Admin",
      dateAdded: "2024-09-25",
    },
    {
      key: "2",
      name: "Jane Smith",
      status: "inactive",
      permission: "User",
      dateAdded: "2024-08-15",
    },
  ];

  // Columns for the table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
    },
    {
      title: "Date Added",
      dataIndex: "dateAdded",
      key: "dateAdded",
    },
    {
      title: "Operation",
      key: "operation",
      render: (_, record) => (
        <Button type="link" onClick={() => console.log("Edit", record.name)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-md space-y-4">
        <div className="text-2xl font-semibold">Quản lý người dùng</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select
              defaultValue="Tất cả"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "all",
                  label: "Tất cả",
                },
                {
                  value: "staff",
                  label: "Staff",
                },
                {
                  value: "admin",
                  label: "Admin",
                },
                {
                  value: "user",
                  label: "User",
                },
              ]}
            />
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </div>
          <Button type="primary" size="large" icon={<FaUserPlus />}>
            Thêm mới
          </Button>
        </div>
      </div>
      <div
        className="bg-white p-4 rounded-md h-screen"
        style={{ maxHeight: "calc(100vh - 275px)" }}
      >
        {/* Table displaying user data */}
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};

export default UserManagerment;
