import React from "react";
import { Link } from "react-router-dom";

import { Hero, Test } from "../../../../assets/img";

const NewVoucher = () => {
  return (
    <div className="space-y-4 py-4">
      <div className="text-2xl font-semibold">Sản phẩm mới</div>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Link
              to={"/detail/1"}
              className="flex flex-col space-y-1 flex-shrink-0 hover:no-underline hover:text-primary"
              key={index}
            >
              <div className="relative">
                <img src={Hero} alt="" className="h-40 w-80 rounded-xl" />
                <div className="bg-black h-40 w-80 rounded-xl opacity-10 absolute top-0 left-0"></div>
                <div className="absolute px-2 py-1 rounded-xl bg-primary text-white top-2 left-2">
                  Giảm 25%
                </div>
                <div className="absolute px-2 py-1 rounded-xl bottom-2 left-2">
                  <div className="flex items-center justify-center text-white">
                    <img src={Test} alt="" className="w-8 h-8 rounded-full" />
                    <div>Thai Express - Món Thái - 8 chi nhánh</div>
                  </div>
                </div>
              </div>
              <div>Voucher giảm 120.000đ ăn tại nhà hàng</div>
              <div>T2-CN 10:00-22:00</div>
              <div className="font-semibold">100.000đ</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewVoucher;
