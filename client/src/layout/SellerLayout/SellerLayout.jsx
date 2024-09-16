import React from "react";
import { Outlet } from "react-router-dom";

import SellerHeader from "./SellerHeader";
import SellerFooter from "./SellerFooter";
import SellerSidebar from "./SellerSidebar";

const SellerLayout = () => {
  return (
    <main className="min-h-screen h-screen flex">
      <SellerSidebar />

      <div className="flex flex-col flex-1  bg-gray-300">
        <SellerHeader />
        <section className="flex-1 w-full overflow-auto">
          <Outlet />
        </section>
        <SellerFooter />
      </div>
    </main>
  );
};

export default SellerLayout;
