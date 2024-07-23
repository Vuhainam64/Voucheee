import React from "react";
import { Outlet } from "react-router-dom";

import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";
import NavigationBar from "../../pages/User/UserNavBar";

const UserLayout = () => {
  return (
    <div className="max-w-[1000px] mx-auto">
      <UserHeader />
      <NavigationBar />
      <Outlet />
      <UserFooter />
    </div>
  );
};

export default UserLayout;
