import React from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  Select,
  Space,
  Table,
} from "antd";

import { LuNfc } from "react-icons/lu";
import { IoWallet } from "react-icons/io5";
import { FcSimCardChip } from "react-icons/fc";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import { logoPrimary } from "../../assets/img";

const { Search } = Input;
const { RangePicker } = DatePicker;

const SupplierTransaction = () => {
  const columns = [
    {
      title: "Mã số giao dịch",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Thời gian giao dịch",
      dataIndex: "transactionTime",
      key: "transactionTime",
    },
    {
      title: "Loại giao dịch",
      dataIndex: "transactionType",
      key: "transactionType",
    },
    {
      title: "Chi tiết",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
  ];

  const data = [
    {
      key: "1",
      transactionId: "12345",
      transactionTime: "2024-09-22 10:00",
      transactionType: "Rút tiền",
      details: "Chi tiết 1",
      amount: "1,000,000 VND",
      note: "Ghi chú 1",
    },
    // Add more rows here...
  ];

  return (
    <div className="w-full h-full p-4 flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <IoWallet className="text-xl" />
        <div>Tài Chính</div>
        <FaChevronRight />
        <div>Ví Của Tôi</div>
      </div>
      <div className="text-xl font-semibold">Quản Lý Số dư</div>
      <Alert
        message="Chu kỳ sao kê thay đổi từ tuần thành ngày và số dư thanh toán sẽ cộng vào Số dư tài khoản mỗi ngày. Bạn có thể rút số dư của mình một lần mỗi ngày tại trang Ví của tôi."
        showIcon
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white p-8 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold">Tổng số dư</div>
            <div className="text-primary cursor-pointer">
              Tìm hiểu thêm về số dư của bạn
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-semibold text-primary">0.00</div>
              <div>VND</div>
            </div>
            <Button type="primary">Rút tiền</Button>
          </div>
          <div className="bg-slate-100 rounded-md p-4">
            Tổng số dư sẽ được tự động chuyển vào tài khoản ngân hàng của NBH 1
            lần/tuần. NBH có thể chủ động rút tiền theo nhu cầu 1 lần/ngày.
          </div>
        </div>
        <div className="col-span-1 bg-white p-4 rounded-lg">
          <div className="bg-white shadow-md rounded-xl p-4">
            <div className="flex itemc-center justify-between">
              <div className="text-xl font-semibold">Tài khoản ngân hàng</div>
              <Link
                to="/supplier/myBank"
                className="flex items-center space-x-2 text-primary hover:no-underline"
              >
                <div>Quản lý Tài khoản Ngân hàng</div>
                <FaChevronRight />
              </Link>
            </div>
            <div className="flex justify-end py-2 pt-4">
              <img src={logoPrimary} alt="logo" className="h-6 flex" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FcSimCardChip size={70} />
                <LuNfc size={40} />
              </div>
              <div>
                <div>****6201</div>
                <div>TIEN PHONG BANK - NHTMCP TIEN PHONG</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <div className="text-xl font-semibold">Danh sách giao dịch</div>
        <div className="text-gray-500">
          Bạn có thể kiểm tra danh sách lịch sử giao dịch trong vòng 180 ngày
          gần nhất, để kiểm tra lịch sử giao dịch trong khoảng thời gian khác,
          bạn có thể chọn khoảng thời gian tương ứng.
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
            dataSource={data}
            pagination={{ pageSize: 10 }}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierTransaction;
