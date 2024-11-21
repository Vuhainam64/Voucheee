import React, { useState, useEffect } from "react";
import { InputNumber, Switch, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { FiGift } from "react-icons/fi";
import { FaPercent } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

import { buttonClick } from "../../../../animations";

const PaymentForm = ({
  selectedItems,
  selectedPromotions,
  cartData,
  totalPrice,
}) => {
  const navigate = useNavigate();

  const [useVpoint, setUseVpoint] = useState(false);
  const [useBalance, setUseBalance] = useState(false);
  const [vpointToUse, setVpointToUse] = useState(0);
  const [balanceToUse, setBalanceToUse] = useState(0);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [giftEmail, setGiftEmail] = useState("");

  // State for computed values
  const [discountsBySeller, setDiscountsBySeller] = useState({});
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] =
    useState(totalPrice);

  // Compute discounts by seller
  useEffect(() => {
    const sellerDiscounts = selectedItems.reduce((acc, item) => {
      const sellerId = item.sellerId;
      const modals = item.modals;
      const promotion = selectedPromotions.find(
        (promo) => promo.sellerId === sellerId
      );
      const percentDiscount = promotion?.percentDiscount || 0;

      const totalDiscount =
        modals.reduce(
          (sum, modal) => sum + modal.salePrice * modal.quantity,
          0
        ) *
        (percentDiscount / 100);

      if (!acc[sellerId]) {
        acc[sellerId] = { sellerId, totalDiscount };
      } else {
        acc[sellerId].totalDiscount += totalDiscount;
      }

      return acc;
    }, {});

    setDiscountsBySeller(sellerDiscounts);

    // Calculate total discount
    const total = Object.values(sellerDiscounts).reduce(
      (sum, { totalDiscount }) => sum + totalDiscount,
      0
    );

    setTotalDiscount(total);
  }, [selectedItems, selectedPromotions]);

  // Calculate total price after discounts
  useEffect(() => {
    setTotalPriceAfterDiscount(
      useVpoint
        ? Math.max(totalPrice - totalDiscount - vpointToUse, 0)
        : totalPrice - totalDiscount
    );
  }, [totalPrice, totalDiscount, vpointToUse, useVpoint]);

  const handleVpointSwitch = (checked) => {
    setUseVpoint(checked);
    if (!checked) {
      setVpointToUse(0);
    }
  };

  const handleVpointChange = (value) => {
    const roundedValue = Math.floor(value / 1000) * 1000;
    if (roundedValue > totalPrice) {
      setVpointToUse(totalPrice);
    } else if (roundedValue < 0) {
      setVpointToUse(0);
    } else {
      setVpointToUse(roundedValue);
    }
  };

  const handleBalanceSwitch = (checked) => {
    setUseBalance(checked);
    if (!checked) {
      setBalanceToUse(0);
    }
  };

  const handleBalanceChange = (value) => {
    const roundedValue = Math.floor(value / 1000) * 1000;
    if (roundedValue > totalPriceAfterDiscount) {
      setBalanceToUse(totalPriceAfterDiscount);
    } else if (roundedValue < 0) {
      setBalanceToUse(0);
    } else {
      setBalanceToUse(roundedValue);
    }
  };

  const handleGiftClick = () => {
    if (showEmailInput) {
      setGiftEmail("");
    }
    setShowEmailInput(!showEmailInput);
  };

  const handleCheckout = async () => {
    try {
      // Chuẩn bị dữ liệu item_brief
      const itemBrief = selectedItems.map((item) => {
        const promotion = selectedPromotions.find(
          (promo) => promo.sellerId === item.sellerId
        );
        return {
          modalId: item.modals.map((modal) => modal.id),
          promotionId: promotion ? promotion.id : null,
        };
      });

      // Chuẩn bị dữ liệu gửi đi
      const requestData = {
        totalPrice,
        totalDiscount,
        totalPriceBeforeDiscount: totalPrice - totalDiscount,
        use_VPoint: vpointToUse,
        totalPriceAfterDiscount,
        use_balance: balanceToUse,
        totalPay: totalPriceAfterDiscount - balanceToUse,
        item_brief: itemBrief,
        gift_email: giftEmail,
      };

      // Gọi API checkout
      localStorage.setItem("checkoutResponse", JSON.stringify(requestData));
      navigate("/cart/checkout");
    } catch (err) {
      console.error("Lỗi khi thanh toán:", err);
      toast.error("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
    }
  };

  return (
    <div className="sticky top-4">
      <div className="bg-white p-4 rounded-lg space-y-4">
        {/* Mã ưu đãi và tặng quà */}
        <div className="flex items-center justify-between">
          <div className="font-semibold">Bạn có mã ưu đãi?</div>
          <FaPercent />
        </div>
        <div className="flex items-center justify-between">
          <div
            onClick={handleGiftClick}
            className="font-semibold cursor-pointer"
          >
            Bạn muốn tặng cho bạn bè?
          </div>
          <FiGift />
        </div>
        {showEmailInput && (
          <div className="mt-2 flex space-x-2 items-center">
            <div>Email</div>
            <input
              type="email"
              placeholder="Nhập email người nhận quà"
              className="border p-2 rounded w-full"
              value={giftEmail}
              onChange={(e) => setGiftEmail(e.target.value)}
            />
          </div>
        )}
        {/* Thông tin thanh toán */}
        <div className="font-semibold">Thanh toán</div>
        <div className="flex items-center justify-between">
          <div>Tổng số tiền sản phẩm</div>
          <div>{totalPrice.toLocaleString()}đ</div>
        </div>
        {Object.values(discountsBySeller)
          .filter(({ totalDiscount }) => totalDiscount > 0) // Lọc các seller có giảm giá > 0
          .map(({ sellerId, totalDiscount }) => (
            <div key={sellerId} className="flex items-center justify-between">
              <div>Giảm giá từ seller</div>
              <div>- {totalDiscount.toLocaleString()}đ</div>
            </div>
          ))}

        <div className="border-b"></div>
        <div className="flex items-center justify-between">
          <div>Tổng số tiền trước thanh toán</div>
          <div>{(totalPrice - totalDiscount).toLocaleString()}đ</div>
        </div>

        {/* VPoint */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div>Sử dụng VPoint</div>
            <Switch checked={useVpoint} onChange={handleVpointSwitch} />
          </div>
          <div>
            <div>{cartData?.vPoint.toLocaleString()}</div>
          </div>
        </div>
        {useVpoint && (
          <div className="flex items-center justify-between">
            <Tooltip title="Số VPoint có thể sử dụng là bội số của 1000">
              <div className="flex items-center space-x-1">
                <div>Nhập số VPoint muốn dùng</div>
                <IoMdInformationCircleOutline />
              </div>
            </Tooltip>
            <InputNumber
              min={0}
              max={cartData?.vPoint}
              value={vpointToUse}
              onChange={handleVpointChange}
              style={{ width: 120 }}
              step={1000}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              } // Thêm dấu phẩy mỗi 3 chữ số
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </div>
        )}
        {/* Tổng tiền thanh toán */}
        <div className="flex items-center justify-between">
          <div>Tổng số tiền thanh toán</div>
          <div>{totalPriceAfterDiscount.toLocaleString()}đ</div>
        </div>

        <div className="flex items-center justify-between">
          <Tooltip title="VPoint = Tổng tiền thanh toán / 1000">
            <div className="flex items-center space-x-1">
              <div>Thưởng VPoint</div>
              <IoMdInformationCircleOutline />
            </div>
          </Tooltip>
          <div>
            <div>
              {useVpoint
                ? totalPrice - totalDiscount - vpointToUse > 0
                  ? ((totalPrice - totalDiscount - vpointToUse) / 1000)
                      .toFixed(0)
                      .toLocaleString()
                  : 0
                : ((totalPrice - totalDiscount) / 1000)
                    .toFixed(0)
                    .toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div>Số dư hiện tại</div>
            <Switch checked={useBalance} onChange={handleBalanceSwitch} />
          </div>
          <div>
            {cartData?.balance ? cartData?.balance.toLocaleString() : 0}đ
          </div>
        </div>
        {useBalance && (
          <div className="flex items-center justify-between">
            <Tooltip title="Số dư có thể sử dụng là bội số của 1000 ví dụ 2000,10000">
              <div className="flex items-center space-x-1">
                <div>Nhập số dư muốn dùng</div>
                <IoMdInformationCircleOutline />
              </div>
            </Tooltip>
            <InputNumber
              min={0}
              max={cartData?.balance}
              value={balanceToUse}
              onChange={handleBalanceChange}
              style={{ width: 120 }}
              step={1000}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              } // Thêm dấu phẩy mỗi 3 chữ số
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              addonAfter="đ"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>Số tiền cần nạp thêm</div>
          <div>
            {(totalPriceAfterDiscount - balanceToUse).toLocaleString()}đ
          </div>
        </div>
        <motion.div
          {...buttonClick}
          className="bg-primary text-white p-2 rounded-lg no-underline
    cursor-pointer hover:bg-heroPrimary transition-colors duration-300
    text-center text-lg "
        >
          Nạp thêm vào tài khoản
        </motion.div>
        <motion.div
          {...buttonClick}
          onClick={handleCheckout}
          className="bg-blue-500 text-white p-2 rounded-lg no-underline
    cursor-pointer hover:bg-blue-600  transition-colors duration-300
    text-center text-lg "
        >
          Tiến hành Thanh toán
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentForm;
