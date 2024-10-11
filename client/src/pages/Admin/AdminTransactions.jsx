import React, { useState } from "react";
import { DatePicker, Input, Select, Table, Button } from "antd";

const { RangePicker } = DatePicker;
const { Search } = Input;

const AdminTransactions = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  // Dummy data for the table
  const dataSource = [
    {
      key: "1",
      index: 1,
      id: "1235171",
      amount: "1,000,000 VND",
      content: "DH1015 Ma giao dich Trace710634Trace 710634",
      time: "2024-10-01 10:20:30",
    },
    {
      key: "2",
      index: 2,
      id: "1240463",
      amount: "500,000 VND",
      content: "DH5 Ma giao dich Trace246607 Trace 246607",
      time: "2024-10-02 14:15:10",
    },
  ];

  // Columns for the table
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => console.log("Xem chi tiết", record.id)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-md">
        <div className="text-2xl font-semibold">Danh sách giao dịch</div>
      </div>
      <div
        className="bg-white p-4 rounded-md h-screen"
        style={{ maxHeight: "calc(100vh - 218px)" }}
      >
        {/* Search, Date Picker, and Status Selector in one row */}
        <div className="flex space-x-4 mb-10">
          <Search
            placeholder="Mã đơn chuyển khoản/ Số tiền/ Nội dung"
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            onSearch={onSearch}
            className="flex-1"
          />
          <RangePicker className="flex-1" />
          <Select
            showSearch
            placeholder="Trạng thái"
            optionFilterProp="label"
            onChange={onChange}
            options={[
              { value: "all", label: "Tất cả" },
              { value: "finish", label: "Hoàn thành" },
              { value: "cancel", label: "Huỷ bỏ" },
            ]}
            className="flex-1 h-10"
          />
        </div>
        {/* Table displaying transactions */}
        <Table
          columns={columns}
          dataSource={dataSource}
          onChange={handleTableChange}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: 7,
            total: dataSource.length,
          }}
        />
      </div>
    </div>
  );
};

export default AdminTransactions;
