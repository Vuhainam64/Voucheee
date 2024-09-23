import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Carousel, Image, Rate } from "antd";

import { FaChevronRight } from "react-icons/fa";
import { MdVerified, MdGpsFixed } from "react-icons/md";

import { Hero, Logo, Test } from "../../assets/img";
import { buttonClick } from "../../animations";

const VoucherDetail = () => {
  return (
    <div className="max-w-[1400px] w-full flex flex-col mx-auto p-4">
      <div className="flex items-center space-x-4 text-lg font-semibold">
        <div>Voucher</div>
        <FaChevronRight className="text-gray-500" />
        <div>Detail</div>
      </div>

      <div className="py-4 flex space-x-4 items-center">
        <div className="text-gray-400">Được bán bởi</div>
        <div>KEBETEME</div>
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

      <div className="grid grid-cols-2 gap-4 ">
        <div className="flex items-center justify-center border rounded-xl">
          <Carousel autoplay className="w-full max-w-2xl">
            {Array.from({ length: 3 }).map((_, index) => (
              <Image
                src={Hero}
                alt={`Voucher ${index + 1}`}
                className="object-cover rounded-xl"
              />
            ))}
          </Carousel>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={Test}
              alt=""
              className="w-16 h-16 object-cover rounded-full"
            />
            <div className="text-2xl font-semibold">
              Phiếu quà tặng ẩm thực MaybeLine
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Rate allowHalf defaultValue={3.8} disabled />
            <div className="text-primary">949 đánh giá</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-gray-400">Thương hiệu: </div>
            <span className="text-primary">MaybeLine | </span>
            <Link to={""} className="text-primary">
              Xem thêm về MaybeLine
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <div>
              <div className="font-semibold text-primary text-3xl">
                50.000 đ
              </div>
              <div className="flex items-center space-x-2">
                <div className="line-through text-gray-400">100.000 đ</div>
                <div>-50%</div>
              </div>
            </div>
            <motion.div
              {...buttonClick}
              className="bg-primary text-white px-4 py-2 rounded-xl
              cursor-pointer"
            >
              Xem biến động giá
            </motion.div>
          </div>
          <div className="flex space-x-4">
            <div className="text-gray-500">Ưu đãi</div>
            <div>
              <div>Giảm 10% khi mua từ 5</div>
              <div>Giảm 20% khi mua từ 10</div>
              <div>Giảm 30% khi mua từ 15</div>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="text-gray-500">Số lượng</div>
            <div className="flex items-center space-x-4">
              <div
                className="px-4 py-2 cursor-pointer border bg-slate-100
                hover:bg-white"
              >
                -
              </div>
              <div>1</div>
              <div
                className="px-4 py-2 cursor-pointer border bg-slate-200
                hover:bg-white"
              >
                +
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            <motion.div
              {...buttonClick}
              className="flex bg-primary text-white py-2 rounded-xl
          cursor-pointer text-nowrap items-center justify-center"
            >
              Mua ngay
            </motion.div>
            <motion.div
              {...buttonClick}
              className="flex bg-primary text-white py-2 rounded-xl
            cursor-pointer text-nowrap items-center justify-center"
            >
              Thêm vào giỏ hàng
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-4 space-y-4">
        <div className="font-semibold text-lg">Điều kiện sử dụng</div>
        <div>
          - Mã eGift do Circle K phát hành, nhân viên cửa hàng thao tác theo
          phương thức tương ứng trên máy POS. - eGift có thể sử dụng tại hệ
          thống cửa hàng Circle K trên Toàn Quốc. - Quý khách có thể sử dụng
          nhiều eGift trên cùng 1 hoá đơn. - eGift không được áp dụng cùng các
          chương trình khuyến mãi khác. - eGift chỉ áp dụng cho sản phẩm nước
          đóng chai Fanta 600ml, không áp dụng quy đổi ra các sản phẩm khác. -
          eGift chỉ có giá trị sử dụng một lần. Không chấp nhận eGift quá hạn sử
          dung, trạng thái “Đã sử dụng”. - Vui lòng xuất trình mã eGift cho nhân
          viên và có mặt trực tiếp tại quầy trước khi thanh toán để được áp dụng
          eGift. - eGift sẽ không được hoàn lại tiền thừa và không có giá trị
          quy đổi thành tiền mặt. Khách hàng có thể được yêu cầu trả thêm tiền
          nếu sử dụng quá giá trị của eGift. - Khách hàng có trách nhiệm bảo mật
          thông tin eGift sau khi đặt mua. UrBox sẽ không chịu trách nhiệm hoàn
          trả các eGift bị mất hoặc ở trạng thái “Đã sử dụng” sau thời gian
          eGift được xuất ra với bất kì lý do gì. - UrBox không chịu trách nhiệm
          đối với chất lượng của sản phẩm hoặc dịch vụ được cung cấp cũng như
          đối với các tranh chấp về sau giữa khách hàng và Circle K. - UrBox có
          quyền sửa chữa hoặc thay đổi điều khoản và điều kiện mà không thông
          báo trước. - Quý khách vui lòng liên hệ Hotline UrBox: 1900 299 232
          (từ 8h-22h hàng ngày, bao gồm lễ tết) để được hỗ trợ.
        </div>

        <div className="font-semibold text-lg">Chú ý</div>
        <div>
          • Phiếu quà tặng được áp dụng như tiền mặt khi thanh toán sau khi dùng
          bữa tại chuỗi hệ thống A Mà Kitchen. • Mỗi voucher chỉ được sử dụng 1
          lần và chỉ áp dụng trên một hóa đơn, không áp dụng tách hóa đơn. • Có
          thể áp dụng nhiều voucher trên 1 hóa đơn. • Có thể áp dụng chung với
          các chương trình khuyến mãi tặng món khác, nhưng không áp dụng đồng
          thời với các chương trình giảm giá khác tại nhà hàng. • Voucher không
          có giá trị quy đổi thành tiền và không hoàn trả tiền thừa. • Khách
          hàng có trách nhiệm bảo mật thông tin mã thẻ quà tặng sau khi đặt mua.
          Giftpop sẽ không chịu trách nhiệm hoàn trả các mã thẻ bị mất hoặc ở
          trạng thái "Đã sử dụng" với bất kỳ lý do gì. • Giftpop sẽ không chịu
          trách nhiệm đối với chất lượng sản phẩm hoặc dịch vụ được cung cấp
          cũng như đối với các tranh chấp về sau giữa khách hàng và nhà cung
          cấp. • Giftpop có quyền sửa chữa hoặc thay đổi điều khoản và điều kiện
          sử dụng mà không thông báo trước. • Hotline Giftpop: 1900 55 88 12.
        </div>

        <div className="font-semibold text-lg">Địa chỉ cửa hàng</div>
        <div className="max-h-52 overflow-y-scroll space-y-2">
          <div
            className="flex items-center space-x-2 bg-slate-200 bg-opacity-60
          px-4 py-2 rounded-xl"
          >
            <MdGpsFixed />
            <div>31 Trần Quốc Hoàn, P.Dịch Vọng Hậu, Q.Cầu Giấy, TP.Hà Nội</div>
          </div>
          <div
            className="flex items-center space-x-2 bg-slate-200 bg-opacity-60
          px-4 py-2 rounded-xl"
          >
            <MdGpsFixed />
            <div>31 Trần Quốc Hoàn, P.Dịch Vọng Hậu, Q.Cầu Giấy, TP.Hà Nội</div>
          </div>
          <div
            className="flex items-center space-x-2 bg-slate-200 bg-opacity-60
          px-4 py-2 rounded-xl"
          >
            <MdGpsFixed />
            <div>31 Trần Quốc Hoàn, P.Dịch Vọng Hậu, Q.Cầu Giấy, TP.Hà Nội</div>
          </div>
          <div
            className="flex items-center space-x-2 bg-slate-200 bg-opacity-60
          px-4 py-2 rounded-xl"
          >
            <MdGpsFixed />
            <div>31 Trần Quốc Hoàn, P.Dịch Vọng Hậu, Q.Cầu Giấy, TP.Hà Nội</div>
          </div>
          <div
            className="flex items-center space-x-2 bg-slate-200 bg-opacity-60
          px-4 py-2 rounded-xl"
          >
            <MdGpsFixed />
            <div>31 Trần Quốc Hoàn, P.Dịch Vọng Hậu, Q.Cầu Giấy, TP.Hà Nội</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherDetail;
