import React from "react";
import { Tabs } from "antd";

import PendingPayment from "./PendingPayment";
import PaidPayment from "./PaidPayment";

const IncomePayment = () => {
  const tabs = [
    {
      key: "1",
      label: "Chờ thanh toán",
      children: <PendingPayment />,
    },
    {
      key: "2",
      label: "Đã thanh toán",
      children: <PaidPayment />,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-xl">
      <Tabs defaultActiveKey="1" items={tabs} />
    </div>
  );
};

export default IncomePayment;
