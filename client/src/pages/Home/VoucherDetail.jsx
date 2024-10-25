import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Carousel, Image, Rate } from "antd";

import { FaChevronRight } from "react-icons/fa";
import { MdVerified, MdGpsFixed } from "react-icons/md";

import { buttonClick } from "../../animations";
import { getVoucherByID } from "../../api/voucher";
import { Logo } from "../../assets/img";

const VoucherDetail = () => {
  const { id } = useParams();
  const [voucher, setVoucher] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedModal, setSelectedModal] = useState(null);

  useEffect(() => {
    const fetchVoucher = async () => {
      const data = await getVoucherByID(id);
      setVoucher(data);

      // Thiết lập mặc định phân loại là cái đầu tiên nếu có
      if (data && data.modals && data.modals.length > 0) {
        setSelectedModal(data.modals[0]);
      }
    };

    fetchVoucher();
  }, [id]);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddressClick = (lon, lat) => {
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    window.open(url, "_blank");
  };

  if (!voucher) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1400px] w-full flex flex-col mx-auto p-4">
      <div className="flex items-center space-x-4 text-lg font-semibold">
        <div>Voucher</div>
        <FaChevronRight className="text-gray-500" />
        <div>Detail</div>
      </div>

      <div className="py-4 flex space-x-4 items-center">
        <div className="text-gray-400">Được bán bởi</div>
        <div>{voucher.sellerName}</div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-primary rounded-xl px-2">
            <img src={Logo} alt="logo" className="h-6 w-12" />
            <div className="text-white font-mono">Mall</div>
          </div>
          <div className="flex items-center space-x-2">
            <MdVerified className="text-primary" />
            <div className="text-primary font-bold">Đã xác thực</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center border rounded-xl">
          <Carousel autoplay className="w-full max-w-2xl">
            {voucher.image && voucher.medias.length > 0 ? (
              voucher.medias.map((media, index) => (
                <Image
                  key={media.id}
                  src={media.url}
                  alt={`Voucher ${index + 1}`}
                  className="object-cover rounded-xl"
                />
              ))
            ) : (
              <div>No images available</div>
            )}
          </Carousel>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={voucher.brandImage}
              alt="brand"
              className="w-16 h-16 object-cover rounded-full"
            />
            <div className="text-2xl font-semibold">{voucher.title}</div>
          </div>

          <div className="flex items-center space-x-2">
            <Rate allowHalf defaultValue={voucher.rating || 0} disabled />
            <div className="text-primary">{voucher.rating} đánh giá</div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-gray-400">Thương hiệu: </div>
            <span className="text-primary">{voucher.brandName} | </span>
            <Link to={""} className="text-primary">
              Xem thêm về {voucher.brandName}
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <div>
              <div className="font-semibold text-primary text-3xl">
                {selectedModal && selectedModal.sellPrice
                  ? `${selectedModal.sellPrice} đ`
                  : "Giá chưa cập nhật"}
              </div>
              {selectedModal && selectedModal.originalPrice && (
                <div className="flex items-center space-x-2">
                  <div className="line-through text-gray-400">
                    {selectedModal.originalPrice} đ
                  </div>
                  <div>
                    {((selectedModal.sellPrice - selectedModal.originalPrice) /
                      selectedModal.originalPrice) *
                      100}
                    %
                  </div>
                </div>
              )}
            </div>
            <motion.div
              {...buttonClick}
              className="bg-primary text-white px-4 py-2 rounded-xl cursor-pointer"
            >
              Xem biến động giá
            </motion.div>
          </div>

          <div className="">
            <div className="flex items-center space-x-2">
              <div>Phân loại:</div>
              <div>
                {selectedModal ? selectedModal.title : "Chọn phân loại"}
              </div>
            </div>
            <div className="flex items-center space-x-2 pl-20 py-2">
              {voucher.modals && voucher.modals.length > 0 ? (
                voucher.modals.map((modal) => (
                  <div
                    key={modal.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedModal(modal)} // Cập nhật khi nhấn vào
                  >
                    <img
                      src={modal.image}
                      alt={modal.title}
                      className="w-12 h-12 object-cover"
                    />
                  </div>
                ))
              ) : (
                <div>Không có phân loại</div>
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="text-gray-500">Số lượng</div>
            <div className="flex items-center space-x-4">
              <div
                className="px-4 py-2 cursor-pointer border bg-slate-100 hover:bg-white"
                onClick={decrementQuantity}
              >
                -
              </div>
              <div>{quantity}</div>
              <div
                className="px-4 py-2 cursor-pointer border bg-slate-200 hover:bg-white"
                onClick={incrementQuantity}
              >
                +
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            <motion.div
              {...buttonClick}
              className="flex bg-primary text-white py-2 rounded-xl cursor-pointer text-nowrap items-center justify-center"
            >
              Mua ngay
            </motion.div>
            <motion.div
              {...buttonClick}
              className="flex bg-primary text-white py-2 rounded-xl cursor-pointer text-nowrap items-center justify-center"
            >
              Thêm vào giỏ hàng
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-4 space-y-4">
        <div className="font-semibold text-lg">Điều kiện sử dụng</div>
        <div dangerouslySetInnerHTML={{ __html: voucher.description }}></div>

        <div className="font-semibold text-lg">Địa chỉ cửa hàng</div>
        <div className="max-h-52 overflow-y-scroll space-y-2">
          {voucher.addresses && voucher.addresses.length > 0 ? (
            voucher.addresses.map((address) => (
              <div
                key={address.id}
                className="flex items-center space-x-2 bg-slate-200 bg-opacity-60 px-4 py-2 rounded-xl cursor-pointer"
                onClick={() => handleAddressClick(address.lon, address.lat)}
              >
                <MdGpsFixed />
                <div>{address.name}</div>
              </div>
            ))
          ) : (
            <div>No addresses available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherDetail;
