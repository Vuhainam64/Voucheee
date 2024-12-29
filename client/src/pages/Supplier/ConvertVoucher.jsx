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

const ConvertVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [filteredVouchers, setFilteredVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
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
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    filterData(value, selectedDate);
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    filterData(searchText, dateString);
  };

  const filterData = (text, date) => {
    const filtered = vouchers.filter((voucher) => {
      const matchesID = voucher.id.includes(text);
      const matchesDate = date ? dayjs(voucher.time).isSame(date, "day") : true;
      return matchesID && matchesDate;
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
        { key: "export", label: "Xuất Excel" },
        { key: "import", label: "Nhập Excel" },
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
        {/* Search and Date Filter */}
        <div className="flex items-center space-x-4">
          <Search
            placeholder="Tìm kiếm voucher"
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
          <DatePicker onChange={handleDateChange} />
        </div>
      </div>

      {/* Voucher Table */}
      <Table
        columns={columns}
        dataSource={filteredVouchers}
        loading={loading}
        rowKey="id"
        className="bg-white rounded-xl"
      />

      {/* Use ConvertingDetail Modal */}
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
