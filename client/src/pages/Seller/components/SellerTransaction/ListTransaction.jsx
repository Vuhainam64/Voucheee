import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";

import { getSellerTransaction } from "../../../../api/wallet";

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
      dataIndex: "createDate",
      key: "createDate",
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.createDate) - new Date(b.createDate), // Sắp xếp theo thời gian
    },
    {
      title: "Loại giao dịch",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "Rút tiền tự động", value: "AUTO_WITHDRAW" },
        { text: "Rút tiền thủ công", value: "MANUAL_WITHDRAW" },
        { text: "Đơn hàng của người bán", value: "SELLER_ORDER" },
      ],
      onFilter: (value, record) => record.type === value, // Lọc theo type
      render: (text) => {
        switch (text) {
          case "AUTO_WITHDRAW":
            return "Rút tiền tự động";
          case "MANUAL_WITHDRAW":
            return "Rút tiền thủ công";
          case "SELLER_ORDER":
            return "Đơn hàng của người bán";
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
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount, // Sắp xếp theo số tiền
      render: (text) => `${text.toLocaleString()} VND`,
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
          {/* <div className="flex items-center space-x-4">
            <RangePicker />
            <Search placeholder="Mã số giao dịch" className="w-225" />
          </div> */}
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
