import React, { useState } from "react";
import { DatePicker, Input, Table } from "antd";

const { RangePicker } = DatePicker;
const { Search } = Input;

const DepositHistory = () => {
  const [data] = useState([
    {
      key: "1",
      time: "2023-11-24 11:48:33",
      description: "Thưởng Vcoin cho đơn hàng #6663836",
      amount: "1.300đ",
      balance: "1.300đ",
    },
    {
      key: "2",
      time: "2023-11-24 11:48:32",
      description: "Số ID đơn hàng: #6663836",
      amount: "-130.000đ",
      balance: "0đ",
    },
    {
      key: "3",
      time: "2023-11-24 11:47:34",
      description:
        "Nạp tiền chuyển khoản qua Vietcombank. Mã GD: 346902. Thời gian: 11:47 24/11/2023.",
      amount: "125.910đ",
      balance: "130.000đ",
    },
    {
      key: "4",
      time: "2021-06-08 17:18:12",
      description: "Thưởng Vcoin cho đơn hàng #4662750",
      amount: "4.090đ",
      balance: "4.090đ",
    },
    {
      key: "5",
      time: "2021-06-08 17:18:12",
      description: "Số ID đơn hàng: #4662750",
      amount: "-409.000đ",
      balance: "0đ",
    },
    {
      key: "6",
      time: "2021-06-08 17:08:03",
      description:
        "Nạp tiền bằng thẻ ATM nội địa. Mã giao dịch: #DIVINESHOPDC202106081706099239",
      amount: "409.000đ",
      balance: "409.000đ",
    },
    {
      key: "7",
      time: "2021-06-03 17:07:31",
      description: "Số ID đơn hàng: #4642268",
      amount: "-1.080.000đ",
      balance: "0đ",
    },
    {
      key: "8",
      time: "2021-06-03 16:57:32",
      description: "Nạp tiền qua Momo. Mã giao dịch #dv_ebb05c6ac6d4",
      amount: "1.080.000đ",
      balance: "1.080.000đ",
    },
  ]);

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      {/* Search and Date Range Picker */}
      <div className="flex space-x-4 mb-10">
        <Search
          placeholder="Mô tả"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={onSearch}
          className="flex-1"
        />
        <RangePicker className="flex-1" />
      </div>

      {/* Deposit History Table */}
      <Table
        columns={[
          { title: "Thời gian", dataIndex: "time", key: "time" },
          { title: "Mô tả", dataIndex: "description", key: "description" },
          { title: "Số tiền", dataIndex: "amount", key: "amount" },
          { title: "Số dư", dataIndex: "balance", key: "balance" },
        ]}
        dataSource={data}
        pagination={{ pageSize: 10 }} // Set pagination to limit to 10 rows per page
        rowKey="key"
      />
    </div>
  );
};

export default DepositHistory;
