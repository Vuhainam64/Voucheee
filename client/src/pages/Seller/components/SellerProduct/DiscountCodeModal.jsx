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
} from "antd";
import dayjs from "dayjs";

import { DownOutlined } from "@ant-design/icons";

import {
  getAllShopPromotion,
  updatePromotionStatus,
} from "../../../../api/shoppromotion";
import { CreatePromotion, EditPromotion } from "./components/DiscountCodeModal";

const { RangePicker } = DatePicker;

const DiscountCodeModal = ({ isVisible, onClose }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);

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

  const handleAddPromotion = (id, values) => {
    setData((prevData) => [
      ...prevData,
      {
        id,
        ...values,
        startDate: values.dateRange[0].format("YYYY-MM-DD"),
        endDate: values.dateRange[1].format("YYYY-MM-DD"),
      },
    ]);
    setFilteredData((prevFilteredData) => [
      ...prevFilteredData,
      {
        id,
        ...values,
        startDate: values.dateRange[0].format("YYYY-MM-DD"),
        endDate: values.dateRange[1].format("YYYY-MM-DD"),
      },
    ]);
  };

  const handleToggleStatus = async (record) => {
    try {
      // Gửi API để cập nhật trạng thái
      await updatePromotionStatus(record.id, !record.isActive);

      // Cập nhật trạng thái trong dữ liệu
      const updatedData = data.map((item) =>
        item.id === record.id ? { ...item, isActive: !item.isActive } : item
      );

      setData(updatedData);
      setFilteredData(updatedData);

      message.success(`Trạng thái của "${record.name}" đã được cập nhật.`);
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại!");
    }
  };

  const handleMenuClick = (action, record) => {
    if (action === "edit") {
      setEditingPromotion(record);
      setIsEditModalVisible(true);
    } else if (action === "delete") {
      console.log("Delete clicked", record);
    }
  };

  const handlePromotionUpdated = (updatedPromotion) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === updatedPromotion.id ? updatedPromotion : item
      )
    );
    setFilteredData((prevFilteredData) =>
      prevFilteredData.map((item) =>
        item.id === updatedPromotion.id ? updatedPromotion : item
      )
    );
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

      <CreatePromotion
        isVisible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onPromotionAdded={handleAddPromotion}
      />
      <EditPromotion
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        promotion={editingPromotion}
        onPromotionUpdated={handlePromotionUpdated}
      />
    </Modal>
  );
};

export default DiscountCodeModal;
