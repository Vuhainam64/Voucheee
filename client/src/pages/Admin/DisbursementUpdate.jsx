import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Dropdown,
  Menu,
  message,
  Spin,
  Input,
  DatePicker,
  Space,
} from "antd";
import dayjs from "dayjs";

import { BiTransferAlt } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa6";
import { DownOutlined } from "@ant-design/icons";

import { getAllTranfering } from "../../api/withdraw";
import { TransactionDetailsModal } from "./components/DisbursementUpdate";

const { RangePicker } = DatePicker;

const DisbursementUpdate = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllTranfering();
        const formattedData = response.results.map((item, index) => ({
          key: index,
          status: item.status,
          updateId: item.updateId,
          count: item.count,
          updateDate: dayjs(item.updateDate).format("DD/MM/YYYY HH:mm"),
          rawDate: item.updateDate,
          transactions: item.transactions, // Add transactions for modal
        }));
        setData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        message.error("Không thể tải dữ liệu! Vui lòng thử lại.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isModalVisible]);

  const handleSearch = (value) => {
    setSearchId(value);
    filterData(value, dateRange);
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
    filterData(searchId, dates);
  };

  const filterData = (id, range) => {
    let filtered = [...data];

    if (id) {
      filtered = filtered.filter(
        (item) =>
          item.updateId &&
          item.updateId.toLowerCase().includes(id.toLowerCase())
      );
    }

    if (range && range.length === 2) {
      const [start, end] = range;
      filtered = filtered.filter((item) => {
        const itemDate = dayjs(item.rawDate);
        return itemDate.isAfter(start) && itemDate.isBefore(end);
      });
    }

    setFilteredData(filtered);
  };

  const handleViewDetails = (record) => {
    setSelectedTransactions(record.transactions);
    console.log(record.transactions);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "updateId",
      key: "updateId",
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Thời gian",
      dataIndex: "updateDate",
      key: "updateDate",
    },
    {
      title: "Trạng thái",
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
              <Menu.Item key="1" onClick={() => handleViewDetails(record)}>
                Chi tiết
              </Menu.Item>
              <Menu.Item key="2">Hoàn tác</Menu.Item>
              <Menu.Item key="3">Import Excel</Menu.Item>
              <Menu.Item key="4">Export Excel</Menu.Item>
            </Menu>
          }
        >
          <Button>
            Thao tác <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="w-full h-full p-4 flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <BiTransferAlt className="text-xl" />
        <div>Giải ngân</div>
        <FaChevronRight />
        <div>Cập nhật giải ngân</div>
      </div>

      <div className="bg-white rounded-lg p-4 space-y-4">
        <div className="text-xl font-semibold">
          Danh sách giải ngân cần cập nhật
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <Input.Search
            placeholder="Tìm kiếm ID"
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
          <Space direction="vertical">
            <RangePicker format="DD/MM/YYYY" onChange={handleDateChange} />
          </Space>
        </div>
        {loading ? (
          <Spin tip="Đang tải dữ liệu..." />
        ) : (
          <Table columns={columns} dataSource={filteredData} />
        )}
      </div>

      <TransactionDetailsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        transactions={selectedTransactions}
      />
    </div>
  );
};

export default DisbursementUpdate;
