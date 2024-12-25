import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Input,
  Space,
  Table,
  Button,
  Spin,
  message,
  Dropdown,
  Menu,
  Tooltip,
} from "antd";

import {
  CopyOutlined,
  DownloadOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import { getSupplierTransaction } from "../../../../api/supplier";

const { RangePicker } = DatePicker;
const { Search } = Input;

const PaidPayment = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getSupplierTransaction(1);
        if (data.result) {
          const mappedData = data.value.transasctions.results.map((item) => ({
            key: item.id,
            orderDetail: item.note || "Không có chi tiết",
            creationDate: item.createDate, // Ngày gốc từ API
            formattedDate: new Date(item.createDate).toLocaleDateString(
              "vi-VN"
            ), // Định dạng để hiển thị
            orderStatus: "Chờ thanh toán",
            estimatedPayment: `${item.amount.toLocaleString()} đ`,
            paidAmount: `${item.afterBalance.toLocaleString()} đ`,
            statementCode: item.id,
          }));
          setTransactions(mappedData);
          setFilteredTransactions(mappedData);
        } else {
          message.error("Không thể lấy dữ liệu giao dịch!");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        message.error("Đã xảy ra lỗi khi lấy dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleDateChange = (dates) => {
    if (dates) {
      const [start, end] = dates;
      const filtered = transactions.filter((item) => {
        const itemDate = new Date(item.creationDate); // Sử dụng ngày gốc
        return itemDate >= start.toDate() && itemDate <= end.toDate();
      });
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  };

  const handleSearch = (value) => {
    const filtered = transactions.filter(
      (item) =>
        item.orderDetail.toLowerCase().includes(value.toLowerCase()) ||
        item.statementCode.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTransactions(filtered);
    setSearchTerm(value);
  };

  const handleDownload = (record) => {
    console.log("Tải xuống:", record);
    message.info(`Tải xuống sao kê: ${record.statementCode}`);
    // Thực hiện chức năng tải xuống tại đây
  };

  const handleReport = (record) => {
    console.log("Báo cáo:", record);
    message.info(`Báo cáo giao dịch: ${record.statementCode}`);
    // Thực hiện chức năng báo cáo tại đây
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    message.success("Sao chép thành công!");
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item
        key="download"
        icon={<DownloadOutlined />}
        onClick={() => handleDownload(record)}
      >
        Tải xuống
      </Menu.Item>
      <Menu.Item
        key="report"
        icon={<FileTextOutlined />}
        onClick={() => handleReport(record)}
      >
        Báo cáo
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Mã sao kê",
      dataIndex: "statementCode",
      key: "statementCode",
      render: (text) => (
        <div className="flex items-center space-x-2">
          <span>{text}</span>
          <Tooltip title="Sao chép">
            <Button
              type="text"
              icon={<CopyOutlined />}
              onClick={() => handleCopy(text)}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: "Ngày tạo đơn",
      dataIndex: "formattedDate",
      key: "formattedDate", // Hiển thị ngày định dạng
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
      title: "Nội dung thanh toán",
      dataIndex: "orderDetail",
      key: "orderDetail",
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <Button type="link">Xem thêm</Button>
        </Dropdown>
      ),
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
              onChange={handleDateChange}
            />
          </Space>
        </div>
        <Space.Compact>
          <Search
            addonBefore="Tìm theo nội dung"
            placeholder="Nhập nội dung"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
          />
        </Space.Compact>
      </div>

      <div className="pt-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
          <Table columns={columns} dataSource={filteredTransactions} />
        )}
      </div>
    </div>
  );
};

export default PaidPayment;
