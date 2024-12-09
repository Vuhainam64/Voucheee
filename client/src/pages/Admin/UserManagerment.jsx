/* eslint-disable react/jsx-no-undef */
import React from "react";
import { Button, Input, Select, Table, Spin, Modal } from "antd";
import { FaUserPlus } from "react-icons/fa6";
import { getAllUser, updateUserRole } from "../../api/admin";
import { useEffect, useState } from "react";

const { Search } = Input;

const UserManagerment = () => {
  const [users, setUsers] = useState([]); // State for users
  const [loading, setLoading] = useState(false); // Loading state for data fetching
  const [searchText, setSearchText] = useState(""); // For search input
  const [filterRole, setFilterRole] = useState("all"); // For filtering roles
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };
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
  const handleRowClick = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true); // Show the modal
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };
  const handleUpdateRole = async () => {
    if (!selectedUser) return;

    setLoadingUpdate(true); // Set loading state for updating

    const { userId, role } = selectedUser;

    // Call the API to update the role
    const { success, result, error } = await updateUserRole(userId, role);

    if (success) {
      console.log("User role updated successfully!");
      // Update the users list with the updated role
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: result.role } : user
        )
      );
      setIsModalVisible(false); // Close the modal
    } else {
      console.log(error || "Failed to update user role.");
    }

    setLoadingUpdate(false); // Stop loading
  };
  // Columns for the table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      dataIndex: "createDate",
      key: "createDate",
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
          rowKey={(record) => record._id}
          onRow={(record) => ({
            onClick: () => handleRowClick(record), // Handle row click
          })}
          rowClassName="table-row"
          // pagination={{
          //   current: filteredUsers,
          //   pageSize: 7,
          //   total: filteredUsers.length,
          // }}
        />
      </div>
      <Modal
        title="Edit User Role"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleUpdateRole}
            loading={loadingUpdate}
          >
            Update Role
          </Button>,
        ]}
      >
        {selectedUser ? (
          <div>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>

            <div>
              <strong>Role:</strong>
              <Select
                value={selectedUser.role}
                onChange={(value) =>
                  setSelectedUser({ ...selectedUser, role: value })
                }
                style={{ width: "100%" }}
              >
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
                <Option value="supplier">supplier</Option>
              </Select>
            </div>
          </div>
        ) : (
          <Spin size="small" />
        )}
      </Modal>
    </div>
  );
};

export default UserManagerment;
