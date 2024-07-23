import React from "react";
import { Outlet } from "react-router-dom";

import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

const UserLayout = () => {
  return (
    <div className="max-w-[1000px] mx-auto">
      <UserHeader />
      <Outlet />
      <UserFooter />
    </div>
  );
};

export default UserLayout;
