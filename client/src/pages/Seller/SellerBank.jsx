import React from "react";

import { IoWallet } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";

const SellerBank = () => {
  return (
    <div className="w-full h-full p-4 flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <IoWallet className="text-xl" />
        <div>Tài Chính</div>
        <FaChevronRight />
        <div>Tài khoản ngân hàng</div>
      </div>
      <div className="text-xl font-semibold">Tài khoản ngân hàng</div>
      <div className="bg-white p-4 rounded-lg">a</div>
    </div>
  );
};

export default SellerBank;
