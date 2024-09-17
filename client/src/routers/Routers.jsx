import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { HomeLayout, SellerLayout, SettingLayout } from "../layout";

import { Home } from "../pages/Home";
import { Account, Password, Profile } from "../pages/Setting";
import { PageNotFound } from "../pages/Other";
import { Login, Register, VerifyPopup } from "../pages/Auth";
import {
  SellerIncome,
  SellerOrder,
  SellerProduct,
  SellerPublish,
  SellerReverse,
  SellerReview,
  SellerTransaction,
} from "../pages/Seller";
import {
  ActiveProduct,
  AllProduct,
  DeleteProduct,
  InactiveProduct,
  PendingProduct,
  ViolateProduct,
} from "../pages/Seller/components/SellerProduct";
import {
  IncomeDetails,
  IncomeInvoice,
  IncomeOverview,
  IncomeStatement,
} from "../pages/Seller/components/SellerIncome";

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
          {
            path: "productList",
            element: <SellerProduct />,
            children: [
              { path: "allProduct", element: <AllProduct /> },
              { path: "activeProduct", element: <ActiveProduct /> },
              { path: "inactiveProduct", element: <InactiveProduct /> },
              { path: "pendingProduct", element: <PendingProduct /> },
              { path: "violateProduct", element: <ViolateProduct /> },
              { path: "deletedProduct", element: <DeleteProduct /> },
            ],
          },
          { path: "publish", element: <SellerPublish /> },

          { path: "order", element: <SellerOrder /> },
          { path: "reverse", element: <SellerReverse /> },
          { path: "review", element: <SellerReview /> },

          {
            path: "myIncome",
            element: <SellerIncome />,
            children: [
              { path: "incomeDetails", element: <IncomeDetails /> },
              { path: "incomeInvoice", element: <IncomeInvoice /> },
              { path: "incomeStatement", element: <IncomeStatement /> },
              { path: "incomeOverview", element: <IncomeOverview /> },
            ],
          },
          { path: "myTransaction", element: <SellerTransaction /> },
        ],
      },
      {
        path: "/setting",
        element: <SettingLayout />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "password", element: <Password /> },
          { path: "account", element: <Account /> },
        ],
      }
    );
  }

  routes.push({ path: "*", element: <Navigate to="/" /> });

  const routing = useRoutes(routes.filter(Boolean));

  return routing;
};

export default Routers;
