import React from "react";
import { Outlet } from "react-router-dom";

import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";
import UserSlidebar from "./UserSlidebar";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="sticky top-0 w-full z-10">
        <UserHeader />
      </div>
      <div className="bg-slate-100 flex-grow">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="grid grid-cols-4 gap-4 py-4">
            <div className="">
              <UserSlidebar />
            </div>
            <div className="col-span-3">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </div>
  );
};

export default UserLayout;
