import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import {
  AdminLayout,
  CartLayout,
  HomeLayout,
  SellerLayout,
  // SettingLayout,
  SupplierLayout,
  UserLayout,
} from "../layout";

import {
  Cart,
  Checkout,
  Home,
  Payment,
  SearchProduct,
  VoucherDetail,
} from "../pages/Home";
// import { Account, Password, Profile } from "../pages/Setting";
import { PageNotFound } from "../pages/Other";
import { Login, Register, VerifyPopup } from "../pages/Auth";
import {
  SellerBank,
  SellerIncome,
  SellerOrder,
  SellerProduct,
  SellerPublish,
  SellerReverse,
  SellerReview,
  SellerTransaction,
} from "../pages/Seller";
import {
  IncomeDetails,
  IncomeInvoice,
  IncomeOverview,
  IncomeStatement,
} from "../pages/Seller/components/SellerIncome";
import {
  BankAccount,
  ChangePassword,
  DepositHistory,
  MyProfile,
  OrderList,
  UserBalance,
  VoucherList,
} from "../pages/User";
import {
  ConvertVoucher,
  SupplierDashboard,
  SupplierIncome,
  SupplierTransaction,
} from "../pages/Supplier";
import {
  AdminDashboard,
  AdminTransactions,
  FinancialOverview,
  UserManagerment,
} from "../pages/Admin";
import SupplierBank from "../pages/Supplier/SupplierBank";

const Routers = ({ isLogin, isEmailVerified, userRole }) => {
  const routes = [
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "cart", element: <Login /> },
        { path: "search", element: <SearchProduct /> },
        { path: "detail/:id", element: <VoucherDetail /> },
      ],
    },
    { path: "/404", element: <PageNotFound /> },
  ];

  if (!isLogin) {
    routes.push({
      path: "/",
      element: <HomeLayout />,
      children: [
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
        path: "/cart",
        element: <CartLayout />,
        children: [
          { path: "select", element: <Cart /> },
          { path: "checkout", element: <Checkout /> },
          { path: "payment", element: <Payment /> },
        ],
      },
      {
        path: "/user",
        element: <UserLayout />,
        children: [
          { path: "myProfile", element: <MyProfile /> },
          { path: "myPayment", element: <BankAccount /> },
          { path: "changePassword", element: <ChangePassword /> },
          { path: "listVoucher", element: <VoucherList /> },
          { path: "orderList", element: <OrderList /> },
          { path: "depositHistory", element: <DepositHistory /> },
          { path: "balance", element: <UserBalance /> },
        ],
      },
      {
        path: "/supplier",
        element: <SupplierLayout />,
        children: [
          { path: "dashboard", element: <SupplierDashboard /> },
          { path: "convertVoucher", element: <ConvertVoucher /> },
          { path: "myIncome", element: <SupplierIncome /> },
          { path: "myTransaction", element: <SupplierTransaction /> },
          { path: "myBank", element: <SupplierBank /> },
        ],
      },
      {
        path: "/seller",
        element: <SellerLayout />,
        children: [
          {
            path: "productList",
            element: <SellerProduct />,
          },
          { path: "publish", element: <SellerPublish /> },
          { path: "order", element: <SellerOrder /> },
          { path: "reverse", element: <SellerReverse /> },
          { path: "review", element: <SellerReview /> },

          {
            path: "myIncome",
            element: <SellerIncome />,
            children: [
              { path: "incomeOverview", element: <IncomeOverview /> },
              { path: "incomeStatement", element: <IncomeStatement /> },
              { path: "incomeDetails", element: <IncomeDetails /> },
              { path: "incomeInvoice", element: <IncomeInvoice /> },
            ],
          },
          { path: "myTransaction", element: <SellerTransaction /> },
          { path: "myBank", element: <SellerBank /> },
        ],
      },
      // {
      //   path: "/setting",
      //   element: <SettingLayout />,
      //   children: [
      //     { path: "profile", element: <Profile /> },
      //     { path: "password", element: <Password /> },
      //     { path: "account", element: <Account /> },
      //   ],
      // },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "financial-overview", element: <FinancialOverview /> },
          { path: "transactions", element: <AdminTransactions /> },
          { path: "permission", element: <UserManagerment /> },
        ],
      }
    );
  }

  routes.push({ path: "*", element: <Navigate to="/" /> });

  const routing = useRoutes(routes.filter(Boolean));

  return routing;
};

export default Routers;
