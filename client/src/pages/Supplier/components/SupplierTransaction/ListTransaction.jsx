import React, { useEffect, useState } from "react";
import { Button, DatePicker, Dropdown, Menu, Select, Space, Table } from "antd";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import * as XLSX from "xlsx";

import { FaChevronDown } from "react-icons/fa";

import { getSupplierOutTransaction } from "../../../../api/wallettransaction";

const { RangePicker } = DatePicker;

const ListTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [updateID, setUpdateID] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userData = await getSupplierOutTransaction({
        status,
        fromDate: startDate || undefined,
        toDate: endDate || undefined,
        updateID,
      });
      setTransactions(userData.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [status, startDate, endDate, updateID]);

  const handleReset = () => {
    setStatus(null);
    setStartDate(null);
    setEndDate(null);
    setUpdateID(null);
    setTransactions([]);
    fetchUserData(); // Reload data after resetting filters
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    // Export the workbook to Excel
    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  const columns = [
    {
      title: "Mã số giao dịch",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Thời gian giao dịch",
      dataIndex: "createDate",
      key: "createDate",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Loại giao dịch",
      dataIndex: "type",
      key: "type",
      render: (text) => {
        switch (text) {
          case "AUTO_WITHDRAW":
            return "Rút tiền tự động";
          case "MANUAL_WITHDRAW":
            return "Rút tiền thủ công";
          default:
            return text;
        }
      },
    },
    {
      title: "Chi tiết",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="text-xl font-semibold">Danh sách giao dịch</div>
      <div className="text-gray-500">
        Bạn có thể kiểm tra danh sách lịch sử giao dịch trong vòng 180 ngày gần
        nhất, để kiểm tra lịch sử giao dịch trong khoảng thời gian khác, bạn có
        thể chọn khoảng thời gian tương ứng.
      </div>
      <div className="space-y-4 mt-4">
        <Space className="w-full justify-between">
          <div className="flex items-center space-x-4">
            <Select
              value={status}
              onChange={(value) => setStatus(value)}
              placeholder="Loại giao dịch"
              options={[
                { value: null, label: "Tất cả" },
                { value: 0, label: "Đang chờ" },
                { value: 1, label: "Lỗi" },
                { value: 2, label: "Hoàn tất" },
                { value: 3, label: "Đã trả" },
              ]}
              className="w-225"
            />
            <RangePicker
              locale={locale}
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  setStartDate(dayjs(dates[0]).format("YYYY-MM-DD"));
                  setEndDate(dayjs(dates[1]).format("YYYY-MM-DD"));
                } else {
                  setStartDate(null);
                  setEndDate(null);
                }
              }}
              value={
                startDate && endDate ? [dayjs(startDate), dayjs(endDate)] : null
              }
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={handleReset}>Thiết lập lại</Button>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1" onClick={handleExport}>
                    Chi tiết giao dịch (excel)
                  </Menu.Item>
                  <Menu.Item key="2">Chi tiết giao dịch (csv)</Menu.Item>
                </Menu>
              }
            >
              <Button>
                <Space>
                  Xuất dữ liệu
                  <FaChevronDown />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </Space>
        <Table
          columns={columns}
          dataSource={transactions}
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </div>
    </div>
  );
};

export default ListTransaction;
