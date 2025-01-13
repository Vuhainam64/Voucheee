import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  Select,
  Space,
  Table,
} from "antd";
import { FaChevronDown } from "react-icons/fa";

import { getSellerTransaction } from "../../../../api/wallet";

const { Search } = Input;
const { RangePicker } = DatePicker;

const ListTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  console.log(transactions); // Giúp kiểm tra dữ liệu từ API

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getSellerTransaction();
      setTransactions(userData.results); // Lưu transaction vào state từ API
    };

    fetchUserData();
  }, []);

  const columns = [
    {
      title: "Mã số giao dịch",
      dataIndex: "id", // Dùng id thay vì transactionId
      key: "id",
    },
    {
      title: "Thời gian giao dịch",
      dataIndex: "createDate", // Dùng createDate từ API
      key: "createDate",
      render: (text) => new Date(text).toLocaleString(), // Định dạng ngày tháng
    },
    {
      title: "Loại giao dịch",
      dataIndex: "type", // Dùng type từ API
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
      dataIndex: "note", // Dùng note từ API
      key: "note",
    },
    {
      title: "Số tiền",
      dataIndex: "amount", // Dùng amount từ API
      key: "amount",
      render: (text) => `${text.toLocaleString()} VND`, // Hiển thị số tiền có dấu phẩy
    },
    {
      title: "Trạng thái",
      dataIndex: "status", // Dùng status từ API
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
              defaultValue="Loại giao dịch"
              options={[
                { value: "1", label: "Tất cả" },
                { value: "2", label: "Từ ngân hàng hoàn về" },
                { value: "3", label: "Thanh toán thất bại" },
                { value: "4", label: "Rút tiền theo yêu cầu" },
                { value: "5", label: "Rút tiền tự động" },
              ]}
              className="w-225"
            />
            <RangePicker />
            <Search placeholder="Mã số giao dịch" className="w-225" />
          </div>
          <div className="flex items-center space-x-4">
            <Button>Thiết lập lại</Button>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1">Chi tiết giao dịch (excel)</Menu.Item>
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
          dataSource={transactions} // Dùng transactions từ API
          pagination={{ pageSize: 10 }}
          bordered
        />
      </div>
    </div>
  );
};

export default ListTransaction;
