import React from "react";
import { Outlet } from "react-router-dom";

import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="sticky top-0 w-full z-20">
        <HomeHeader />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
      <HomeFooter />
    </div>
  );
};

export default HomeLayout;
