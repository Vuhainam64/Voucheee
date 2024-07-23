import React from "react";

import { AiFillProduct } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";

const SellerProduct = () => {
  return (
    <div className="w-full h-full p-8 flex flex-col">
      <div className="flex items-center space-x-2">
        <AiFillProduct className="text-xl" />
        <div>Sản Phẩm</div>
        <FaChevronRight />
        <div>Quản Lý Sản Phẩm</div>
      </div>

      {/* code ở đây  */}
    </div>
  );
};

export default SellerProduct;
