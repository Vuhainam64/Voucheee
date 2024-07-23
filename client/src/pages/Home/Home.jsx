import React from "react";
import { Rate } from "antd";

import { IoRestaurantOutline } from "react-icons/io5";
import { FaBoxOpen, FaChevronRight, FaGamepad } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { GiShop } from "react-icons/gi";

import { Hero, Test } from "../../assets/img";

const Home = () => {
  return (
    <div className="">
      {/* hero  */}
      <div className="grid grid-cols-3 gap-4 py-4">
        <div className="col-span-2">
          <img src={Hero} alt="hero" />
        </div>
        <div className="space-y-2">
          <img src={Hero} alt="hero" />
          <img src={Hero} alt="hero" />
        </div>
      </div>

      {/* Category */}
      <div className="flex items-center space-x-20 p-4">
        <div className="items-center justify-center space-y-4">
          <div className="flex items-center justify-center">
            <IoRestaurantOutline className="text-3xl" />
          </div>
          <div>Thức uống</div>
        </div>
        <div className="items-center justify-center space-y-4">
          <div className="flex items-center justify-center">
            <IoRestaurantOutline className="text-3xl" />
          </div>
          <div>Nhà hàng</div>
        </div>
        <div className="items-center justify-center space-y-4">
          <div className="flex items-center justify-center">
            <FaBoxOpen className="text-3xl" />
          </div>
          <div>Dồ dùng</div>
        </div>
        <div className="items-center justify-center space-y-4">
          <div className="flex items-center justify-center">
            <FaGamepad className="text-3xl" />
          </div>
          <div>Giải trí</div>
        </div>
        <div className="items-center justify-center space-y-4">
          <div className="flex items-center justify-center">
            <TbTruckDelivery className="text-3xl" />
          </div>
          <div>Giao hàng</div>
        </div>
      </div>

      {/* Content scroll */}
      <div>
        <div className="text-2xl font-semibold">Voucher "xịn" ai cũng mê</div>
        <div className="text-md">
          Cam kết hoàn tiền nếu voucher sử dụng không đúng như mô tả
        </div>
        <div
          className="py-4 flex space-x-4 overflow-x-scroll w-full 
        scrollbar-thumb-primary scrollbar-track-primary"
        >
          <div className="flex flex-col space-y-1 flex-shrink-0">
            <div className="relative">
              <div className="relative">
                <img src={Hero} alt="" className="h-40 w-80 rounded-xl" />
                <div
                  className="bg-black h-40 w-80 rounded-xl opacity-10 absolute
              top-0 left-0"
                ></div>
              </div>
              <div
                className="absolute px-2 py-1 rounded-xl bg-primary text-white
             top-2 left-2"
              >
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
          </div>
          <div className="flex flex-col space-y-1 flex-shrink-0">
            <div className="relative">
              <div className="relative">
                <img src={Hero} alt="" className="h-40 w-80 rounded-xl" />
                <div
                  className="bg-black h-40 w-80 rounded-xl opacity-10 absolute
              top-0 left-0"
                ></div>
              </div>
              <div
                className="absolute px-2 py-1 rounded-xl bg-primary text-white
             top-2 left-2"
              >
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
          </div>
          <div className="flex flex-col space-y-1 flex-shrink-0">
            <div className="relative">
              <div className="relative">
                <img src={Hero} alt="" className="h-40 w-80 rounded-xl" />
                <div
                  className="bg-black h-40 w-80 rounded-xl opacity-10 absolute
              top-0 left-0"
                ></div>
              </div>
              <div
                className="absolute px-2 py-1 rounded-xl bg-primary text-white
             top-2 left-2"
              >
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
          </div>
          <div className="flex flex-col space-y-1 flex-shrink-0">
            <div className="relative">
              <div className="relative">
                <img src={Hero} alt="" className="h-40 w-80 rounded-xl" />
                <div
                  className="bg-black h-40 w-80 rounded-xl opacity-10 absolute
              top-0 left-0"
                ></div>
              </div>
              <div
                className="absolute px-2 py-1 rounded-xl bg-primary text-white
             top-2 left-2"
              >
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
          </div>
        </div>
      </div>

      {/* Item list  */}
      <div className="py-4 flex flex-col">
        <div className="text-2xl font-semibold">
          <div>Danh sách voucher quanh đây</div>
          <div className="border-b-4 border-primary w-60 py-1"></div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-wrap space-x-4 space-y-4 py-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="px-4">
                <img src={Test} alt="" className="w-16 h-16 rounded-full" />
              </div>
              <div>
                <div>Katinat Saigon Kafe - Hoàng Diệu 2</div>
                <Rate allowHalf defaultValue={3.8} disabled />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 relative">
                <img src={Hero} alt="" />
                <div
                  className="absolute bottom-1 left-1 space-x-2 flex bg-black
                bg-opacitya-50 px-2 py-1 rounded-xl text-white items-center"
                >
                  <IoLocationSharp className="text-primary" />
                  <div>6.44 km</div>
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

          <div className="flex flex-wrap space-x-4 space-y-4 py-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="px-4">
                <img src={Test} alt="" className="w-16 h-16 rounded-full" />
              </div>
              <div>
                <div>Katinat Saigon Kafe - Hoàng Diệu 2</div>
                <Rate allowHalf defaultValue={3.8} disabled />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 relative">
                <img src={Hero} alt="" />
                <div
                  className="absolute bottom-1 left-1 space-x-2 flex bg-black
                bg-opacitya-50 px-2 py-1 rounded-xl text-white items-center"
                >
                  <IoLocationSharp className="text-primary" />
                  <div>6.44 km</div>
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
          <div className="flex flex-wrap space-x-4 space-y-4 py-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="px-4">
                <img src={Test} alt="" className="w-16 h-16 rounded-full" />
              </div>
              <div>
                <div>Katinat Saigon Kafe - Hoàng Diệu 2</div>
                <Rate allowHalf defaultValue={3.8} disabled />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 relative">
                <img src={Hero} alt="" />
                <div
                  className="absolute bottom-1 left-1 space-x-2 flex bg-black
                bg-opacitya-50 px-2 py-1 rounded-xl text-white items-center"
                >
                  <IoLocationSharp className="text-primary" />
                  <div>6.44 km</div>
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
          <div className="flex flex-wrap space-x-4 space-y-4 py-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="px-4">
                <img src={Test} alt="" className="w-16 h-16 rounded-full" />
              </div>
              <div>
                <div>Katinat Saigon Kafe - Hoàng Diệu 2</div>
                <Rate allowHalf defaultValue={3.8} disabled />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 relative">
                <img src={Hero} alt="" />
                <div
                  className="absolute bottom-1 left-1 space-x-2 flex bg-black
                bg-opacitya-50 px-2 py-1 rounded-xl text-white items-center"
                >
                  <IoLocationSharp className="text-primary" />
                  <div>6.44 km</div>
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
          {/* ddd */}
        </div>
      </div>
    </div>
  );
};

export default Home;
