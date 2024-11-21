import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { LuScanLine } from "react-icons/lu";

import { Momo } from "../../assets/img";
import { buttonClick } from "../../animations";
import { createOrder } from "../../api/order";

const Checkout = () => {
  const user = useSelector((state) => state.user?.user);
  const navigate = useNavigate();

  const [checkoutData, setCheckoutData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("checkoutResponse");
    const storedPaymentData = localStorage.getItem("checkoutData");
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
      setPaymentData(JSON.parse(storedPaymentData));
    }
  }, []);

  const handlePaymentWithMobileBanking = async () => {
    const createOrderRes = await createOrder(paymentData);
    if (createOrderRes.result) {
      toast.success(
        `🎉 ${createOrderRes.message}. Mã đơn hàng: ORD${createOrderRes.value}`
      );
      navigate(`/cart/payment?value=ORD${createOrderRes.value}`);
      console.log(createOrderRes.value);
    } else {
      toast.error(
        "⚠️ Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại.",
        createOrderRes.message
      );
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Thông tin thanh toán
      </h1>

      {checkoutData ? (
        <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
          {/* Thông tin người mua */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Thông tin người mua</h3>
            <p>Họ tên: {user.displayName}</p>
            <p>
              Email:{" "}
              {checkoutData.giftEmail ? checkoutData.giftEmail : user.email}
            </p>
          </div>

          {/* Thông tin tổng quan */}
          <h2 className="text-lg font-semibold mb-4">Tổng thanh toán</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <p>
              <span className="font-semibold">Tổng giá trị sản phẩm:</span>{" "}
              {checkoutData.totalPrice.toLocaleString()} VND
            </p>
            <p>
              <span className="font-semibold">Giảm giá toàn shop:</span>{" "}
              {checkoutData.shopDiscountPrice.toLocaleString()} VND
            </p>
            <p>
              <span className="font-semibold">Số lượng sản phẩm:</span>{" "}
              {checkoutData.totalQuantity}
            </p>
            <p>
              <span className="font-semibold">Sử dụng VPoint:</span>{" "}
              {checkoutData.useVPoint.toLocaleString()} VND
            </p>
            <p>
              <span className="font-semibold">Sử dụng số dư:</span>{" "}
              {checkoutData.useBalance.toLocaleString()} VND
            </p>
            <p>
              <span className="font-semibold">Tích lũy VPoint:</span>{" "}
              {checkoutData.vPointUp.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Số dư hiện tại:</span>{" "}
              {checkoutData.balance.toLocaleString()} VND
            </p>
            <p>
              <span className="font-semibold">VPoint hiện tại:</span>{" "}
              {checkoutData.vPoint.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Tổng thanh toán cuối:</span>{" "}
              <span className="text-blue-600 font-bold">
                {checkoutData.finalPrice.toLocaleString()} VND
              </span>
            </p>
          </div>

          {/* Thông tin shop */}
          {checkoutData.sellers.map((seller) => (
            <div
              key={seller.sellerId}
              className="mb-6 border-b pb-4 last:border-none"
            >
              <h3 className="text-lg font-semibold mb-2">
                {seller.sellerName}
              </h3>
              <img
                src={seller.sellerImage}
                alt={seller.sellerName}
                className="w-16 h-16 rounded-full mb-4"
              />

              {/* Thông tin khuyến mãi */}
              {seller.appliedPromotion && (
                <div className="p-4 bg-blue-50 rounded-md mb-4 shadow-sm">
                  <h4 className="font-semibold text-blue-600">
                    Khuyến mãi áp dụng: {seller.appliedPromotion.name}
                  </h4>
                  <p>
                    Giảm giá:{" "}
                    <span className="text-green-600 font-semibold">
                      {seller.appliedPromotion.percentDiscount
                        ? `${seller.appliedPromotion.percentDiscount}%`
                        : "Không áp dụng"}
                    </span>
                  </p>
                </div>
              )}

              {/* Danh sách sản phẩm */}
              <div>
                {seller.modals.map((modal) => (
                  <div
                    key={modal.id}
                    className="p-4 bg-gray-50 rounded-md mb-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={modal.image}
                        alt={modal.title}
                        className="w-20 h-20 rounded-md"
                      />
                      <div>
                        <h4 className="font-semibold">{modal.title}</h4>
                        <p>
                          Giá gốc:{" "}
                          <span className="line-through">
                            {modal.originalPrice.toLocaleString()} VND
                          </span>
                        </p>
                        <p>
                          Giá bán:{" "}
                          <span className="text-green-600 font-semibold">
                            {modal.sellPrice.toLocaleString()} VND
                          </span>
                        </p>
                        <p>
                          Số lượng:{" "}
                          <span className="font-semibold">
                            {modal.quantity}
                          </span>
                        </p>
                        <p>
                          Thành tiền:{" "}
                          <span className="font-semibold">
                            {modal.totalFinalPrice.toLocaleString()} VND
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Nút thanh toán */}
          <div className="space-y-4">
            <motion.div
              {...buttonClick}
              className="bg-primary text-white p-2 rounded-lg no-underline
    cursor-pointer hover:bg-heroPrimary transition-colors duration-300
    text-center text-lg "
            >
              Nạp thêm vào tài khoản
            </motion.div>
            <div className="flex items-center justify-between gap-16">
              <div className="w-16 h-[1px] rounded-md bg-slate-400"></div>
              <p className="text-slate-400">Quét mã thanh toán</p>
              <div className="w-16 h-[1px] rounded-md bg-slate-400"></div>
            </div>
            <motion.div
              {...buttonClick}
              onClick={handlePaymentWithMobileBanking}
              className="bg-blue-600 text-white p-2 rounded-lg no-underline
    cursor-pointer hover:bg-blue-700 transition-colors duration-300
    text-lg flex items-center space-x-4 justify-center"
            >
              <LuScanLine />
              <div>Thanh toán với Mobile Banking</div>
            </motion.div>
            <motion.div
              {...buttonClick}
              className="bg-[#A50064] text-white p-2 rounded-lg no-underline
    cursor-pointer hover:bg-[#8d0562] transition-colors duration-300
    text-lg flex items-center space-x-4 justify-center"
            >
              <img src={Momo} alt="momo" className="w-6" />
              <div>Thanh toán với Momo</div>
            </motion.div>
          </div>
        </div>
      ) : (
        <p className="text-center">Không có dữ liệu thanh toán.</p>
      )}
    </div>
  );
};

export default Checkout;
