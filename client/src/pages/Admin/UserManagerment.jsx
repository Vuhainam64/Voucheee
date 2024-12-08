import React from "react";
import { Button, Input, Select, Table, Tag } from "antd";
import { FaUserPlus } from "react-icons/fa6";
import { getAllUser } from "../../api/admin";
import { useEffect, useState } from "react";

const { Search } = Input;

const UserManagerment = () => {
  const [users, setUsers] = useState([]); // State for users
  const [loading, setLoading] = useState(false); // Loading state for data fetching
  const [searchText, setSearchText] = useState(""); // For search input
  const [filterRole, setFilterRole] = useState("all"); // For filtering roles

  useEffect(() => {
    const fetchAllUser = async () => {
      setLoading(true);
      try {
        const data = await getAllUser(); // Assume this function fetches the user data
        setUsers(data?.results || []); // Set user data
      } catch (error) {
        console.log("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllUser();
  }, []);

  const handleChange = (value) => {
    setFilterRole(value); // Update the selected filter role
  };

  const onSearch = (value) => {
    setSearchText(value); // Update search text
  };

  const filteredUsers = users.filter((user) => {
    const isRoleMatch =
      filterRole === "all" ||
      user.role.toLowerCase() === filterRole.toLowerCase();
    const isSearchMatch =
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.name.toLowerCase().includes(searchText.toLowerCase());

    return isRoleMatch && isSearchMatch;
  });

  // Columns for the table
  const columns = [
    {
      title: "Name",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // render: (status) => (
      //   <Tag color={status === "active" ? "green" : "volcano"}>
      //     {status.toUpperCase()}
      //   </Tag>
      // ),
    },
    {
      title: "Permission",
      dataIndex: "role",
      key: "role",
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
              value={filterRole}
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                { value: "all", label: "All" },
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
                { value: "staff", label: "Staff" },
              ]}
            />
            <Search
              placeholder="Search users"
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
        <Table
          dataSource={filteredUsers}
          columns={columns}
          loading={loading}
          rowKey={(record) => record._id} // Make sure your data has a unique id field
        />
      </div>
    </div>
  );
};

export default UserManagerment;
