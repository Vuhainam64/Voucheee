import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Table, Button, Dropdown, Menu, Checkbox } from "antd";

import { BiTransferAlt } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa6";
import { DownOutlined } from "@ant-design/icons";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const DisbursementList = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample data
  const data = [
    {
      key: "1",
      accountNo: "1234567890",
      beneficiary: "Nguyễn Văn A",
      bank: "Vietcombank - Hà Nội",
      amount: 10000000,
      paymentDetail: "Thanh toán hợp đồng ABC",
      role: "Member",
      time: "2023-12-01",
    },
    {
      key: "2",
      accountNo: "0987654321",
      beneficiary: "Trần Thị B",
      bank: "Techcombank - Đà Nẵng",
      amount: 5000000,
      paymentDetail: "Thanh toán hợp đồng DEF",
      role: "Supplier",
      time: "2023-12-15",
    },
    {
      key: "3",
      accountNo: "1122334455",
      beneficiary: "Lê Văn C",
      bank: "ACB - Hồ Chí Minh",
      amount: 20000000,
      paymentDetail: "Thanh toán hợp đồng XYZ",
      role: "Seller",
      time: "2023-12-20",
    },
  ];

  const totalAmount = data.reduce((acc, item) => acc + item.amount, 0);
  const totalPeople = data.length;

  // Chart data
  const chartData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Giải ngân mỗi tháng",
        data: [20000000, 10000000, 0, 35000000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Table columns
  const columns = [
    {
      title: <Checkbox onChange={(e) => handleSelectAll(e.target.checked)} />,
      dataIndex: "checkbox",
      key: "checkbox",
      render: (_, record) => (
        <Checkbox
          checked={selectedRows.includes(record.key)}
          onChange={(e) => handleRowSelect(record.key, e.target.checked)}
        />
      ),
    },
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
      render: (value) => `${value.toLocaleString()} đ`,
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
      title: "Chức năng",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">Xem chi tiết</Menu.Item>
              <Menu.Item key="2">Download</Menu.Item>
              <Menu.Item key="3">Xuất Excel</Menu.Item>
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

  // Handle row selection
  const handleRowSelect = (key, checked) => {
    setSelectedRows((prev) =>
      checked ? [...prev, key] : prev.filter((item) => item !== key)
    );
  };

  // Handle select all
  const handleSelectAll = (checked) => {
    setSelectedRows(checked ? data.map((item) => item.key) : []);
  };

  // Export to Excel
  const exportToExcel = () => {
    setLoading(true);
    const selectedData = data.filter((item) => selectedRows.includes(item.key));
    console.log("Exporting:", selectedData);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <BiTransferAlt className="text-xl" />
        <div>Giải ngân</div>
        <FaChevronRight />
        <div>Danh sách giải ngân</div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 space-y-2">
          <div className="text-gray-600">Số lượng giải ngân</div>
          <div className="text-xl font-bold">{totalPeople}</div>
          <div className="text-gray-600">Tổng tiền</div>
          <div className="text-xl font-bold">
            {totalAmount.toLocaleString()} đ
          </div>
          <div className="text-gray-600">Cập nhật tới</div>
          <div className="text-xl font-bold">26/12/2024</div>
        </div>
        <div className="bg-white rounded-lg p-4 col-span-2">
          <Bar data={chartData} height={80} />
        </div>
      </div>

      {/* Title and Export Button */}
      <div className="bg-white rounded-lg p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Danh sách giải ngân</div>
        <Button
          type="primary"
          onClick={exportToExcel}
          loading={loading}
          disabled={selectedRows.length === 0}
        >
          Xuất Excel
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg p-4">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="key"
          pagination={{ pageSize: 5, pageSizeOptions: ["5", "10", "20"] }}
        />
      </div>
    </div>
  );
};

export default DisbursementList;
