import React, { useState } from "react";
import { motion } from "framer-motion";
import { buttonClick } from "../../../../animations";
import { Button, Input, Select, Space, Table, Switch, Dropdown } from "antd";
import { FaChevronDown } from "react-icons/fa";

const { Option } = Select;

const AllProduct = () => {
  const [filterOutOfStock, setfilterOutOfStock] = useState(false);

  const items = [
    {
      label: <div>Sao chép</div>,
      key: "0",
    },
    {
      label: <div>Xoá</div>,
      key: "1",
    },
  ];

  // Columns for the main product table
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "productImage",
      key: "productImage",
      render: (image) => (
        <img src={image} alt="Product" style={{ width: 50, height: 50 }} />
      ),
      width: "10%",
    },
    {
      title: "Thông tin sản phẩm",
      dataIndex: "productName",
      key: "productName",
      width: "30%",
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplier",
      key: "supplier",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Đang hoạt động",
      dataIndex: "active",
      key: "active",
      render: (active) => <Switch checked={active} />,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "operation",
      render: (active) => (
        <Space size="middle" direction="vertical">
          <Button type="link">Chỉnh sửa</Button>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <Button onClick={(e) => e.preventDefault()} type="link">
              <Space>
                Xem thêm
                <FaChevronDown />
              </Space>
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Columns for the nested modal table
  const modalColumns = [
    {
      title: "Hình ảnh",
      dataIndex: "modalImage",
      key: "modalImage",
      render: (image) => (
        <img src={image} alt="Modal" style={{ width: 50, height: 50 }} />
      ),
      width: "10%",
    },
    {
      title: "Tên Modal",
      dataIndex: "modalName",
      key: "modalName",
      width: "30%",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Đang hoạt động",
      dataIndex: "active",
      key: "active",
      render: (active) => <Switch checked={active} />,
    },
  ];

  // Data for the table
  const data = [
    {
      key: 1,
      productID: 1,
      productName:
        "Miếng silicon chặn rác, lọc rác Gia Dụng Miền Nam 22 đa năng ngăn ngừa tắc nghẽn ống nước có nút xả nước và khóa nước tiện lợi",
      price: "24,900₫",
      active: true,
      stock: 10,
      productImage:
        "https://cf.shopee.vn/file/vn-11134207-7r98o-lwee41pj1djv76",
      supplier: "GiftPop",
      modals: [
        {
          key: "1-1",
          modalName: "Hồng",
          price: "24,900₫",
          active: true,
          stock: 7,
          modalImage:
            "https://cf.shopee.vn/file/vn-11134207-7r98o-lwee41pjgtsra8",
        },
        {
          key: "1-2",
          modalName: "Trắng",
          price: "24,900₫",
          active: false,
          stock: 3,
          modalImage:
            "https://cf.shopee.vn/file/vn-11134207-7r98o-llvfz7b09ihrac",
        },
      ],
    },
  ];

  // Row selection object
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <div>
      <div className="bg-white p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div>Lọc sản phẩm:</div>
            <motion.div
              {...buttonClick}
              onClick={() => setfilterOutOfStock(!filterOutOfStock)}
              className={`px-2 py-1 rounded-md cursor-pointer ${
                filterOutOfStock ? "bg-primary text-white" : "bg-slate-200"
              }`}
            >
              Hết hàng
            </motion.div>
          </div>
          <motion.div
            {...buttonClick}
            className={`px-2 py-1 rounded-md cursor-pointer hover:text-white
            hover:bg-primary border border-gray-400 hover:border-primary`}
          >
            Thiết lập lại
          </motion.div>
        </div>
        <div className="flex flex-row py-4 space-x-10">
          <Space.Compact className="flex-1">
            <Select defaultValue="Option1">
              <Option value="Option1">Tên sản phẩm</Option>
              <Option value="Option2">Mã sản phẩm</Option>
            </Select>
            <Input.Search className="w-full" />
          </Space.Compact>
          <Space.Compact className="flex-1">
            <Button>Nhà cung cấp</Button>
            <Select defaultValue="Option1" className="w-full">
              <Option value="Option1">GiftPop</Option>
              <Option value="Option2">Gotit</Option>
              <Option value="Option3">Urbox</Option>
              <Option value="Option4">Utop</Option>
            </Select>
          </Space.Compact>
          <Space.Compact className="flex-1">
            <Button>Sắp xếp</Button>
            <Select defaultValue="Option1" className="w-full">
              <Option value="Option1">Tạo gần nhất</Option>
              <Option value="Option2">Cập nhật gần nhất</Option>
              <Option value="Option3">Còn ít trong kho</Option>
              <Option value="Option4">Đắt nhất</Option>
              <Option value="Option5">Rẻ nhất</Option>
            </Select>
          </Space.Compact>
        </div>

        {/* Table Section */}
        <div className="pt-4">
          <div className="pb-2">Đã chọn 0 sản phẩm</div>
          <Table
            columns={columns}
            rowSelection={rowSelection}
            expandable={{
              expandedRowRender: (record) => (
                <Table
                  columns={modalColumns}
                  dataSource={record.modals}
                  pagination={false}
                />
              ),
              rowExpandable: (record) =>
                record.modals && record.modals.length > 0,
            }}
            dataSource={data}
          />
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
