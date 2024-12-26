import React from "react";
import { Table, Button, Dropdown, Menu, Input, DatePicker, Space } from "antd";

import { BiTransferAlt } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa6";
import { DownOutlined } from "@ant-design/icons";

const { Search } = Input;
const { RangePicker } = DatePicker;

const DisbursementUpdate = () => {
  // Dữ liệu mẫu
  const data = [
    {
      key: "1",
      accountNo: "1234567890",
      beneficiary: "Nguyễn Văn A",
      bank: "Vietcombank - Hà Nội",
      amount: "10,000,000 đ",
      paymentDetail: "Thanh toán hợp đồng ABC",
      role: "Member",
      time: "2023-12-01 10:30",
      status: "Đang xử lý",
    },
    {
      key: "2",
      accountNo: "0987654321",
      beneficiary: "Trần Thị B",
      bank: "Techcombank - Đà Nẵng",
      amount: "5,000,000 đ",
      paymentDetail: "Thanh toán hợp đồng DEF",
      role: "Supplier",
      time: "2023-12-02 15:45",
      status: "Hoàn thành",
    },
    {
      key: "3",
      accountNo: "1122334455",
      beneficiary: "Lê Văn C",
      bank: "ACB - Hồ Chí Minh",
      amount: "20,000,000 đ",
      paymentDetail: "Thanh toán hợp đồng XYZ",
      role: "Seller",
      time: "2023-12-03 08:15",
      status: "Bị hủy",
    },
  ];

  // Cột của bảng
  const columns = [
    {
      title: "Số tài khoản (Account No.)",
      dataIndex: "accountNo",
      key: "accountNo",
    },
    {
      title: "Tên người thụ hưởng (Beneficiary)",
      dataIndex: "beneficiary",
      key: "beneficiary",
    },
    {
      title: "Ngân hàng thụ hưởng/Chi nhánh (Beneficiary Bank)",
      dataIndex: "bank",
      key: "bank",
    },
    {
      title: "Số tiền (Amount)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Nội dung chuyển khoản (Payment Detail)",
      dataIndex: "paymentDetail",
      key: "paymentDetail",
    },
    {
      title: "Vai trò (Role)",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Thời gian (Time)",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Trạng thái (Status)",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Chức năng",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">Tải Excel</Menu.Item>
              <Menu.Item key="2">Nhập Excel</Menu.Item>
              <Menu.Item key="3">Chi tiết</Menu.Item>
              <Menu.Item key="4">Hủy</Menu.Item>
            </Menu>
          }
        >
          <Button>
            Xem thêm <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  // Xử lý sự kiện tìm kiếm
  const handleSearch = (value) => {
    console.log("Search:", value);
  };

  // Xử lý sự kiện chọn khoảng ngày
  const handleDateChange = (dates, dateStrings) => {
    console.log("Selected Dates:", dates);
    console.log("Formatted Dates:", dateStrings);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <BiTransferAlt className="text-xl" />
        <div>Giải ngân</div>
        <FaChevronRight />
        <div>Cập nhật giải ngân</div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg p-4 space-y-4">
        <div className="text-xl font-semibold">
          Danh sách giải ngân cần cập nhật
        </div>

        {/* Search and Date Range */}
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Bar */}
          <Search placeholder="Tìm kiếm" allowClear onSearch={handleSearch} />

          {/* Date Range Picker */}
          <Space direction="vertical" size={20}>
            <RangePicker format="DD/MM/YYYY" onChange={handleDateChange} />
          </Space>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg p-4 space-y-4">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default DisbursementUpdate;
