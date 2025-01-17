import React from "react";

import { IncomePayment } from "./components/SupplierIncome";
import { IoWallet } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { BankInfor } from "./components/SupplierTransaction";

const SupplierIncome = () => {
  return (
    <div className="space-y-4 p-8">
      <div className="flex items-center space-x-2">
        <IoWallet className="text-xl" />
        <div>Tài Chính</div>
        <FaChevronRight />
        <div>Thu nhập của tôi</div>
      </div>
      <BankInfor />
      <IncomePayment />
    </div>
  );
};

export default SupplierIncome;
