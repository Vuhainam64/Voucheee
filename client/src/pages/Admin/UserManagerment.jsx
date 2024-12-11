import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  Table,
  Spin,
  Modal,
  Divider,
  message,
} from "antd";
import { FaUserPlus } from "react-icons/fa6";
import { getAllUser, updateUserRole } from "../../api/admin";

const { Search } = Input;
const { Option } = Select;

const UserManagerment = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    const fetchAllUser = async () => {
      setLoading(true);
      try {
        const data = await getAllUser();
        setUsers(data?.results || []);
      } catch (error) {
        message.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllUser();
  }, []);
  const fetchAllUser = async () => {
    setLoading(true);
    try {
      const data = await getAllUser();
      setUsers(data?.results || []); // Update the users state
    } catch (error) {
      message.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const handleChange = (value) => {
    setFilterRole(value);
  };

  const onSearch = (value) => {
    setSearchText(value);
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
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };
  const handleUpdateRole = async () => {
    if (!selectedUser) return;
    setLoadingUpdate(true);

    const { id, role } = selectedUser;
    if (!id || !role) {
      setLoadingUpdate(false);
      return;
    }

    try {
      await updateUserRole(id, role);
      await fetchAllUser();
      // setUsers((prevUsers) => {
      //   console.log("Previous Users:", prevUsers); // Log previous users state
      //   return prevUsers.map(
      //     (user) =>
      //       user.id === id ? { ...user, role: result.result.role } : user,
      //     console.log(role)
      //   );
      // });
      setIsModalVisible(false);
    } catch (error) {
      console.error("API call failed", error); // Log the error for debugging
    } finally {
      setLoadingUpdate(false);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Permission", dataIndex: "role", key: "role" },
    { title: "Date Added", dataIndex: "createDate", key: "createDate" },
    {
      title: "Operation",
      key: "operation",
      render: (_, record) => (
        <Button type="link" onClick={() => handleRowClick(record)}>
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
              style={{ width: 120 }}
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
        <Table
          dataSource={filteredUsers}
          columns={columns}
          loading={loading}
          rowKey={(record) => record._id}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          rowClassName="table-row"
          pagination={{
            current: currentPage,
            pageSize: 7,
            total: filteredUsers.length,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>
      <Modal
        title="Edit User Role"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
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
              <strong>image:</strong>
              <img src={selectedUser.image} alt="" />
            </p>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedUser.phoneNumber}
            </p>
            <Divider />
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
                <Option value="supplier">Supplier</Option>
              </Select>
            </div>
            <Divider />
            <p>
              <strong>Bank:</strong> {selectedUser.bankAccount}
            </p>
            <p>
              <strong>Bank Name:</strong> {selectedUser.bankName}
            </p>
            <p>
              <strong>Bank Number:</strong> {selectedUser.bankNumber}
            </p>
            <Divider />
            <p>
              <strong>Created By:</strong> {selectedUser.createBy}
            </p>
            <p>
              <strong>Updated By:</strong> {selectedUser.updateBy}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
          </div>
        ) : (
          <Spin size="small" />
        )}
      </Modal>
    </div>
  );
};

export default UserManagerment;
