import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";

import { FaArrowTrendUp } from "react-icons/fa6";

import { FoodBackground } from "../../../../assets/img/ads";
import { getBestSold } from "../../../../api/voucher";

const BestSell = () => {
  const [bestSold, setBestSold] = useState([]);

  const fetchBestSold = async () => {
    const data = await getBestSold();
    if (data) setBestSold(data);
  };

  useEffect(() => {
    fetchBestSold();
  }, []);

  return (
    <div className="relative flex w-full">
      <img
        src={FoodBackground}
        alt="FoodBackground"
        className="w-full h-650 object-cover"
      />
      <div className="absolute flex top-0 left-0 w-full h-full bg-black bg-opacity-50 justify-center">
        <div className="flex flex-col max-w-[1400px] w-full p-4 space-y-8">
          {/* Tiêu đề */}
          <div className="flex items-center py-2 px-4">
            <div className="flex space-x-4 items-center px-4 py-2 rounded-3xl border-2 border-white">
              <FaArrowTrendUp className="text-red-600 text-2xl" />
              <div className="text-white font-semibold text-xl">
                Sản phẩm bán chạy nhất
              </div>
            </div>
          </div>

          {/* Danh sách voucher */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-4 gap-4">
              {bestSold.map((voucher) => (
                <Link
                  to={`/detail/${voucher.id}`}
                  className="flex flex-col space-y-1 flex-shrink-0 hover:no-underline hover:text-primary"
                  key={voucher.id}
                >
                  <div className="relative">
                    <img
                      src={voucher.image}
                      alt={voucher.title}
                      className="h-40 w-80 rounded-xl object-cover"
                    />
                    <div className="bg-black h-40 w-80 rounded-xl opacity-10 absolute top-0 left-0"></div>
                    {voucher.salePrice ? (
                      <div className="absolute px-2 py-1 rounded-xl bg-primary text-white top-2 left-2">
                        Giảm{" "}
                        {Math.round(
                          ((voucher.originalPrice - voucher.salePrice) /
                            voucher.originalPrice) *
                            100
                        )}
                        %
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="absolute px-2 py-1 rounded-xl bottom-2 left-2">
                      <div className="flex items-center justify-center text-white space-x-4">
                        <img
                          src={voucher.brandImage}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <Tooltip title={voucher.title}>
                          <div className="break-words whitespace-normal">
                            {voucher.title.length > 30
                              ? `${voucher.title.slice(0, 30)}...`
                              : voucher.title}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div className="text-white">
                    Đã bán: {voucher.totalQuantitySold}
                  </div>
                  <div className="font-semibold text-white">
                    Giá bán:{" "}
                    {voucher.salePrice
                      ? voucher.salePrice.toLocaleString("vi-VN")
                      : voucher.originalPrice.toLocaleString("vi-VN")}
                    đ
                  </div>
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
