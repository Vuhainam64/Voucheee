import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Modal, Spin } from "antd";
import { toast } from "react-toastify";

import { FaMoneyBill } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { RiQrScanLine } from "react-icons/ri";
import { LoadingOutlined } from "@ant-design/icons";

import { Logo, MBBank, Sepay } from "../../../../assets/img";
import { createTopup, getTopupStatus } from "../../../../api/topup";

const Deposit = ({ isModalOpen, setIsModalOpen }) => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState(50000);
  const [qrCode, setQRCode] = useState("");
  const [openQRCode, setOpenQRCode] = useState(false);
  const [topupDetail, setTopupDetails] = useState(null);

  const handleDeposit = async () => {
    if (amount >= 50000) {
      setIsModalOpen(false);
      const topupRes = await createTopup(amount);
      if (topupRes.result) {
        toast.success(topupRes.message);
        setQRCode(topupRes.value);
        setOpenQRCode(true);
      } else {
        toast.error("Có lỗi trong quá trình tạo topup");
      }
    } else {
      toast.warn("Số tiền cần nạp phải lớn hơn 50.000");
    }
  };

  useEffect(() => {
    let intervalId;

    const fetchTopupStatus = async () => {
      try {
        const topupRes = await getTopupStatus(qrCode);
        setTopupDetails(topupRes);
        console.log(topupRes);

        if (topupRes.status === "PAID") {
          Modal.success({
            title: "Thanh toán thành công",
            content: "Đơn hàng của bạn đã được thanh toán thành công!",
            onOk: () => navigate("/user/listVoucher"),
          });
          setTimeout(() => {
            navigate("/user/listVoucher");
          }, 5000);

          // Clear interval sau khi thanh toán thành công
          clearInterval(intervalId);
        }
      } catch (err) {
        toast.error("Không thể tải thông tin đơn hàng.");
      }
    };

    if (qrCode) {
      fetchTopupStatus();
      intervalId = setInterval(fetchTopupStatus, 5000);
    }

    return () => {
      // Cleanup interval khi unmount hoặc QRCode thay đổi
      clearInterval(intervalId);
    };
  }, [qrCode, navigate]);

  const handleCancelQRCodeModal = () => {
    setOpenQRCode(false);

    // Cleanup QR code và dừng interval
    setQRCode("");
  };

  // Thêm kiểm tra an toàn cho `topupDetail`
  const createDate = topupDetail?.createDate || null;
  const exprireTime = topupDetail?.exprireTime || null;
  const status = topupDetail?.status || "Đang xử lý";

  const formattedCreateDate = createDate
    ? new Date(createDate).toLocaleString()
    : "Đang cập nhật";
  const formattedExpireTime = exprireTime
    ? new Date(exprireTime).toLocaleString()
    : "Đang cập nhật";

  return (
    <div>
      {/* Modal Nạp Tiền */}
      <Modal
        title="Nạp tiền"
        open={isModalOpen}
        onOk={handleDeposit}
        onCancel={() => setIsModalOpen(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <div className="space-y-4">
          <p>Vui lòng nhập số tiền bạn muốn nạp:</p>
          <Input
            placeholder="Nhập số tiền"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            step={1000}
            min={50000}
          />
        </div>
      </Modal>

      {/* Modal QR Code */}
      <Modal
        title="Thanh toán"
        open={openQRCode}
        onOk={null}
        onCancel={handleCancelQRCodeModal}
        footer={null}
        className="min-w-[950px]"
      >
        <div className="flex items-center justify-center bg-slate-100">
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
                    {amount.toLocaleString()}đ
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <FaMoneyCheck size={20} />
                    <div className="text-xl">Mã đơn hàng</div>
                  </div>
                  <div className="text-lg pl-8">TOP{qrCode}</div>
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
                <div>
                  <img src={MBBank} alt="MBBank Logo" className="w-12 h-12" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 space-y-8 pb-12">
                <div className="text-xl text-primary">
                  Quét mã để thanh toán
                </div>
                <img
                  src={`https://qr.sepay.vn/img?acc=0000321753575&bank=MBBank&amount=${amount}&des=TOP${qrCode}`}
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
      </Modal>
    </div>
  );
};

export default Deposit;
