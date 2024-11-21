import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin, Modal } from "antd"; // Import Modal từ antd

import { FaMoneyBill } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { RiQrScanLine } from "react-icons/ri";
import { LoadingOutlined } from "@ant-design/icons";

import { Logo, Momo, Sepay } from "../../assets/img";
import { getOrder } from "../../api/order";

const Payment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderCode = queryParams.get("value");

  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate(); // Hook để điều hướng trang

  useEffect(() => {
    let intervalId;

    const fetchOrder = async () => {
      try {
        const order = await getOrder(orderCode?.substring(3));
        setOrderDetails(order);
        if (order.status === "PAID") {
          Modal.success({
            title: "Thanh toán thành công",
            content: "Đơn hàng của bạn đã được thanh toán thành công!",
            onOk: () => navigate("/home"),
          });
          setTimeout(() => {
            navigate("/home");
          }, 5000);
        }
      } catch (err) {
        toast.error("Không thể tải thông tin đơn hàng.");
      }
    };

    if (orderCode) {
      fetchOrder();
      intervalId = setInterval(fetchOrder, 5000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [orderCode, navigate]); // Thêm `navigate` vào dependency array

  if (!orderDetails) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Không tìm thấy đơn hàng</p>
      </div>
    );
  }

  const { finalPrice, createDate, exprireTime, status } = orderDetails;

  const formattedCreateDate = new Date(createDate).toLocaleString();
  const formattedExpireTime = new Date(exprireTime).toLocaleString();

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-slate-100"
      style={{ maxHeight: "calc(100vh - 250px)" }}
    >
      <div className="grid grid-cols-3 min-w-[900px] p-4">
        {/* Left Panel */}
        <div className="bg-primary text-white p-8 space-y-2">
          <div className="pb-8">
            <img src={Logo} alt="logo" className="h-5" />
          </div>
          <div className="text-xl">Đơn hàng hết hạn vào</div>
          <div className="text-xl">{formattedExpireTime}</div>
          <div className="py-8 space-y-4">
            <div className="space-y-2">
              <div className="text-xl">Nhà cung cấp</div>
              <div className="text-2xl pl-8">Sepay</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaMoneyBill size={20} />
                <div className="text-xl">Tổng thanh toán</div>
              </div>
              <div className="text-2xl pl-8">
                {finalPrice.toLocaleString()}đ
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaMoneyCheck size={20} />
                <div className="text-xl">Mã đơn hàng</div>
              </div>
              <div className="text-lg pl-8">{orderCode}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <LoadingOutlined spin />
                <div className="text-xl">Trạng thái</div>
              </div>
              <div className="text-lg pl-8">{status}</div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white p-6 col-span-2">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <img src={Sepay} alt="sepay" className="w-14" />
            </div>
            <div className="bg-[#A50064] p-2 rounded-md">
              <img src={Momo} alt="momo" className="w-10 h-10" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-4 space-y-8 pb-12">
            <div className="text-xl text-primary">Quét mã để thanh toán</div>
            <img
              src={`https://qr.sepay.vn/img?acc=0000321753575&bank=MBBank&amount=${finalPrice}&des=${orderCode}`}
              alt="QR"
              className="w-64 h-64"
            />
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center space-x-2">
                <RiQrScanLine size={20} />
                <div>
                  <div>Sử dụng App ngân hàng hoặc Camera</div>
                </div>
              </div>
              <div>hỗ trợ QR Code để quét mã</div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Spin />
              <div>Đang chờ bạn quét mã</div>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-gray-500">Ngày tạo: {formattedCreateDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
