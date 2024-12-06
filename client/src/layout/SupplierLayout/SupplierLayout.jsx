import React from "react";
import { Outlet } from "react-router-dom";

import SupplierSidebar from "./SupplierSidebar";

const SupplierLayout = () => {
  return (
    <main className="min-h-screen h-screen flex">
      <SupplierSidebar />

      <div className="flex flex-col flex-1 bg-gray-200">
        <section className="flex flex-col w-full overflow-auto ">
          <div className="flex-grow ">
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  );
};

export default SupplierLayout;
