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
  Tabs,
  Col,
  Row,
  Typography,
  Avatar,
  Space,
  Tooltip,
} from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { FaUserPlus } from "react-icons/fa6";
import {
  banUser,
  getAllUser,
  updateUserRole,
  getCurrentUser,
} from "../../api/admin";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

const { Title, Text } = Typography;
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
  const [currentUser, setCurrentUser] = useState();
  const { TabPane } = Tabs;
  useEffect(() => {
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

    const fetchCurrentUser = async () => {
      try {
        const data = await getCurrentUser(); // Call the correct function

        setCurrentUser(data?.id); // Set the current user state
      } catch (error) {
        console.error("Failed to fetch current user", error);
      }
    };

    fetchAllUser(); // Fetch all users
    fetchCurrentUser(); // Fetch the current user
  }, []); // The empty array ensures this effect only runs once when the component mounts

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

      setIsModalVisible(false);
      toast.success("Cập nhật thành công");
    } catch (error) {
      console.error("API call failed", error); // Log the error for debugging
    } finally {
      setLoadingUpdate(false);
    }
  };
  const handleBanUser = async () => {
    const { id } = selectedUser;
    await banUser(id, "adsad");
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
      render: (_, record) => {
        // Disable the "Edit" button if the record is the current user

        const isCurrentUser = record.id === currentUser;

        return (
          <Button
            type="link"
            onClick={() => handleRowClick(record)}
            style={{ position: "relative" }}
            disabled={isCurrentUser} // Disable if it's the current user
          >
            Edit
          </Button>
        );
      },
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
          rowClassName="table-row"
          pagination={{
            current: currentPage,
            pageSize: 4,
            total: filteredUsers.length,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>
      <Modal
        title="Edit User Role"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Infomation" key="1">
            {selectedUser ? (
              <div>
                <Row
                  gutter={[16, 16]}
                  justify="center"
                  align="middle"
                  style={{ textAlign: "center" }}
                >
                  <Col span={24}>
                    <Avatar
                      src={selectedUser.image}
                      size={120}
                      icon={<UserOutlined />}
                      style={{ border: "2px solid #1890ff" }}
                    />
                    <Title level={4} style={{ marginTop: "10px" }}>
                      {selectedUser.name}
                    </Title>
                  </Col>
                </Row>

                <Divider />

                {/* Contact Information Section */}
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Space direction="horizontal" size="middle">
                      <Tooltip title="Phone Number">
                        <PhoneOutlined style={{ fontSize: "18px" }} />
                      </Tooltip>
                      <Text>{selectedUser.phoneNumber}</Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space direction="horizontal" size="middle">
                      <Tooltip title="Email Address">
                        <MailOutlined style={{ fontSize: "18px" }} />
                      </Tooltip>
                      <Text>{selectedUser.email}</Text>
                    </Space>
                  </Col>
                </Row>

                <Divider />

                {/* Role Selection Section */}
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Text strong>Role:</Text>
                    <Select
                      value={selectedUser.role}
                      onChange={(value) =>
                        setSelectedUser({ ...selectedUser, role: value })
                      }
                      style={{ width: "100%" }}
                      suffixIcon={<EditOutlined />}
                    >
                      <Option value="admin">Admin</Option>
                      <Option value="user">User</Option>
                      <Option value="supplier">Supplier</Option>
                    </Select>
                  </Col>
                </Row>

                <Divider />

                {/* Created and Updated By Section */}
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Space direction="vertical" size="small">
                      <Text strong>Created By:</Text>
                      <Text>{selectedUser.createBy}</Text>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space direction="vertical" size="small">
                      <Text strong>Updated By:</Text>
                      <Text>{selectedUser.updateBy}</Text>
                    </Space>
                  </Col>
                </Row>
                <Row>
                  <Button key="cancel" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  ,
                  <Button
                    key="submit"
                    type="primary"
                    onClick={handleUpdateRole}
                    loading={loadingUpdate}
                  >
                    Update
                  </Button>
                  ,
                </Row>
              </div>
            ) : (
              <Spin size="small" />
            )}
          </TabPane>
          <TabPane tab="Ban" key="2">
            <p>Ban Reason</p>
            <TextField></TextField>
            <Row>
              <Button type="primary" danger onClick={handleBanUser}>
                Ban
              </Button>
            </Row>
          </TabPane>
          <TabPane tab="Delete" key="3"></TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default UserManagerment;
