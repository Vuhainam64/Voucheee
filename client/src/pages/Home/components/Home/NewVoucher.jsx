import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tag, Tooltip } from "antd";

import { getNewestVoucher } from "../../../../api/voucher";

const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const NewVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const { latitude, longitude } = useSelector((state) => state?.location);

  const fetchVouchers = async () => {
    const data = await getNewestVoucher();
    if (data) setVouchers(data);
  };

  const getClosestDistance = (addresses) => {
    if (!latitude || !longitude) return null;

    let minDistance = null;
    addresses.forEach((address) => {
      if (address.lat && address.lon) {
        const distance = getDistance(
          latitude,
          longitude,
          address.lat,
          address.lon
        );
        if (minDistance === null || distance < minDistance) {
          minDistance = distance;
        }
      }
    });
    return minDistance ? `${minDistance.toFixed(2)} km` : null;
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  return (
    <div className="space-y-4 py-4 max-w-[1400px] w-full">
      <div className="flex flex-col items-center space-y-4">
        <div className="text-2xl font-semibold">Sản phẩm mới</div>
        <div className="grid grid-cols-4 gap-4">
          {vouchers.map((voucher) => (
            <Link
              to={`detail/${voucher.id}`}
              className="flex flex-col space-y-1 flex-shrink-0 hover:no-underline hover:text-primary"
              key={voucher.id}
            >
              <div className="relative">
                <img
                  src={voucher.image}
                  alt=""
                  className="h-40 w-80 rounded-xl"
                />
                <div className="bg-black h-40 w-80 rounded-xl opacity-10 absolute top-0 left-0"></div>
                {voucher.percentDiscount && (
                  <div className="absolute px-2 py-1 rounded-xl bg-primary text-white top-2 left-2">
                    Giảm {voucher.percentDiscount}%
                  </div>
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
                        {voucher.title.length > 33
                          ? `${voucher.title.slice(0, 33)}...`
                          : voucher.title}
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="font-semibold">
                Giá bán:{" "}
                {voucher.salePrice != null
                  ? voucher.salePrice.toLocaleString("vi-VN")
                  : voucher.originalPrice != null
                  ? voucher.originalPrice.toLocaleString("vi-VN")
                  : "Không có giá"}
                đ
              </div>

              {/* {voucher.addresses && (
                <div>
                  Khoảng cách:{" "}
                  {getClosestDistance(voucher.addresses) || "Không có tọa độ"}
                </div>
              )} */}
              <div>
                {voucher.categories.map((category, index) => (
                  <Tag key={index} color="blue" bordered={false}>
                    {category.title}
                  </Tag>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewVoucher;
