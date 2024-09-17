import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DatePicker, Input, Space, Table, Button } from "antd";

import { IncomeStatement } from "./components/IncomeOverview";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const { RangePicker } = DatePicker;
const { Search } = Input;

const IncomeOverview = () => {
  // Sample data for the line chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "",
        data: [12000, 19000, 3000, 5000, 20000, 30000],
        borderColor: "rgba(54, 162, 235, 0.8)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Monthly Income",
      },
    },
    scales: {
      x: {
        ticks: {
          padding: 10,
          autoSkip: true,
          maxTicksLimit: 6,
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 5,
        },
      },
    },
  };

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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3 bg-white p-4 rounded-xl">
          <div className="font-semibold text-xl">Tổng quan thu nhập</div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-slate-200 rounded-md p-4">
              <div className="text-md font-semibold">Chờ thanh toán</div>
              <div className="py-8 font-semibold text-2xl text-primary">
                0.00 đ
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div>Đơn hàng chờ xác nhận</div>
                  <div className="text-primary">0.00 đ</div>
                </div>
                <div className="flex justify-between">
                  <div>Hẹn thanh toán ngày mai</div>
                  <div className="text-primary">0.00 đ</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-200 rounded-md p-4 h-[200px] w-full space-y-2">
              <div className="flex justify-between">
                <div className="text-md font-semibold">
                  Chuyển vào Số dư của tôi
                </div>
                <div
                  className="text-primary bg-white p-1 px-2 rounded-md border
                border-primary cursor-pointer"
                >
                  Quản lí số dư tài khoản Vouchee
                </div>
              </div>
              <div className="relative w-full h-full">
                <Line data={data} options={options} width="100%" height="25%" />
              </div>
            </div>
          </div>
        </div>
        {/* Báo cáo thu nhập */}
        <IncomeStatement />
      </div>

      <div className="bg-white p-4 rounded-xl">
        <div className="border-b border-gray-200 pt-2 flex space-x-4">
          <div
            className="text-primary border-b border-primary cursor-pointer
          text-lg"
          >
            Chờ thanh toán
          </div>
          <div className="cursor-pointer text-lg">Đã thanh toán</div>
        </div>

        <div className="pt-4 flex space-x-10">
          <div className="flex items-center">
            <Space
              direction="horizontal"
              size="middle"
              style={{ width: "100%" }}
            >
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
    </div>
  );
};

export default IncomeOverview;
