import React from "react";
import { DatePicker, Input, Space, Table, Button } from "antd";

const { RangePicker } = DatePicker;
const { Search } = Input;

const PendingPayment = () => {
  // Columns for the table
  const columns = [
    {
      title: "Chi tiết Đơn hàng",
      dataIndex: "orderDetail",
      key: "orderDetail",
    },
    {
      title: "Ngày tạo đơn",
      dataIndex: "creationDate",
      key: "creationDate",
    },
    {
      title: "Trạng thái Đơn hàng",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Ước tính Số tiền Thanh toán",
      dataIndex: "estimatedPayment",
      key: "estimatedPayment",
    },
    {
      title: "Đã thanh toán",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },
    {
      title: "Mã sao kê",
      dataIndex: "statementCode",
      key: "statementCode",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  // Sample data for the table
  const tableData = [
    {
      key: "1",
      orderDetail: "Chi tiết đơn hàng 1",
      creationDate: "01/01/2023",
      orderStatus: "Chờ thanh toán",
      estimatedPayment: "1,000,000 đ",
      paidAmount: "0 đ",
      statementCode: "SKE001",
      actions: <Button type="link">Xem</Button>,
    },
    {
      key: "2",
      orderDetail: "Chi tiết đơn hàng 2",
      creationDate: "02/01/2023",
      orderStatus: "Đã thanh toán",
      estimatedPayment: "500,000 đ",
      paidAmount: "500,000 đ",
      statementCode: "SKE002",
      actions: <Button type="link">Xem</Button>,
    },
    {
      key: "3",
      orderDetail: "Chi tiết đơn hàng 3",
      creationDate: "02/01/2023",
      orderStatus: "Đã thanh toán",
      estimatedPayment: "500,000 đ",
      paidAmount: "500,000 đ",
      statementCode: "SKE002",
      actions: <Button type="link">Xem</Button>,
    },
  ];
  return (
    <div>
      <div className="pt-4 flex space-x-10">
        <div className="flex items-center">
          <Space direction="horizontal" size="middle" style={{ width: "100%" }}>
            <div className="text-gray-700">Ngày tạo đơn</div>
            <RangePicker
              format="DD/MM/YYYY"
              className="w-full"
              // onChange={handleDateChange}
            />
          </Space>
        </div>
        <Space.Compact>
          <Search
            addonBefore="Mã đơn hàng/ Mã sản phẩm"
            placeholder="input search text"
            allowClear
          />
        </Space.Compact>
      </div>

      <div className="pt-4">
        <Table columns={columns} dataSource={tableData} />
      </div>
    </div>
  );
};

export default PendingPayment;
