import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip, Timeline, Dropdown, Space } from "antd";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaChevronRight,
  FaRegCircleQuestion,
} from "react-icons/fa6";
import { PiMoneyThin } from "react-icons/pi";
import { TbActivityHeartbeat } from "react-icons/tb";

import { Deposit } from "./components/UserBalance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const data = {
  labels: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  datasets: [
    {
      label: "Tiền vào",
      data: [
        12000, 19000, 3000, 5000, 20000, 15000, 18000, 22000, 24000, 10000,
        30000, 25000,
      ],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
    {
      label: "Thanh toán",
      data: [
        8000, 10000, 4000, 3000, 15000, 10000, 12000, 18000, 16000, 8000, 25000,
        20000,
      ],
      backgroundColor: "rgba(255, 99, 132, 0.6)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Dòng tiền hàng tháng (VND)",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Tháng",
      },
    },
    y: {
      title: {
        display: true,
        text: "Số tiền (VND)",
      },
      ticks: {
        beginAtZero: true,
      },
    },
  },
};

const UserBalance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = [
    {
      label: <div onClick={() => setIsModalOpen(true)}>Nạp tiền</div>,
      key: "0",
    },
    {
      label: <Link to="https://www.aliyun.com">Rút tiền</Link>,
      key: "1",
    },
  ];
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-md flex items-center justify-between">
        <div className="text-2xl font-semibold">Tổng quan</div>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <div
            onClick={(e) => e.preventDefault()}
            className="text-primary cursor-pointer"
          >
            <Space>
              Nạp rút
              <FaChevronRight />
            </Space>
          </div>
        </Dropdown>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-md relative space-y-4">
          <div className="flex items-center space-x-2">
            <div className="font-bold">Số dư hiện tại</div>
            <Tooltip title="Tổng số dư ngân hàng ở thời điểm hiện tại">
              <FaRegCircleQuestion />
            </Tooltip>
          </div>
          <div className="text-xl text-primary">1.000.000 VND</div>
          <div className="absolute top-0 right-4">
            <PiMoneyThin className="text-4xl bg-primary text-white rounded-full p-1" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-md relative space-y-4">
          <div className="flex items-center space-x-2">
            <div className="font-bold">Nạp vào tháng này</div>
            <Tooltip title="Tổng tiền từ ngày 1-10-2024 đến ngày hiện tại">
              <FaRegCircleQuestion />
            </Tooltip>
          </div>
          <div className="text-xl text-primary">1.000.000 VND</div>
          <div className="absolute top-0 right-4">
            <FaArrowRightLong className="text-4xl bg-primary text-white rounded-full p-2" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-md relative space-y-4">
          <div className="flex items-center space-x-2">
            <div className="font-bold">Đã chi tiêu </div>
            <Tooltip title="Tổng tiền ra từ ngày 1-10-2024 đến ngày hiện tại">
              <FaRegCircleQuestion />
            </Tooltip>
          </div>
          <div className="text-xl text-primary">1.000.000 VND</div>
          <div className="absolute top-0 right-4">
            <FaArrowLeftLong className="text-4xl bg-primary text-white rounded-full p-2" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-md relative space-y-4">
          <div className="flex items-center space-x-2">
            <div className="font-bold">Đã rút tháng này </div>
            <Tooltip title="Tổng tiền vào trừ đi tổng tiền ra">
              <FaRegCircleQuestion />
            </Tooltip>
          </div>
          <div className="text-xl text-primary">1.000.000 VND</div>
          <div className="absolute top-0 right-4">
            <TbActivityHeartbeat className="text-4xl bg-primary text-white rounded-full p-1" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white p-6 rounded-md">
          <div>Dòng tiền hàng tháng</div>
          {/* Biểu đồ cột */}
          <Bar data={data} options={options} />
        </div>
        <div className="col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-md space-y-4 flex flex-col justify-center">
            <div className="flex items-center space-x-2">
              <div>Thống kê tháng này</div>
              <Tooltip title="Số liệu thống kê từ ngày 1-10-2024 đến ngày 30-10-2024">
                <FaRegCircleQuestion />
              </Tooltip>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2 text-center">
                <div>Giao dịch Nạp vào</div>
                <div className="font-bold text-xl text-primary">8</div>
              </div>
              <div className="space-y-2 text-center">
                <div>Giao dịch Thanh toán</div>
                <div className="font-bold text-xl text-primary">3</div>
              </div>
              <div className="space-y-2 text-center">
                <div>Giao dịch Rút ra</div>
                <div className="font-bold text-xl text-primary">5</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md space-y">
            <div className="pb-4">Giao dịch gần đây</div>
            <Timeline
              items={[
                {
                  children: (
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-500">0000321753575</div>
                        <div className="text-primary font-bold">+ 1,000 đ</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>RetailJCB-622267-1000-...</div>
                        <div>17 giờ trước</div>
                      </div>
                    </div>
                  ),
                },
                {
                  children: (
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-500">0000321753575</div>
                        <div className="text-red-400 font-bold">- 1,000 đ</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>RetailJCB-622267-1000-...</div>
                        <div>17 giờ trước</div>
                      </div>
                    </div>
                  ),
                },
                {
                  children: (
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-500">0000321753575</div>
                        <div className="text-primary font-bold">+ 1,000 đ</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>RetailJCB-622267-1000-...</div>
                        <div>17 giờ trước</div>
                      </div>
                    </div>
                  ),
                },
                {
                  children: (
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-500">0000321753575</div>
                        <div className="text-red-400 font-bold">- 1,000 đ</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>RetailJCB-622267-1000-...</div>
                        <div>17 giờ trước</div>
                      </div>
                    </div>
                  ),
                },
                {
                  children: (
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-500">0000321753575</div>
                        <div className="text-red-400 font-bold">- 1,000 đ</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>RetailJCB-622267-1000-...</div>
                        <div>17 giờ trước</div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <Link
              to={"/admin/transactions"}
              className="flex items-center justify-center space-x-2 hover:no-underline text-primary"
            >
              <div>Xem thêm </div>
              <FaChevronRight />
            </Link>
          </div>
        </div>
      </div>

      <Deposit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default UserBalance;
