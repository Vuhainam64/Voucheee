import React from "react";
import { Link } from "react-router-dom";

import { FaArrowTrendUp } from "react-icons/fa6";

import { Hero, Test } from "../../../../assets/img";
import { FoodBackground } from "../../../../assets/img/ads";

const BestSell = () => {
  return (
    <div className="relative flex w-full">
      <img
        src={FoodBackground}
        alt="FoodBackground"
        className="w-full h-650 object-cover"
      />
      <div className="absolute flex top-0 left-0 w-full h-full bg-black bg-opacity-50 justify-center">
        <div className="flex flex-col max-w-[1400px] w-full p-4 space-y-8">
          <div className="flex items-center py-2 px-4">
            <div className="flex space-x-4 items-center px-4 py-2 rounded-3xl border-2 border-white">
              <FaArrowTrendUp className="text-red-600 text-2xl" />
              <div className="text-white font-semibold text-xl">
                Sản phẩm bán chạy nhất
              </div>
            </div>
          </div>
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
                        <img
                          src={Test}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <div>Thai Express - Món Thái - 8 chi nhánh</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-white">
                    Voucher giảm 120.000đ ăn tại nhà hàng
                  </div>
                  <div className="text-white">T2-CN 10:00-22:00</div>
                  <div className="font-semibold text-white">100.000đ</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSell;
