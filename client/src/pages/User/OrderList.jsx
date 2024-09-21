import React, { useState } from "react";
import { DatePicker, Input, Select, Table, Button } from "antd";

const { RangePicker } = DatePicker;
const { Search } = Input;

const OrderList = () => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Data for the table
  const dataSource = [
    {
      key: "1",
      time: "2023-11-24 11:48:07",
      orderId: "6663836",
      product: "Steam Wallet Code 40 HKD (~123.880 VNĐ) x1",
      total: "130.000đ",
      status: "Đã xử lý",
    },
    {
      key: "2",
      time: "2021-06-08 17:17:54",
      orderId: "4662750",
      product: "Steam Wallet Code 80 HKD (~236.000 VNĐ) x1",
      total: "409.000đ",
      status: "Đã xử lý",
    },
    {
      key: "3",
      time: "2021-06-03 17:03:41",
      orderId: "4642268",
      product: "Gói nạp Steam Wallet 50$ (Nạp chậm) x1",
      total: "1.080.000đ",
      status: "Đã xử lý",
    },
    // Additional rows
    {
      key: "4",
      time: "2023-09-12 09:22:31",
      orderId: "8723947",
      product: "Amazon Gift Card 100 USD x1",
      total: "2.300.000đ",
      status: "Đang xử lý",
    },
    {
      key: "5",
      time: "2023-07-28 15:45:10",
      orderId: "3487324",
      product: "Netflix Subscription 1 Month x1",
      total: "199.000đ",
      status: "Đã hủy",
    },
    {
      key: "6",
      time: "2023-06-11 13:30:05",
      orderId: "9834756",
      product: "Google Play Gift Card 50 USD x2",
      total: "1.600.000đ",
      status: "Đã xử lý",
    },
    {
      key: "7",
      time: "2023-05-22 17:12:58",
      orderId: "1238476",
      product: "Steam Wallet Code 20 USD x1",
      total: "480.000đ",
      status: "Đã xử lý",
    },
    {
      key: "8",
      time: "2023-03-14 11:07:19",
      orderId: "7832645",
      product: "PlayStation Network Card 50 USD x1",
      total: "1.100.000đ",
      status: "Đã xử lý",
    },
    {
      key: "9",
      time: "2023-01-25 08:44:30",
      orderId: "4536729",
      product: "Spotify Premium Subscription 1 Month x1",
      total: "149.000đ",
      status: "Đã xử lý",
    },
    {
      key: "10",
      time: "2022-12-14 16:39:44",
      orderId: "8972641",
      product: "Steam Wallet Code 100 USD x1",
      total: "2.200.000đ",
      status: "Đã xử lý",
    },
    {
      key: "11",
      time: "2022-10-10 10:27:02",
      orderId: "7463289",
      product: "Apple Gift Card 50 USD x1",
      total: "1.300.000đ",
      status: "Đã xử lý",
    },
    {
      key: "12",
      time: "2022-09-06 14:19:33",
      orderId: "5748392",
      product: "Nintendo eShop Card 25 USD x1",
      total: "590.000đ",
      status: "Đã xử lý",
    },
    {
      key: "13",
      time: "2022-07-01 09:35:50",
      orderId: "3846293",
      product: "Google Play Gift Card 100 USD x1",
      total: "2.400.000đ",
      status: "Đã xử lý",
    },
  ];

  // Columns for the table
  const columns = [
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Chức năng",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleDetailsClick(record.orderId)}>
          Chi tiết
        </Button>
      ),
    },
  ];

  const handleDetailsClick = (orderId) => {
    console.log(`Chi tiết for order ${orderId}`);
    // Add functionality for viewing details here
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      {/* Search, Date Picker, and Status Selector in one row */}
      <div className="flex space-x-4 mb-10">
        <Search
          placeholder="Mã đơn hàng / Sản phẩm"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={onSearch}
          className="flex-1"
        />
        <RangePicker className="flex-1" />
        <Select
          showSearch
          placeholder="Trạng thái"
          optionFilterProp="label"
          onChange={onChange}
          options={[
            { value: "all", label: "Tất cả" },
            { value: "finish", label: "Hoàn thành" },
            { value: "cancel", label: "Huỷ bỏ" },
          ]}
          className="flex-1 h-10"
        />
      </div>

      {/* Table for order data */}
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: 7,
          total: dataSource.length, // Adjust this based on your full data size
        }}
        onChange={handleTableChange}
        rowKey="orderId"
      />
    </div>
  );
};

export default OrderList;
