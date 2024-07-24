import React from "react";
import { Outlet } from "react-router-dom";

import SettingHeader from "./SettingHeader";
import SettingFooter from "./SettingFooter";
import SettingNavbar from "./SettingNavbar";

const SettingLayout = () => {
  return (
    <div className="main-layout min-h-screen flex flex-col">
      <SettingHeader />
      <SettingNavbar />
      <div className="min-w-[700px] mx-auto flex-1">
        <Outlet />
      </div>
      <SettingFooter />
    </div>
  );
};

export default SettingLayout;
