import React from "react";
import { Button, DatePicker, Dropdown, Input, Space, Table } from "antd";

import { FaChevronDown } from "react-icons/fa";

const { RangePicker } = DatePicker;
const { Search } = Input;

const IncomeStatement = () => {
  const items = [
    {
      label: <div>Chi tiết đơn hàng (Excel)</div>,
      key: "0",
    },
    {
      label: <div>Chi tiết đơn hàng (CSV)</div>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <div>Xuất tất cả nhật ký</div>,
      key: "3",
    },
  ];

  // Define the columns for the table
  const columns = [
    {
      title: "Mã sao kê",
      dataIndex: "statementCode",
      key: "statementCode",
    },
    {
      title: "Chu kỳ sao kê",
      dataIndex: "reportCycle",
      key: "reportCycle",
    },
    {
      title: "Số tiền đã thanh toán",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },
    {
      title: "Đã thanh toán",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle" direction="vertical">
          <Button type="link">Xem Chi tiết Sao kê</Button>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <Button onClick={(e) => e.preventDefault()} type="link">
              <Space>
                Tải xuống
                <FaChevronDown />
              </Space>
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Sample data for the table
  const tableData = [
    {
      key: "1",
      statementCode: "VN33W9W23L-2022-0928",
      reportCycle: "28 Sep 2022 - 28 Sep 2022",
      paidAmount: "24,607.00 ₫",
      status: "Chuyển vào Số dư của tôi",
    },
    {
      key: "2",
      statementCode: "VN33W9W23L-2022-0913",
      reportCycle: "13 Sep 2022 - 13 Sep 2022",
      paidAmount: "1,480,704.00 ₫",
      status: "Chuyển vào Số dư của tôi",
    },
    {
      key: "3",
      statementCode: "VN33W9W23L-2022-014",
      reportCycle: "04 Apr 2022 - 10 Apr 2022",
      paidAmount: "63,130.10 ₫",
      status: "Được phát hành vào tài khoản người nhận thanh toán",
    },
    {
      key: "4",
      statementCode: "VN33W9W23L-2022-007",
      reportCycle: "14 Feb 2022 - 20 Feb 2022",
      paidAmount: "96,649.65 ₫",
      status: "Được phát hành vào tài khoản người nhận thanh toán",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="text-xl font-semibold">Xem sao kê</div>
      <div className="pt-4 flex space-x-10">
        <div className="flex items-center">
          <Space direction="horizontal" size="middle" style={{ width: "100%" }}>
            <div className="text-gray-700">Kỳ báo cáo</div>
            <RangePicker format="DD/MM/YYYY" className="w-full" />
          </Space>
        </div>
        <Space.Compact>
          <Search
            addonBefore="Mã sao kê"
            placeholder="input search text"
            allowClear
          />
        </Space.Compact>
      </div>

      <div className="pt-10">
        <Table columns={columns} dataSource={tableData} />
      </div>
    </div>
  );
};

export default IncomeStatement;
