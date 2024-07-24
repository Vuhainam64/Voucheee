import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { HomeLayout, SellerLayout } from "../layout";

import { Home } from "../pages/Home";
import { Login, Register, VerifyPopup } from "../pages/Auth";
import { PageNotFound } from "../pages/Other";
import {
  SellerIncome,
  SellerOrder,
  SellerProduct,
  SellerPublish,
  SellerReverse,
  SellerReview,
  SellerTransaction,
} from "../pages/Seller";

const Routers = ({ isLogin, isEmailVerified, userRole }) => {
  const routes = [{ path: "/404", element: <PageNotFound /> }];

  if (!isLogin) {
    routes.push({
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "", element: <Home /> },
        {
          path: "auth",
          children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
          ],
        },
      ],
    });
  }

  if (isLogin && !isEmailVerified) {
    routes.push(
      { path: "/verify", element: <VerifyPopup /> },
      { path: "*", element: <Navigate to="/verify" /> }
    );
  }

  if (isLogin && isEmailVerified) {
    routes.push(
      // Add the routes that should be available after login and email verification
      // { path: "/create-feedback", element: <CreateFeedback /> },
      // userRole === "employee" && { path: "/employee/*", element: <Employee /> },
      // userRole === "admin" && { path: "/admin/*", element: <Dashboard /> },
      {
        path: "/",
        element: <HomeLayout />,
        children: [{ path: "", element: <Home /> }],
      },
      {
        path: "/seller",
        element: <SellerLayout />,
        children: [
          { path: "productList", element: <SellerProduct /> },
          { path: "publish", element: <SellerPublish /> },

          { path: "order", element: <SellerOrder /> },
          { path: "reverse", element: <SellerReverse /> },
          { path: "review", element: <SellerReview /> },

          { path: "myIncome", element: <SellerIncome /> },
          { path: "myTransaction", element: <SellerTransaction /> },
        ],
      }
    );
  }

  routes.push({ path: "*", element: <Navigate to="/" /> });

  const routing = useRoutes(routes.filter(Boolean));

  return routing;
};

export default Routers;
