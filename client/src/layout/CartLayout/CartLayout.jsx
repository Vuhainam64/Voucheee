import React from "react";
import { Outlet } from "react-router-dom";

import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";
import CartStep from "./CartStep";

const CartLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="sticky top-0 w-full z-10">
        <CartHeader />
        <div className="bg-slate-100">
          <div className="max-w-[1400px] w-full flex flex-col mx-auto px-4 pt-4">
            <CartStep />
          </div>
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
      <CartFooter />
    </div>
  );
};

export default CartLayout;
