import React from "react";

import { Avatar } from "../../assets/img";

const SupplierDashboard = () => {
  return (
    <div className="w-full h-screen p-6">
      <div className="flex justify-between space-x-4">
        <div className="flex bg-white p-4 rounded-md">
          <img src={Avatar} alt="logo" className="w-16 h-16 rounded-full" />
          <div>
            <div className="text-2xl font-bold">GiftPop</div>
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
};

export default SupplierDashboard;
