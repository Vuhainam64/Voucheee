import React from "react";

import { BiTransferAlt } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa6";

const DisbursementHistory = () => {
  return (
    <div className="w-full h-full p-4 flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <BiTransferAlt className="text-xl" />
        <div>Giải ngân</div>
        <FaChevronRight />
        <div>Lịch sử giải ngân</div>
      </div>
    </div>
  );
};

export default DisbursementHistory;
