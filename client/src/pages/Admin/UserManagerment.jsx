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
  Form,
  Alert,
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
  getAllSupplier,
} from "../../api/admin";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const generateRandomPassword = (length = 12) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};
const UserManagerment = () => {
  const [users, setUsers] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalVisible, setisUserModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [role, setRole] = useState("");
  // const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState(
    generateRandomPassword()
  );
  const [selectedUserRole] = useState({
    role: "",
    supplierId: "",
  });
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const { TabPane } = Tabs;
  const [form] = Form.useForm();

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
  const fetchAllSupplier = async () => {
    setLoading(true);
    try {
      const data = await getAllSupplier();

      setSupplier(data || []); // Update the users state
    } catch (error) {
      message.error("Failed to fetch suppliers.");
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
  useEffect(() => {
    fetchAllUser(); // Fetch all users
    fetchCurrentUser(); // Fetch the current user
    fetchAllSupplier();
  }, []); // The empty array ensures this effect only runs once when the component mounts

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
  };

  const handleUpdateRole = async () => {
    const { role, supplierId } = form.getFieldsValue();
    console.log("Form Values:", { role, supplierId });

    try {
      const response = await updateUserRole(selectedUser.id, role, supplierId);
      console.log("Form Values:", selectedUser.id, role, supplierId);
      if (response.success) {
        await fetchAllUser();
        toast.success("Cập nhật thành công");
      } else {
        toast.error(response.message || "Cập nhật thất bại");
      }
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      toast.error("Cập nhật thất bại");
    }
  };

  const handleUnBanUser = async () => {
    try {
      const { id } = selectedUser;
      await unBanUser(id);
      await reActiveUser(id);
      await fetchAllUser();
      setisUserModalVisible(false);
      toast.success("Cập nhật thành công");
    } catch {
      setLoading(false);
      toast.error("Cập nhật thất bại");
    }
  };
  const handleBanUser = async () => {
    try {
      const { id } = selectedUser;
      await banUser(id, "");
      await fetchAllUser();
      setisUserModalVisible(false);
      toast.success("Cập nhật thành công");
    } catch (error) {
      setLoading(false);
      toast.error("Cập nhật thất bại");
    }
  };

  const handleCreateUSer = async (values) => {
    const payload = {
      name: values.name,
      email: values.email,
      hashPassword: generatedPassword,
      role: values.role,
      supplierId: values.supplierId,
    };

    try {
      setLoading(true);

      await createUser(payload);
      toast.success("Tạo người dùng thành công");
      await fetchAllUser();
      form.resetFields();
      handleCloseCreateModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Tạo người dùng thất bại");
    } finally {
      setLoading(false);
    }
  };
  const handleRoleChange = (value) => {
    setSelectedUser((prev) => ({ ...prev, role: value }));
    console.log(role);
    form.setFieldsValue({ role: value, supplierId: "" });
  };
  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword();
    setGeneratedPassword(newPassword);
    form.setFieldsValue({ password: newPassword });
    setIsPasswordGenerated(true);
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
                { value: "supplier", label: "supplier" },
              ]}
            />
            <Search
              placeholder="Search users"
              onSearch={onSearch}
              enterButton
            />
          </div>
          <Button
            type="primary"
            size="large"
            icon={<FaUserPlus />}
            onClick={() => setIsCreateModalVisible(true)}
            loading={loading}
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
          rowKey={(record) => record.id}
          rowClassName="table-row"
          pagination={{
            current: currentPage,
            pageSize: 10,
            total: filteredUsers.length,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>
      <Modal
        title="Edit User Role"
        visible={isUserModalVisible}
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

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleUpdateRole}
                  autoComplete="off"
                  initialValues={{
                    role: selectedUser?.role || "user",
                    supplierId: selectedUser.supplierId || undefined,
                  }}
                >
                  {selectedUser.role !== "SUPPLIER" && (
                    <Form.Item name="role">
                      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                        <Col span={24}>
                          <Text strong>Role:</Text>
                          <Select
                            value={selectedUser.role}
                            onChange={handleRoleChange}
                            style={{ width: "100%" }}
                            suffixIcon={<EditOutlined />}
                          >
                            <Option value="admin">Admin</Option>
                            <Option value="user">User</Option>
                            <Option value="supplier">Supplier</Option>
                          </Select>
                        </Col>
                      </Row>
                    </Form.Item>
                  )}
                  {selectedUser?.role === "supplier" && (
                    <Form.Item
                      name="supplierId"
                      rules={[{ required: true, message: "Xin chọn supplier" }]}
                    >
                      <Select
                        loading={loading}
                        optionFilterProp="children"
                        placeholder={selectedUser.supplierName}
                      >
                        {supplier.map((supplier) => (
                          <Select.Option key={supplier.id} value={supplier.id}>
                            {supplier.name} {/* Displaying the supplier name */}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                  {/* Role Selection Section */}
                  {selectedUser.role === "SUPPLIER" && (
                    <Form.Item name="role">
                      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
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
                      <Form.Item
                        name="supplierId"
                        rules={[
                          { required: true, message: "Xin chọn supplier" },
                        ]}
                      >
                        {/* <Select
                          style={{ width: 200 }}
                          placeholder={selectedUser.supplierName}
                          optionFilterProp="children"
                          loading={loading}
                        />
                        {supplier.map((supp) => (
                          <Select.Option key={supp.id} value={supp.id}>
                            {supp.name}
                          </Select.Option>
                        ))} */}
                        <Select
                          loading={loading}
                          optionFilterProp="children"
                          placeholder={selectedUser.supplierName}
                        >
                          {supplier.map((supplier) => (
                            <Select.Option
                              key={supplier.id}
                              value={supplier.id}
                            >
                              {supplier.name}{" "}
                              {/* Displaying the supplier name */}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Form.Item>
                  )}
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
                      loading={loading}
                    >
                      Cancel
                    </Button>
                    ,
                    <Button
                      key="submit"
                      type="primary"
                      loading={loading}
                      htmlType="submit"
                    >
                      Update
                    </Button>
                    ,
                  </Row>
                </Form>
              </div>
            ) : (
              <Spin size="small" />
            )}
          </TabPane>
          <TabPane tab="Ban" key="2">
            <p>Ban Reason</p>
            <TextField></TextField>
            <Row>
              <Button
                type="primary"
                danger
                onClick={handleBanUser}
                loading={loading}
              >
                Ban
              </Button>
              <Button
                type="primary"
                success
                onClick={handleUnBanUser}
                loading={loading}
              >
                Un-Ban
              </Button>
            </Row>
          </TabPane>
          <TabPane tab="Delete" key="3"></TabPane>
        </Tabs>
      </Modal>
      <Modal
        title="Create User"
        visible={isCreateModalVisible}
        onCancel={handleCloseCreateModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateUSer}
          autoComplete="off"
          initialValues={{
            role: selectedUserRole,
            password: generatedPassword,
          }}
        >
          <Form.Item
            label="User name"
            name="name"
            rules={[{ required: true, message: "Please enter the name!" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter the password!" }]}
          >
            {/* <Input.Password placeholder={generatedPassword} /> */}
            <Button
              onClick={handleGeneratePassword}
              style={{ marginBottom: 16 }}
              loading={loading}
            >
              Tạo mật khẩu ngẫu nhiên
            </Button>
            {isPasswordGenerated && (
              <Alert
                message="Đã tạo mật khẩu"
                type="success"
                style={{ marginTop: 10 }}
                showIcon
              />
            )}
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select placeholder="Select role" onChange={handleRoleChange}>
              <Option value="ADMIN">Admin</Option>
              <Option value="SUPPLIER">Supplier</Option>
              <Option value="USER">User</Option>
            </Select>
          </Form.Item>
          {selectedUser?.role === "SUPPLIER" && (
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
                    label: "URBOX",
                  },
                  {
                    value: "8424aadf-7e2e-4489-81f4-b2185dd189be",
                    label: "GIFTPOP",
                  },
                  {
                    value: "efad3e3b-5277-4ce7-9205-08905133a33e",
                    label: "DEALTODAY",
                  },
                  {
                    value: "3542bb12-7e32-485d-baeb-a6df18c51eb6",
                    label: "GOTIT",
                  },
                ]}
              />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create User
            </Button>
            <Button
              onClick={handleCloseCreateModal}
              style={{ marginLeft: "10px" }}
              loading={loading}
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
