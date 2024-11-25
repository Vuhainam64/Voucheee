import React from "react";
import { Link } from "react-router-dom";

import { Hero, Test } from "../../assets/img";

import {
  Category,
  PriceRange,
  SortBy,
  Supplier,
} from "./components/SearchProduct";

const SearchProduct = () => {
  return (
    <div className="bg-gray-100 flex-grow">
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-4 gap-4 py-4">
        <div className="space-y-4">
          {/* Danh mục */}
          <Category />

          {/* Thương hiệu */}
          <Supplier />

          {/* Khoảng giá */}
          <PriceRange />
        </div>

        {/* Kết quả tìm kiếm */}
        <div className="col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-lg flex items-center justify-between">
            <div className="font-bold">Tìm thấy 100 kết quả</div>
            <SortBy />
          </div>

          {/* Card sản phẩm */}
          <div
            className="grid grid-cols-4 gap-4 overflow-y-auto scrollbar-none"
            style={{ maxHeight: "calc(100vh - 298px)" }}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <Link
                to={`/detail/${index + 1}`}
                key={index}
                className="bg-white rounded-lg shadow-lg flex flex-col hover:no-underline"
              >
                <div className="relative">
                  <img
                    src={Hero}
                    alt=""
                    className="h-40 w-full object-cover rounded-t-lg"
                  />
                  <div className="bg-black h-full w-full rounded-t-lg opacity-10 absolute top-0 left-0"></div>
                  <div className="absolute px-2 py-1 rounded-xl bg-primary text-white top-2 left-2">
                    Giảm 25%
                  </div>
                  <div className="absolute px-2 py-1 rounded-xl bottom-2 left-2">
                    <div className="flex items-center justify-center text-white">
                      <img src={Test} alt="" className="w-8 h-8 rounded-full" />
                      <div className="ml-2">
                        Thai Express - Món Thái - 8 chi nhánh
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <div className="text-gray-800">
                    Voucher giảm 120.000đ ăn tại nhà hàng
                  </div>
                  <div className="text-gray-600">T2-CN 10:00-22:00</div>
                  <div className="font-semibold text-lg text-primary">
                    100.000đ
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
