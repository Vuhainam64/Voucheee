import React from "react";

const Cart = () => {
  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 text-lg font-semibold">
        <div>Cart</div>
      </div>

      <div>
        {/* Header  */}
        <div className="grid grid-cols-8 gap-1">
          <div className="col-span-4">
            <div></div>
          </div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
