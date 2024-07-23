import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { HomeLayout } from "../layout";

import { Home } from "../pages/Home";
import { Login, Register } from "../pages/Auth";

const Routers = ({ isLogin, isEmailVerified, userRole }) => {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [{ path: "", element: <Home /> }],
    },
    {
      path: "/auth",
      element: !isLogin ? <HomeLayout /> : <Navigate to="/" />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);
  return routing;
};

export default Routers;
