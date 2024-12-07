import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { FiUser } from "react-icons/fi";
import { RiCoinLine } from "react-icons/ri";
import { BiCoinStack } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { HiOutlineTicket } from "react-icons/hi";

const UserSlidebar = () => {
  const cart = useSelector((state) => state.cart?.cart);

  return (
    <div
      className="space-y-4 overflow-y-auto scrollbar-none"
      style={{ maxHeight: "calc(100vh - 218px)" }}
    >
      <div className="bg-white rounded-xl items-center">
        <div className="flex items-center space-x-4 p-4">
          <div className="text-2xl">
            <FiUser />
          </div>
          <div className="text-xl font-semibold">Thông Tin Tài Khoản</div>
        </div>
        <NavLink
          to={"/user/myProfile"}
          className={({ isActive }) =>
            isActive
              ? "flex bg-slate-200 text-cyan-600 p-4 px-14 hover:text-cyan-700 hover:no-underline"
              : "flex p-4 px-14 hover:text-cyan-600 hover:no-underline"
          }
        >
          <div>Thông Tin Cá Nhân</div>
        </NavLink>
        <NavLink
          to={"/user/myPayment"}
          className={({ isActive }) =>
            isActive
              ? "flex bg-slate-200 text-cyan-600 p-4 px-14 hover:text-cyan-700 hover:no-underline"
              : "flex p-4 px-14 hover:text-cyan-600 hover:no-underline"
          }
        >
          <div>Tài Khoản Ngân Hàng</div>
        </NavLink>
        <NavLink
          to={"/user/changePassword"}
          className={({ isActive }) =>
            isActive
              ? "flex bg-slate-200 text-cyan-600 p-4 px-14 hover:text-cyan-700 hover:no-underline"
              : "flex p-4 px-14 hover:text-cyan-600 hover:no-underline"
          }
        >
          <div>Đổi Mật Khẩu</div>
        </NavLink>
      </div>
      <div className="bg-white rounded-xl items-center">
        <div className="flex items-center space-x-4 p-4">
          <div className="text-2xl">
            <BiCoinStack />
          </div>
          <div className="text-xl font-semibold">Số dư của tôi</div>
        </div>
        <NavLink
          to={"/user/vcoin"}
          className={({ isActive }) =>
            isActive
              ? "flex bg-slate-200 text-cyan-600 p-4 px-14 hover:text-cyan-700 hover:no-underline"
              : "flex p-4 px-14 hover:text-cyan-600 hover:no-underline"
          }
        >
          <div className="flex items-center justify-between w-full">
            <div>Vouchee Coin</div>
            <div className="flex items-center space-x-2">
              <div>{cart?.vPoint ? cart?.vPoint.toLocaleString() : 0}</div>
              <RiCoinLine />
            </div>
          </div>
        </NavLink>
        <NavLink
          to={"/user/balance"}
          className={({ isActive }) =>
            isActive
              ? "flex bg-slate-200 text-cyan-600 p-4 px-14 hover:text-cyan-700 hover:no-underline"
              : "flex p-4 px-14 hover:text-cyan-600 hover:no-underline"
          }
        >
          <div className="flex items-center justify-between w-full">
            <div>Số dư tài khoản</div>
            <div className="flex items-center space-x-2">
              <div>{cart?.balance ? cart?.balance.toLocaleString() : 0}</div>
              <RiCoinLine />
            </div>
          </div>
        </NavLink>
      </div>
      <div className="bg-white rounded-xl items-center">
        <div className="flex items-center space-x-4 p-4">
          <div className="text-2xl">
            <HiOutlineTicket />
          </div>
          <div className="text-xl font-semibold">Quản Lý Voucher</div>
        </div>
        <NavLink
          to={"/user/listVoucher"}
          className={({ isActive }) =>
            isActive
              ? "flex bg-slate-200 text-cyan-600 p-4 px-14 hover:text-cyan-700 hover:no-underline"
              : "flex p-4 px-14 hover:text-cyan-600 hover:no-underline"
          }
        >
          <div>Danh sách voucher</div>
        </NavLink>
        <NavLink
          to={"/user/telecom"}
          className={({ isActive }) =>
            isActive
              ? "flex bg-slate-200 text-cyan-600 p-4 px-14 hover:text-cyan-700 hover:no-underline"
              : "flex p-4 px-14 hover:text-cyan-600 hover:no-underline"
          }
        >
          <div>Viễn thông</div>
        </NavLink>
        <NavLink
          to={"/user/booking"}
          className={({ isActive }) =>
            isActive
              ? "flex bg-slate-200 text-cyan-600 p-4 px-14 hover:text-cyan-700 hover:no-underline"
              : "flex p-4 px-14 hover:text-cyan-600 hover:no-underline"
          }
        >
          <div>Đặt phòng của tôi</div>
        </NavLink>
      </div>
      <div className="bg-white rounded-xl items-center">
        <div className="flex items-center space-x-4 p-4">
          <div className="text-2xl">
            <GrTransaction />
          </div>
          <div className="text-xl font-semibold">Giao dịch</div>
        </div>
        <NavLink
          to={"/user/orderList"}
          className={({ isActive }) =>
            isActive
              ? "flex bg-slate-200 text-cyan-600 p-4 px-14 hover:text-cyan-700 hover:no-underline"
              : "flex p-4 px-14 hover:text-cyan-600 hover:no-underline"
          }
        >
          <div>Lịch sử mua hàng</div>
        </NavLink>
        <NavLink
          to={"/user/depositHistory"}
          className={({ isActive }) =>
            isActive
              ? "flex bg-slate-200 text-cyan-600 p-4 px-14 hover:text-cyan-700 hover:no-underline"
              : "flex p-4 px-14 hover:text-cyan-600 hover:no-underline"
          }
        >
          <div>Lịch sử thanh toán</div>
        </NavLink>
      </div>
    </div>
  );
};

export default UserSlidebar;
