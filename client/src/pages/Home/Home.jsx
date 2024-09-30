import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "antd";

import { Hero, Test } from "../../assets/img";
import { Highland } from "../../assets/img/ads";

import {
  BestSell,
  Category,
  NewVoucher,
  TopBrands,
  VoucherAround,
} from "./components/Home";

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-between bg-gray-100">
      {/* hero  */}
      <div className="w-full">
        <Carousel autoplay className="w-full" arrows>
          {Array.from({ length: 3 }).map((_, index) => (
            <img
              key={index}
              src={Hero}
              alt={`Voucher ${index + 1}`}
              className="w-full h-[400px]"
            />
          ))}
        </Carousel>
      </div>
      <div className="relative flex flex-col items-center justify-between bg-gray-100">
        <div className="max-w-[1400px] w-full">
          {/* Category */}
          <Category />

          {/* ads1 */}
          <div className="grid grid-cols-4 gap-4 py-2 pb-4">
            <img
              src="https://cdn.divineshop.vn/image/catalog/Banner/Steam-81087.png?hash=1726310734"
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
            <img
              src="https://cdn.divineshop.vn/image/catalog/Banner/ThietKe-48131.png?hash=1726310759"
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
            <img
              src="https://cdn.divineshop.vn/image/catalog/Banner/Spotify-47012.png?hash=1726310711"
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
            <img
              src="https://cdn.divineshop.vn/image/catalog/Banner/Microsoft%20Office%20(1)-58723.png?hash=1726310804"
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          {/* Content scroll */}
          <div>
            <div className="text-2xl font-semibold">
              Voucher "xịn" ai cũng mê
            </div>
            <div className="text-md">
              Cam kết hoàn tiền nếu voucher sử dụng không đúng như mô tả
            </div>
            <div
              className="py-4 flex space-x-4 overflow-x-scroll w-full scrollbar-thin
          scrollbar-thumb-primary scrollbar-track-gray-200"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Link
                  to={"/detail/1"}
                  className="flex flex-col space-y-1 flex-shrink-0 hover:no-underline
                hover:text-primary"
                  key={index}
                >
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
                        <img
                          src={Test}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
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

          {/* Voucher around  */}
          <VoucherAround />
        </div>
      </div>

      {/* Best Sell  */}
      <BestSell />

      {/* New Voucher  */}
      <NewVoucher />

      {/* Top Brand  */}
      <TopBrands />

      {/* ads  */}
      <div className="absolute mt-[400px]">
        {/* Quảng cáo bên trái */}
        <Link
          to={
            "https://go.isclix.com/deep_link/v5/6027307678927679830/5979386823886321997?sub4=oneatweb&url_enc=aHR0cHM6Ly9wcm9tby5oaWdobGFuZHNjb2ZmZWUuY29tLnZuL3V1ZGFpNA%3D%3D"
          }
          className="fixed left-0 w-52 h-96 z-20 m-4 hidden xl:block"
        >
          <img
            src={Highland}
            alt="Quảng cáo bên trái"
            className="w-full h-full rounded-xl"
          />
        </Link>

        {/* Quảng cáo bên phải */}
        <Link
          to={
            "https://go.isclix.com/deep_link/v5/6027307678927679830/5979386823886321997?sub4=oneatweb&url_enc=aHR0cHM6Ly9wcm9tby5oaWdobGFuZHNjb2ZmZWUuY29tLnZuL3V1ZGFpNA%3D%3D"
          }
          className="fixed right-0 w-52 h-96 z-20 m-4 hidden xl:block"
        >
          <img
            src={Highland}
            alt="Quảng cáo bên phải"
            className="w-full h-full rounded-xl"
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
