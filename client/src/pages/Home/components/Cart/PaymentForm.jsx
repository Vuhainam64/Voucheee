import React, { useState } from "react";
import { motion } from "framer-motion";
import { InputNumber, Switch, Tooltip } from "antd";

import { FiGift } from "react-icons/fi";
import { FaPercent } from "react-icons/fa";
import { LuScanLine } from "react-icons/lu";
import { IoMdInformationCircleOutline } from "react-icons/io";

import { Momo } from "../../../../assets/img";
import { buttonClick } from "../../../../animations";

const PaymentForm = ({ cartData, totalPrice }) => {
  const [useVpoint, setUseVpoint] = useState(false);
  const [useBalance, setUseBalance] = useState(false);
  const [vpointToUse, setVpointToUse] = useState(0);
  const [balanceToUse, setBalanceToUse] = useState(0);
  const [showEmailInput, setShowEmailInput] = useState(false);

  const handleVpointSwitch = (checked) => {
    setUseVpoint(checked);
    if (!checked) {
      setVpointToUse(0);
    }
  };

  const handleVpointChange = (value) => {
    // Làm tròn giá trị nhập vào xuống bội số của 1000
    const roundedValue = Math.floor(value / 1000) * 1000;

    // Kiểm tra xem giá trị đã làm tròn có vượt quá tổng giá trị sản phẩm không
    if (roundedValue > totalPrice) {
      setVpointToUse(totalPrice); // Nếu vượt quá, gán số VPoint = totalPrice
    } else if (roundedValue < 0) {
      setVpointToUse(0); // Kiểm tra giá trị không âm
    } else {
      setVpointToUse(roundedValue); // Nếu hợp lệ, cập nhật giá trị VPoint
    }
  };

  const handleBalanceSwitch = (checked) => {
    setUseBalance(checked);
    if (!checked) {
      setUseBalance(0);
    }
  };

  const handleBalanceChange = (value) => {
    const roundedValue = Math.floor(value / 1000) * 1000;
    if (roundedValue > totalPrice) {
      setBalanceToUse(totalPrice);
    } else if (roundedValue < 0) {
      setBalanceToUse(0);
    } else {
      setBalanceToUse(roundedValue);
    }
  };

  const handleGiftClick = () => {
    setShowEmailInput(!showEmailInput);
  };

  return (
    <div className="sticky top-4">
      <div className="bg-white p-4 rounded-lg space-y-4">
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
            />
          </div>
        )}
        <div className="font-semibold">Thanh toán</div>
        <div className="flex items-center justify-between">
          <div>Tổng giá trị sản phẩm</div>
          <div>{totalPrice ? totalPrice : "0"}đ</div>
        </div>
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
            <Tooltip title="Số vpoint có thể sử dụng là bội số của 1000 ví dụ 2000,10000">
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
              step={1000} // Đảm bảo nhập số theo bội số của 1000
            />
          </div>
        )}

        <div className="border-b"></div>
        <div className="flex items-center justify-between">
          <div>Tổng giá trị phải thanh toán</div>
          <div>{useVpoint ? totalPrice - vpointToUse : totalPrice}đ</div>
        </div>
        <div className="flex items-center justify-between">
          <Tooltip title="VPoint = Tổng tiền thanh toán / 1000">
            <div className="flex items-center space-x-1">
              <div>Thưởng VPoint</div>
              <IoMdInformationCircleOutline />
            </div>
          </Tooltip>
          <div>
            {(useVpoint ? totalPrice - cartData?.vPoint : totalPrice) / 1000}
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
              step={1000} // Đảm bảo nhập số theo bội số của 1000
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>Số tiền cần nạp thêm</div>
          <div>0đ</div>
        </div>
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
  );
};

export default PaymentForm;
