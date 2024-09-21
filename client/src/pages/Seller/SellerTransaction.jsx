import React from "react";

import { FaChevronRight } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";

const SellerTransaction = () => {
  return (
    <div className="w-full h-full p-8 flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <IoWallet className="text-xl" />
        <div>Tài Chính</div>
        <FaChevronRight />
        <div>Ví Của Tôi</div>
      </div>

      <div className="text-xl font-semibold">Quản Lý Số dư</div>
    </div>
  );
};

export default SellerTransaction;
