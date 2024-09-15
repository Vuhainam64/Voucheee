import React from "react";
import { Outlet } from "react-router-dom";

import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

const HomeLayout = () => {
  return (
    <div className="flex justify-center items-center flex-col w-full">
      <HomeHeader />
      <Outlet />
      <HomeFooter />
    </div>
  );
};

export default HomeLayout;
