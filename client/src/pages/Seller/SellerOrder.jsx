import React, { useState, useEffect } from "react";
import {
  Select,
  DatePicker,
  Input,
  Button,
  Table,
  Image,
  Space,
  message,
} from "antd";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

import { FaChevronRight, FaRegCopy } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LuBarChartHorizontal } from "react-icons/lu";

import { getSellerOrder } from "../../api/order";
import { Watermark } from "../../assets/img";

const { RangePicker } = DatePicker;
const { Search } = Input;

const columns = [
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Tổng cộng",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
    render: (price) => <div>{price}đ</div>,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];

const SellerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [searchProductName, setSearchProductName] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getSellerOrder(
          startDate ? startDate.format("YYYY-MM-DD") : "",
          endDate ? endDate.format("YYYY-MM-DD") : "",
          orderId
        );
        setOrders(res.results);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [startDate, endDate, orderId]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const generateDataSource = () => {
    return orders
      .filter(
        (order) =>
          (filterStatus === "Tất cả" || order.status === filterStatus) &&
          ((order.productName &&
            order.productName
              .toLowerCase()
              .includes(searchProductName.toLowerCase())) ||
            !searchProductName)
      )
      .map((order, index) => ({
        key: order.orderId, // use orderId as the key
        product: (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Image width={25} className="rounded-full" src={order.image} />
              <div>{order.sellerName}</div>
              <div className="cursor-pointer text-primary">
                <IoChatbubbleEllipsesOutline />
              </div>
              <div>(1 sản phẩm)</div>
              <div className="flex items-center space-x-2">
                <div>ID Đơn hàng:</div>
                <div
                  className="text-primary flex items-center space-x-2 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(order.orderId);
                    message.success(
                      "Đã sao chép ID đơn hàng: " + order.orderId
                    );
                  }}
                >
                  <div>{order.orderId}</div>
                  <FaRegCopy />
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Image width={60} className="rounded-xl" src={order.image} />
              <div>
                <div>{order.brandName}</div>
                <div className="text-gray-400">Đã tạo: {order.createDate}</div>
              </div>
            </div>
          </div>
        ),
        price: order.totalPrice,
        status: order.status || "Chờ xử lý",
      }));
  };

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const calculateTotalPrice = () => {
    return orders.reduce((total, order) => total + order.totalPrice, 0);
  };

  const exportToPDF = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn ít nhất một đơn hàng để xuất!");
      return;
    }

    const selectedOrders = orders.filter((order) =>
      selectedRowKeys.includes(order.orderId)
    );

    const doc = new jsPDF();

    // Thêm watermark
    const imgData = Watermark;
    doc.setFontSize(50);
    doc.setTextColor(200, 200, 200);

    const tableData = selectedOrders.map((order) => [
      order.orderId,
      order.modalId,
      order.brandName,
      order.sellerName,
      order.unitPrice,
      order.totalPrice,
      order.status,
    ]);

    doc.setFontSize(12);
    doc.text("List of invoices", 10, 20);

    // Thêm bảng vào PDF
    doc.autoTable({
      head: [
        [
          "Order ID",
          "Modal ID",
          "Brand Name",
          "Seller Name",
          "Unit Price",
          "Total Price",
          "Status",
        ],
      ],
      body: tableData,
      startY: 30,
    });

    // Thêm tổng tiền
    const totalPrice = calculateTotalPrice();
    doc.text(`Total: ${totalPrice}VND`, 10, doc.autoTable.previous.finalY + 10);

    // Thêm chữ ký bên phải
    const signatureY = doc.autoTable.previous.finalY + 20; // Vị trí Y của chữ ký
    doc.text("Signature", 170, signatureY); // Chữ ký ở bên phải
    doc.addImage(
      imgData,
      "PNG",
      150, // X tọa độ bên phải
      signatureY + 5, // Y tọa độ
      50,
      25
    );

    const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, "");
    const fileName = `HoaDon_${timestamp}.pdf`;

    doc.save(fileName);
  };

  const filterProps = (
    <div className="bg-white px-4 py-6 rounded-lg mb-4">
      <div className="flex space-x-4 items-center">
        <Select
          value={filterStatus}
          onChange={setFilterStatus}
          options={[
            { value: "Tất cả", label: "Tất cả" },
            { value: "Chờ xử lý", label: "Chờ xử lý" },
            { value: "Chưa thanh toán", label: "Chưa thanh toán" },
            { value: "Đã giao hàng", label: "Đã giao hàng" },
            { value: "Huỷ đơn hàng", label: "Huỷ đơn hàng" },
          ]}
          className="flex-1"
        />
        <RangePicker
          className="flex-1"
          value={startDate && endDate ? [startDate, endDate] : []}
          onChange={handleDateChange}
        />
        <Search
          placeholder="ID đơn hàng"
          allowClear
          className="flex-1"
          onSearch={(value) => setOrderId(value)}
        />
        <Search
          placeholder="Tên sản phẩm"
          allowClear
          className="flex-1"
          onChange={(e) => setSearchProductName(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full h-full p-8 flex flex-col">
      <div className="flex items-center space-x-2">
        <LuBarChartHorizontal className="text-xl" />
        <div>Đơn Hàng</div>
        <FaChevronRight />
        <div className="font-bold">Quản Lý Đơn Hàng</div>
      </div>
      <div className="text-xl font-semibold py-4">Quản lý đơn hàng</div>
      <div className="w-full h-full p-8 flex flex-col">
        {filterProps}

        <div className="bg-white p-4 rounded-lg pb-8">
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Space align="center" size="small">
              {selectedRowKeys.length > 0 && (
                <div>Đã chọn {selectedRowKeys.length} đơn hàng</div>
              )}
              <Button
                type="primary"
                disabled={selectedRowKeys.length === 0}
                onClick={exportToPDF}
                loading={loading}
              >
                Xuất Hóa Đơn
              </Button>
            </Space>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={generateDataSource()}
              pagination={{ pageSize: 5 }}
              loading={loading}
              summary={() => (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={1} colSpan={3}>
                    Tổng cộng
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} colSpan={3}>
                    {calculateTotalPrice()}đ
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              )}
            />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default SellerOrder;
