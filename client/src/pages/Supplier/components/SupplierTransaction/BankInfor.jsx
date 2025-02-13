import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Input, message, Spin } from "antd";

import { LuNfc } from "react-icons/lu";
import { FcSimCardChip } from "react-icons/fc";
import { FaChevronRight } from "react-icons/fa";

import { getUser } from "../../../../api/user";
import { logoPrimary } from "../../../../assets/img";
import { createWithdraw } from "../../../../api/withdraw";

const BankInfor = () => {
  const [bankAccount, setBankAccount] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser();
      setBankAccount(userData.supplierWallet);
    };

    fetchUserData();
  }, [loading]);

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);

    if (isNaN(amount) || amount <= 0) {
      message.error("Số tiền cần rút không hợp lệ.");
      return;
    }

    if (amount > bankAccount.balance) {
      message.error("Số dư không đủ để rút.");
      return;
    }

    if (amount < 10000) {
      message.error("Số tiền rút tối thiểu là 10.000 VND.");
      return;
    }

    setLoading(true);

    try {
      await createWithdraw(2, amount);
      message.success(`Rút tiền thành công: ${amount} VND`);
      setBankAccount((prev) => ({
        ...prev,
        balance: prev.balance - amount,
      }));
      setIsModalVisible(false);
      setWithdrawAmount("");
    } catch (error) {
      message.error("Rút tiền thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 bg-white p-8 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">Tổng số dư</div>
          <div className="text-primary cursor-pointer">
            Tìm hiểu thêm về số dư của bạn
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-semibold text-primary">
              {bankAccount.balance}
            </div>
            <div>VND</div>
          </div>
          <Button type="primary" onClick={showModal}>
            Rút tiền
          </Button>
        </div>
        <div className="bg-slate-100 rounded-md p-4">
          Tổng số dư sẽ được tự động chuyển vào tài khoản ngân hàng của NCC 1
          lần/tuần. NCC có thể chủ động rút tiền theo nhu cầu 1 lần/ngày.
        </div>
      </div>
      <div className="col-span-1 bg-white p-4 rounded-lg">
        <div className="bg-white shadow-md rounded-xl p-4">
          <div className="flex itemc-center justify-between">
            <div className="text-xl font-semibold">Tài khoản ngân hàng</div>
            <Link
              to="/supplier/myBank"
              className="flex items-center space-x-2 text-primary hover:no-underline"
            >
              <div>Quản lý tài khoản ngân hàng</div>
              <FaChevronRight />
            </Link>
          </div>
          <div className="flex justify-end py-2 pt-4">
            <img src={logoPrimary} alt="logo" className="h-6 flex" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FcSimCardChip size={70} />
              <LuNfc size={40} />
            </div>
            <div>
              <div>{bankAccount.bankNumber}</div>
              <div>{bankAccount.bankName}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Rút Tiền */}
      <Modal
        title="Rút tiền"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleWithdraw}
        okText={loading ? <Spin /> : "Rút tiền"} // Hiển thị Spin khi xử lý
        cancelText="Hủy"
        confirmLoading={loading} // Trạng thái xử lý
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">
              Số dư hiện tại:
            </label>
            <div>{bankAccount.balance} VND</div>
          </div>
          <div>
            <label className="block text-sm font-semibold">
              Số tiền cần rút: (Tối thiểu 10.000)
            </label>
            <Input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Nhập số tiền cần rút"
              min={10000}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BankInfor;
