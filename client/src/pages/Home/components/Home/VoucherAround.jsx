import React from "react";
import { Rate } from "antd";

import { GiShop } from "react-icons/gi";
import { FaChevronRight } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

import { Hero, Test } from "../../../../assets/img";

const vouchers = [
  {
    id: 1,
    name: "Katinat Saigon Kafe - Hoàng Diệu 2",
    rating: 3.8,
    distance: "6.44 km",
  },
  {
    id: 2,
    name: "Highlands Coffee - Lê Văn Việt",
    rating: 4.5,
    distance: "5.12 km",
  },
  {
    id: 3,
    name: "The Coffee House - Phạm Văn Đồng",
    rating: 4.2,
    distance: "3.25 km",
  },
  {
    id: 4,
    name: "Starbucks - Vincom Thủ Đức",
    rating: 4.8,
    distance: "7.85 km",
  },
];

const VoucherAround = () => {
  return (
    <div className="py-4 flex flex-col">
      <div className="text-2xl font-semibold">
        <div>Danh sách voucher quanh đây</div>
      </div>

      <div className="grid grid-cols-2">
        {vouchers.map((voucher) => (
          <div
            key={voucher.id}
            className="flex flex-wrap space-x-4 space-y-4 py-4"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="px-4">
                <img src={Test} alt="" className="w-16 h-16 rounded-full" />
              </div>
              <div>
                <div>{voucher.name}</div>
                <Rate allowHalf defaultValue={voucher.rating} disabled />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 relative">
                <img src={Hero} alt="" />
                <div className="absolute bottom-1 left-1 space-x-2 flex bg-black bg-opacity-50 px-2 py-1 rounded-xl text-white items-center">
                  <IoLocationSharp className="text-primary" />
                  <div>{voucher.distance}</div>
                </div>
              </div>
              <div className="space-y-2">
                <img src={Hero} alt="" />
                <img src={Hero} alt="" />
              </div>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <GiShop className="text-primary" />
              <div>Xem tất cả cửa hàng</div>
              <FaChevronRight />
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full text-primary justify-center cursor-pointer">
        Xem thêm
      </div>
    </div>
  );
};

export default VoucherAround;
