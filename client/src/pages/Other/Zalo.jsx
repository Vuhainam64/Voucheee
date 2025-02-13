import React from "react";
import { Link } from "react-router-dom";

import { FaChevronRight } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import { ZaloHN } from "../../assets/img";

const Zalo = () => {
  return (
    <div className="w-full h-full p-8 space-y-8">
      <div className="flex items-center space-x-2">
        <MdDashboard className="text-xl" />
        <div>Dash board</div>
        <FaChevronRight />
        <div>Hỗ trợ</div>
        <FaChevronRight />
        <div>Zalo</div>
      </div>

      <div
        className="h-screen flex flex-col py-8 items-center justify-center bg-white rounded-lg"
        style={{ maxHeight: "calc(100vh - 260px)" }}
      >
        <div className="flex items-center justify-center space-x-20">
          <div className="flex flex-col items-center justify-center">
            <img src={ZaloHN} alt="ZaloCD" />
            <div>Công Danh</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src={ZaloHN} alt="ZaloHN" />
            <div>Hải Nam</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zalo;
