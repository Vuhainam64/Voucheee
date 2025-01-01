import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Table,
  message,
  Spin,
  Input,
  Space,
  DatePicker,
  Dropdown,
  Menu,
  Switch,
  Form,
} from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

import { DownOutlined } from "@ant-design/icons";

import {
  getAllShopPromotion,
  createPromotion,
} from "../../../../api/shoppromotion";

const { RangePicker } = DatePicker;

const DiscountCodeModal = ({ isVisible, onClose }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [addForm] = Form.useForm();

  useEffect(() => {
    const fetchPromotions = async () => {
      setLoading(true);
      try {
        const response = await getAllShopPromotion();
        setData(response.results);
        setFilteredData(response.results);
      } catch (error) {
        message.error("Không thể tải danh sách mã giảm giá!");
        console.error("Error fetching shop promotions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) {
      fetchPromotions();
    }
  }, [isVisible]);

  const handleSearch = (value) => {
    setSearchText(value);
    filterData(value, dateRange);
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
    filterData(searchText, dates);
  };

  const filterData = (text, dates) => {
    let filtered = [...data];

    if (text) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (dates && dates.length === 2) {
      const [start, end] = dates;
      filtered = filtered.filter((item) => {
        const startDate = dayjs(item.startDate);
        return startDate.isAfter(start) && startDate.isBefore(end);
      });
    }

    setFilteredData(filtered);
  };

  const handleAddPromotion = async (values) => {
    try {
      setLoading(true);
      const response = await createPromotion(
        values.name,
        values.description,
        values.percentDiscount,
        values.dateRange[0].format("YYYY-MM-DD"),
        values.dateRange[1].format("YYYY-MM-DD"),
        values.stock,
        values.isActive
      );

      message.success(response.message);
      setIsAddModalVisible(false);
      addForm.resetFields();

      // Cập nhật danh sách
      setData((prevData) => [
        ...prevData,
        {
          id: response.value,
          ...values,
          startDate: values.dateRange[0].format("YYYY-MM-DD"),
          endDate: values.dateRange[1].format("YYYY-MM-DD"),
        },
      ]);
      setFilteredData((prevFilteredData) => [
        ...prevFilteredData,
        {
          id: response.value,
          ...values,
          startDate: values.dateRange[0].format("YYYY-MM-DD"),
          endDate: values.dateRange[1].format("YYYY-MM-DD"),
        },
      ]);
    } catch (error) {
      message.error("Thêm mã giảm giá thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (record) => {
    try {
      // Toggle trạng thái của bản ghi
      const updatedData = data.map((item) =>
        item.id === record.id ? { ...item, isActive: !item.isActive } : item
      );
      setData(updatedData);
      setFilteredData(updatedData);

      // TODO: Gửi API cập nhật trạng thái tại đây
      message.success(`Trạng thái của "${record.name}" đã được cập nhật.`);
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại!");
    }
  };

  const handleMenuClick = (action, record) => {
    if (action === "edit") {
      console.log("Edit clicked", record);
    } else if (action === "delete") {
      console.log("Delete clicked", record);
    }
  };

  const columns = [
    {
      title: "Tên khuyến mãi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Phần trăm giảm",
      dataIndex: "percentDiscount",
      key: "percentDiscount",
      render: (value) => `${value}%`,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Số lượng",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleStatus(record)}
        />
      ),
    },
    {
      title: "Chức năng",
      key: "actions",
      render: (_, record) => {
        const menu = (
          <Menu
            onClick={(e) => handleMenuClick(e.key, record)}
            items={[
              { label: "Sửa", key: "edit" },
              { label: "Xóa", key: "delete", danger: true },
            ]}
          />
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="link">
              Xem thêm <DownOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Modal
      title="Quản lý mã giảm giá"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={900}
    >
      <div className="mb-4 flex items-center justify-between">
        <Space direction="horizontal" size="middle">
          <Input.Search
            placeholder="Tìm kiếm theo tên"
            onSearch={handleSearch}
            allowClear
            style={{ width: 250 }}
          />
          <RangePicker onChange={handleDateChange} />
        </Space>
        <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
          Thêm Giảm giá
        </Button>
      </div>
      {loading ? (
        <Spin tip="Đang tải danh sách mã giảm giá..." />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 5,
          }}
        />
      )}

      <Modal
        title="Thêm Mã Giảm Giá"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" form={addForm} onFinish={handleAddPromotion}>
          <Form.Item
            label="Tên khuyến mãi"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên khuyến mãi" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu - Ngày kết thúc"
            name="dateRange"
            rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
          >
            <RangePicker />
          </Form.Item>
          <div className="flex items-center justify-between">
            <Form.Item
              label="Phần trăm giảm"
              name="percentDiscount"
              rules={[
                { required: true, message: "Vui lòng nhập phần trăm giảm giá" },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Số lượng"
              name="stock"
              rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="isActive"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Modal>
  );
};

export default DiscountCodeModal;
