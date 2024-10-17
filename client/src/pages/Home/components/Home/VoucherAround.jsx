import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Rate } from "antd";

import { GiShop } from "react-icons/gi";
import { FaChevronRight } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

import { Hero } from "../../../../assets/img";
import { getNearVoucher } from "../../../../api/voucher";

const VoucherAround = () => {
  const { latitude, longitude } = useSelector((state) => state?.location);

  const [vouchers, setVouchers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchVouchers = async () => {
        try {
          const data = await getNearVoucher(longitude, latitude);
          if (data) {
            setVouchers(data);
          }
        } catch (error) {
          console.error("Error fetching vouchers:", error);
        }
      };

      fetchVouchers();
    }
  }, [latitude, longitude]);

  // Nếu không có tọa độ, không hiển thị component
  if (!latitude || !longitude) {
    return null;
  }

  const handleShowMore = () => {
    // Tăng số voucher hiển thị thêm 2 mỗi lần bấm "Xem thêm"
    setVisibleCount((prevCount) => prevCount + 2);
  };

  return (
    <div className="py-4 flex flex-col">
      <div className="text-2xl font-semibold">
        <div>Danh sách voucher quanh đây</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {vouchers.length > 0 ? (
          vouchers.slice(0, visibleCount).map((voucher) => (
            <div
              key={voucher.id}
              className="flex flex-wrap space-x-4 space-y-4 py-4"
            >
              <div className="flex items-center justify-center space-x-2">
                <div className="px-4">
                  <img
                    src={voucher.image || Hero}
                    alt={voucher.title}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <div>
                  <div>{voucher.title}</div>
                  <Rate
                    allowHalf
                    defaultValue={voucher.rating || 0} // Sử dụng rating thực tế
                    disabled
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 relative">
                  <img src={voucher.image || Hero} alt={voucher.title} />
                  <div className="absolute bottom-1 left-1 space-x-2 flex bg-black bg-opacity-50 px-2 py-1 rounded-xl text-white items-center">
                    <IoLocationSharp className="text-primary" />
                    <div>{voucher.addresses[0]?.distance || "?"} km</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {voucher.images?.slice(0, 2).map((img, index) => (
                    <img
                      key={index}
                      src={img || Hero}
                      alt={`voucher-${index}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <GiShop className="text-primary" />
                <div>Xem tất cả cửa hàng</div>
                <FaChevronRight />
              </div>
            </div>
          ))
        ) : (
          <div>Không có voucher nào gần đây</div>
        )}
      </div>

      {vouchers.length > visibleCount && (
        <div
          className="flex w-full text-primary justify-center cursor-pointer"
          onClick={handleShowMore}
        >
          Xem thêm
        </div>
      )}
    </div>
  );
};

export default VoucherAround;
