import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";
import CartStep from "./CartStep";

const CartLayout = () => {
  const [current, setCurrent] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/checkout") {
      setCurrent(1);
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="sticky top-0 w-full z-10">
        <CartHeader />
        <div className="bg-slate-100">
          <div className="max-w-[1400px] w-full flex flex-col mx-auto px-4 pt-4">
            <CartStep current={current} />
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
