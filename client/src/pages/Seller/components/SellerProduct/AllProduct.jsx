import React, { useEffect, useState } from "react";
import { Button, Input, Select, Space, Table, Switch, Dropdown } from "antd";
import { motion } from "framer-motion";

import { FaChevronDown } from "react-icons/fa";

import { buttonClick } from "../../../../animations";
import { getSellerVoucher, updateVoucherActive } from "../../../../api/voucher";
import { updateModalActive } from "../../../../api/modal";
import { toast } from "react-toastify";

const { Option } = Select;

const AllProduct = () => {
  const [filterOutOfStock, setfilterOutOfStock] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      const data = await getSellerVoucher();
      setVouchers(data?.results || []);
    };
    fetchVouchers();
  }, []);

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
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Product" style={{ width: 50, height: 50 }} />
      ),
      width: "10%",
    },
    {
      title: "Thông tin sản phẩm",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplierName",
      key: "supplierName",
    },
    {
      title: "Kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Đang hoạt động",
      dataIndex: "isActive",
      key: "isActive",
      render: (active, record) => (
        <Switch
          checked={active}
          onChange={async (checked) => {
            try {
              await updateVoucherActive(record.id, checked);
              setVouchers((prevVouchers) =>
                prevVouchers.map((voucher) =>
                  voucher.id === record.id
                    ? { ...voucher, isActive: checked }
                    : voucher
                )
              );
            } catch (error) {
              console.error("Failed to update active status:", error);
            }
          }}
        />
      ),
    },
  ];

  // Columns for the nested modal table
  const modalColumns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Modal" style={{ width: 50, height: 50 }} />
      ),
      width: "10%",
    },
    {
      title: "Tên Modal",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    {
      title: "Giá gốc",
      dataIndex: "originalPrice",
      key: "originalPrice",
    },
    {
      title: "Giá bán",
      dataIndex: "sellPrice",
      key: "sellPrice",
    },
    {
      title: "Giá sự kiện",
      dataIndex: "salePrice",
      key: "salePrice",
    },
    {
      title: "Kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Đang hoạt động",
      dataIndex: "isActive",
      key: "isActive",
      render: (active, record) => (
        <Switch
          checked={active}
          onChange={async (checked) => {
            try {
              await updateModalActive(record.id, checked);
              setVouchers((prevVouchers) =>
                prevVouchers.map((voucher) => ({
                  ...voucher,
                  modals: voucher.modals.map((modal) =>
                    modal.id === record.id
                      ? { ...modal, isActive: checked }
                      : modal
                  ),
                }))
              );
            } catch (error) {
              toast.error("Failed to update active status for modal:", error);
            }
          }}
        />
      ),
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
            dataSource={vouchers}
          />
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
