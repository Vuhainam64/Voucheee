import React, { useState, useEffect } from "react";
import {
  Input,
  DatePicker,
  Table,
  Button,
  Dropdown,
  Menu,
  message,
  Tooltip,
  Select,
} from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import { CopyOutlined } from "@ant-design/icons";
import { FaChevronRight } from "react-icons/fa";
import { SiSecurityscorecard } from "react-icons/si";

import { getAllVoucherConverting } from "../../api/vouchercode";
import { ConvertingDetail } from "./components/ConvertVoucher";

dayjs.extend(isBetween);

const { Search } = Input;
const { Option } = Select;

const ConvertVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [filteredVouchers, setFilteredVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" for newest, "asc" for oldest
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      setLoading(true);
      try {
        const response = await getAllVoucherConverting();
        const data = response.results.map((item) => ({
          id: item.updateId,
          time: item.updateTime,
          name: item.firstItem.name,
          brand: item.firstItem.brand,
          count: item.count,
          status: item.status,
        }));
        setVouchers(data);
        setFilteredVouchers(data);
      } catch (error) {
        message.error("Lỗi khi tải danh sách voucher");
        console.error("Error fetching vouchers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, [isModalVisible]);

  const handleSearch = (value) => {
    setSearchText(value);
    filterData(value, selectedDate, selectedStatus, sortOrder);
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    filterData(searchText, dateString, selectedStatus, sortOrder);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    filterData(searchText, selectedDate, value, sortOrder);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    filterData(searchText, selectedDate, selectedStatus, value);
  };

  const filterData = (text, date, status, order) => {
    let filtered = vouchers.filter((voucher) => {
      const matchesID = voucher.id.includes(text);
      const matchesDate = date ? dayjs(voucher.time).isSame(date, "day") : true;
      const matchesStatus =
        status === "Tất cả" ||
        (status === "Đã xử lý" && voucher.status === "Đã xử lý") ||
        (status === "Chưa xử lý" && voucher.status === "Chưa xử lý");
      return matchesID && matchesDate && matchesStatus;
    });

    // Sort the filtered data
    filtered = filtered.sort((a, b) => {
      return order === "desc"
        ? dayjs(b.time).valueOf() - dayjs(a.time).valueOf()
        : dayjs(a.time).valueOf() - dayjs(b.time).valueOf();
    });

    setFilteredVouchers(filtered);
  };

  const handleMenuClick = (key, voucher) => {
    if (key === "details") {
      setSelectedVoucher(voucher);
      setIsModalVisible(true);
    } else if (key === "cancel") {
      console.log(`Huỷ voucher ${voucher.id}`);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    message.success("Đã sao chép ID!");
  };

  const menu = (voucher) => (
    <Menu
      onClick={({ key }) => handleMenuClick(key, voucher)}
      items={[
        { key: "details", label: "Xem chi tiết" },
        { key: "cancel", label: "Huỷ" },
      ]}
    />
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <div className="flex items-center space-x-2">
          <span>{text}</span>
          <Tooltip title="Sao chép ID">
            <CopyOutlined
              className="cursor-pointer text-blue-500"
              onClick={() => handleCopy(text)}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      render: (time) => new Date(time).toLocaleString(), // Hiển thị định dạng thời gian
      sorter: (a, b) => new Date(a.time) - new Date(b.time), // Sắp xếp tăng/giảm dần
      filters: [
        {
          text: "Hôm nay",
          value: "today",
        },
        {
          text: "7 ngày trước",
          value: "last7days",
        },
        {
          text: "30 ngày trước",
          value: "last30days",
        },
      ],
      onFilter: (value, record) => {
        const now = new Date();
        const recordDate = new Date(record.time);

        if (value === "today") {
          return recordDate.toDateString() === now.toDateString(); // Cùng ngày
        } else if (value === "last7days") {
          return recordDate > new Date(now.setDate(now.getDate() - 7));
        } else if (value === "last30days") {
          return recordDate > new Date(now.setDate(now.getDate() - 30));
        }
        return true;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Chức năng",
      key: "actions",
      render: (_, record) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <Button type="primary">Hành động</Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-4 p-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2">
        <SiSecurityscorecard className="text-xl" />
        <div>Trung tâm hoạt động</div>
        <FaChevronRight />
        <div>Cập nhật Voucher</div>
      </div>

      <div className="bg-white p-4 rounded-xl space-y-4">
        <div className="text-xl font-semibold">
          Danh sách voucher đang chờ chuyển đổi
        </div>
        {/* Filters */}
        <div className="flex items-center space-x-4">
          <Search
            placeholder="Tìm kiếm theo ID"
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
          <DatePicker onChange={handleDateChange} />
          <Select
            placeholder="Lọc theo trạng thái"
            onChange={handleStatusChange}
            style={{ width: 200 }}
            defaultValue="Tất cả"
          >
            <Option value="Tất cả">Tất cả</Option>
            <Option value="Đã xử lý">Đã xử lý</Option>
            <Option value="Chưa xử lý">Chưa xử lý</Option>
          </Select>
          <Select
            placeholder="Sắp xếp"
            onChange={handleSortChange}
            style={{ width: 200 }}
            defaultValue="desc"
          >
            <Option value="desc">Mới nhất</Option>
            <Option value="asc">Cũ nhất</Option>
          </Select>
        </div>
      </div>

      {/* Voucher Table */}
      <Table
        columns={columns}
        dataSource={filteredVouchers}
        loading={loading}
        rowKey="id"
        className="bg-white rounded-xl"
        pagination={{
          pageSize: 7,
        }}
      />

      {/* Converting Detail Modal */}
      {selectedVoucher && (
        <ConvertingDetail
          visible={isModalVisible}
          setVisible={setIsModalVisible}
          voucherId={selectedVoucher.id}
          onCancel={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};

export default ConvertVoucher;
