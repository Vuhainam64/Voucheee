import React from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
  return (
    <main className="min-h-screen h-screen flex">
      <AdminSidebar />

      <div className="flex flex-col flex-1 bg-gray-200">
        <section className="flex flex-col w-full overflow-auto ">
          <div className="flex-grow p-4">
            <Outlet />
          </div>
          <AdminFooter />
        </section>
      </div>
    </main>
  );
};

export default AdminLayout;
