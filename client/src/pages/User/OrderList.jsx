import React, { useState, useEffect, useCallback } from "react";
import { DatePicker, Input, Select, Table, Button, message } from "antd";
import { getAllOrder } from "../../api/order";

const { RangePicker } = DatePicker;
const { Search } = Input;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState();
  const [dateRange, setDateRange] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const startDate = dateRange[0]?.toISOString();
      const endDate = dateRange[1]?.toISOString();
      const data = await getAllOrder(statusFilter, startDate, endDate);
      setOrders(
        data.results.map((order) => ({
          key: order.id,
          time: new Date(order.createDate).toLocaleString(),
          orderId: order.id,
          total: `${order.finalPrice.toLocaleString()}đ`,
          status:
            order.status === "PAID"
              ? "Đã xử lý"
              : order.status === "PENDING"
              ? "Đang xử lý"
              : "Đã hủy",
        }))
      );
      setTotalOrders(data.metaData.total);
    } catch (error) {
      message.error("Không thể tải danh sách đơn hàng!");
      console.error(error);
    }
    setLoading(false);
  }, [statusFilter, dateRange]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const columns = [
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Chức năng",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleDetailsClick(record.orderId)}>
          Chi tiết
        </Button>
      ),
    },
  ];

  const handleDetailsClick = (orderId) => {
    message.info(`Chi tiết đơn hàng ${orderId}`);
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex space-x-4 mb-10">
        <Search
          placeholder="Mã đơn hàng / Sản phẩm"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={(value) => console.log("search:", value)}
          className="flex-1"
        />
        <RangePicker
          className="flex-1"
          onChange={(dates) => setDateRange(dates || [])}
        />
        <Select
          showSearch
          placeholder="Trạng thái"
          optionFilterProp="label"
          onChange={(value) => setStatusFilter(value)}
          options={[
            { value: "", label: "Tất cả" },
            { value: 1, label: "Đang xử lý" },
            { value: 2, label: "Đã xử lý" },
            { value: 6, label: "Chờ thanh toán" },
            { value: "CANCELLED", label: "Đã hủy" },
          ]}
          allowClear
          className="flex-1"
        />
      </div>
      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: 8,
          total: totalOrders,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default OrderList;
