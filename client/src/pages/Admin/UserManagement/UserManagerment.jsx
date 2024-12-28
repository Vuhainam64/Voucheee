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
  Form,
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
  unBanUser,
  createUser,
  reActiveUser,
  deleteUser,
} from "../../../api/admin";
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
  const [isUserModalVisible, setisUserModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  // const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedUserRole, setSelectedUserRole] = useState({
    role: "",
    supplierId: "",
  });
  const [banReason, setBanReason] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
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
  // const handleTableChange = (pagination) => {
  //   setCurrentPage(pagination.current);
  // };

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
    setisUserModalVisible(true);
  };

  const handleCloseModal = () => {
    setisUserModalVisible(false);
    setSelectedUser(null);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalVisible(false);
    setUserData({ username: "", email: "", password: "" });
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setUserData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
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

      setisUserModalVisible(false);
      toast.success("Cập nhật thành công");
    } catch (error) {
      console.error("API call failed", error); // Log the error for debugging
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleUnBanUser = async () => {
    const { id } = selectedUser;
    await unBanUser(id);
    await reActiveUser(id);
    await fetchAllUser();
    setisUserModalVisible(false);
    toast.success("Cập nhật thành công");
  };
  const handleBanUser = async () => {
    const { id } = selectedUser;
    await banUser(id, banReason);
    await fetchAllUser();
    setisUserModalVisible(false);
    toast.success("Cập nhật thành công");
  };
  const handleDeleteUser = async () => {
    const { id } = selectedUser;
    await deleteUser(id);
    await fetchAllUser();
    setisUserModalVisible(false);
    toast.success("Cập nhật thành công");
  };
  const handleCreateUSer = async (values) => {
    setLoading(true);
    const payload = {
      name: values.name,
      email: values.email,
      hashPassword: values.password,
      role: values.role,
      supplierId: values.supplierId,
    };

    try {
      await createUser(payload);
      toast.success("Tạo người dùng thành công!");
      await fetchAllUser();
      form.resetFields();
      handleCloseCreateModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Tạo người dùng thất bại!");
    } finally {
      setLoading(false);
    }
  };
  const handleRoleChange = (value) => {
    setSelectedUserRole((prev) => ({ ...prev, role: value }));
    form.setFieldsValue({ role: value, supplierId: "" }); // Reset supplierId when role changes
  };
  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    { title: "Phân quyền", dataIndex: "role", key: "role" },
    { title: "Ngày tạo", dataIndex: "createDate", key: "createDate" },
    {
      title: "Hành động",
      key: "operation",
      render: (_, record) => {
        const isCurrentUser = record.id === currentUser;

        return (
          <Button
            type="link"
            onClick={() => handleRowClick(record)}
            style={{ position: "relative" }}
            disabled={isCurrentUser}
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
                { value: "Tất cả", label: "Tất cả" },
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
                { value: "supplier", label: "Supplier" },
              ]}
            />
            <Search placeholder="Tìm kiếm" onSearch={onSearch} enterButton />
          </div>
          <Button
            type="primary"
            size="large"
            icon={<FaUserPlus />}
            onClick={() => setIsCreateModalVisible(true)}
          >
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
            pageSize: 7,
            total: filteredUsers.length,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>
      <Modal
        visible={isUserModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Thông tin người dùng" key="1">
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
                      size={60}
                      icon={<UserOutlined />}
                      style={{ border: "2px solid #1890ff" }}
                    />
                  </Col>
                </Row>

                <Divider />

                {/* Contact Information Section */}
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Space direction="horizontal" size="middle">
                      <UserOutlined style={{ fontSize: "18px" }} />
                      <Text>{selectedUser.name}</Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space direction="horizontal" size="middle">
                      <PhoneOutlined style={{ fontSize: "18px" }} />
                      <Text>{selectedUser.phoneNumber}</Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space direction="horizontal" size="middle">
                      <MailOutlined style={{ fontSize: "18px" }} />
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
                  {selectedUser.role === "supplier" && (
                    <Col span={24}>
                      <Text strong>Tên supplier:</Text>
                      <Select
                        value={selectedUser.supplierType}
                        onChange={(value) =>
                          setSelectedUser({
                            ...selectedUser,
                            supplierType: value,
                          })
                        }
                        style={{ width: "100%" }}
                        placeholder="Tên supplier"
                        options={[
                          {
                            value: "afe77cd6-c86a-414b-b214-06d36382d803",
                            label: "Ubox",
                          },
                          {
                            value: "8424aadf-7e2e-4489-81f4-b2185dd189be",
                            label: "GiftTOP",
                          },
                          {
                            value: "efad3e3b-5277-4ce7-9205-08905133a33e",
                            label: "Dealtoday",
                          },
                          {
                            value: "3542bb12-7e32-485d-baeb-a6df18c51eb6",
                            label: "GoTIT",
                          },
                        ]}
                      ></Select>
                    </Col>
                  )}
                </Row>

                <Divider />

                {/* Created and Updated By Section */}
                {/* <Row gutter={[16, 16]}>
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
                </Row> */}
                <Row>
                  <Button
                    key="cancel"
                    onClick={handleCloseModal}
                    style={{ marginRight: 18 }}
                  >
                    Hủy
                  </Button>

                  <Button
                    key="submit"
                    type="primary"
                    onClick={handleUpdateRole}
                    loading={loadingUpdate}
                  >
                    Cập nhật
                  </Button>
                </Row>
              </div>
            ) : (
              <Spin size="small" />
            )}
          </TabPane>
          <TabPane tab="Chặn người dùng" key="2">
            <TextField
              style={{ marginTop: 18, marginBottom: 18 }}
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)} // Update the reason state
              placeholder="Lí do chặn người dùng"
              fullWidth
            />
            <Row>
              <Button
                type="primary"
                danger
                onClick={handleBanUser}
                style={{ marginRight: 18 }}
              >
                Chặn
              </Button>
              <Button type="primary" success onClick={handleUnBanUser}>
                Bỏ chặn
              </Button>
            </Row>
          </TabPane>
          <TabPane tab="Xóa người dùng" key="3">
            <p style={{ fontWeight: 600, fontSize: 21 }}>
              Bạn có chắc muốn xóa người dùng này?
            </p>
            <Button onClick={handleDeleteUser} type="primary" danger>
              Xóa
            </Button>
          </TabPane>
        </Tabs>
      </Modal>
      <Modal
        title="Thêm người dùng"
        visible={isCreateModalVisible}
        onCancel={handleCloseCreateModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateUSer}
          autoComplete="off"
          initialValues={selectedUserRole}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Xin nhập tên" }]}
          >
            <Input placeholder="Nhập tên" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Xin nhập email!" },
              { type: "email", message: "Định dạng email không đúng" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Xin nhập mật khẩu" }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[
              { required: true, message: "Xin chọn role cho người dùng" },
            ]}
          >
            <Select placeholder="Chọn role" onChange={handleRoleChange}>
              <Option value="admin">Admin</Option>
              <Option value="supplier">Supplier</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
          {selectedUserRole?.role === "supplier" && (
            <Form.Item
              label="Supplier"
              name="supplierId"
              rules={[{ required: true, message: "Xin chọn supplier" }]}
            >
              <Select
                style={{ width: 200 }}
                placeholder="Chọn supplier"
                options={[
                  {
                    value: "afe77cd6-c86a-414b-b214-06d36382d803",
                    label: "Ubox",
                  },
                  {
                    value: "8424aadf-7e2e-4489-81f4-b2185dd189be",
                    label: "GiftTOP",
                  },
                  {
                    value: "efad3e3b-5277-4ce7-9205-08905133a33e",
                    label: "Dealtoday",
                  },
                  {
                    value: "3542bb12-7e32-485d-baeb-a6df18c51eb6",
                    label: "GoTIT",
                  },
                ]}
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="Cập nhật" loading={loading}>
              Create User
            </Button>
            <Button
              onClick={handleCloseCreateModal}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagerment;
