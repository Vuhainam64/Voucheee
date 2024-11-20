import React from "react";
import { Steps } from "antd";

const CartStep = ({ current }) => {
  return (
    <div className="py-2">
      <Steps
        current={current}
        items={[
          {
            title: "Giỏ hàng",
          },
          {
            title: "Xác nhận",
          },
          {
            title: "Thanh toán",
          },
        ]}
      />
    </div>
  );
};

export default CartStep;
