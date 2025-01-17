import React from "react";
import { Alert } from "antd";

import { IoWallet } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";

import { BankInfor, ListTransaction } from "./components/SupplierTransaction";

const SupplierTransaction = () => {
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

      <BankInfor />

      <ListTransaction />
    </div>
  );
};

export default SupplierTransaction;
