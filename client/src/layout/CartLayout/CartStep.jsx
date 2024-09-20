import React from "react";
import { Steps } from "antd";

const CartStep = () => {
  return (
    <div className="py-2">
      <Steps
        current={1}
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
