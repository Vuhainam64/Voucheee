import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Input, Select, Spin, message } from "antd";

import { IoWallet } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";

import { updateUserBank, getUser } from "../../api/user";
import { bankList } from "../../utils/banks";

// Function to remove accents and convert to uppercase
const removeAccentsAndUpperCase = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Removes accents
    .replace(/[0-9]/g, "") // Removes numbers
    .replace(/[^a-zA-Z\s]/g, "")
    .toUpperCase(); // Converts to uppercase
};

const SellerBank = () => {
  const [selectedBank, setSelectedBank] = useState({});
  const [bankAccount, setBankAccount] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user details to pre-fill the form
    const loadUserData = async () => {
      const user = await getUser();
      if (user && user.sellerWallet.bankAccount) {
        setBankAccount(user.sellerWallet.bankAccount);
        setBankNumber(user.sellerWallet.bankNumber);
        const bank = bankList.find(
          (bank) => bank.name === user.sellerWallet.bankName
        );
        if (bank) {
          setSelectedBank(bank);
        }
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  const handleBankChange = (value) => {
    const bank = bankList.find((bank) => bank.id === value);
    if (bank) {
      setSelectedBank(bank);
    }
  };

  const handleBankNumberChange = (e) => {
    const sanitizedNumber = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); // Loại bỏ ký hiệu đặc biệt
    setBankNumber(sanitizedNumber);
  };

  const handleBankAccountChange = (e) => {
    const normalizedAccountName = removeAccentsAndUpperCase(e.target.value);
    setBankAccount(normalizedAccountName);
  };

  const handleFormSubmit = async (values) => {
    // Normalize the bank account again before submitting
    const normalizedBankAccount = removeAccentsAndUpperCase(values.bankAccount);

    try {
      // Call the updateUserBank API function
      const response = await updateUserBank(
        normalizedBankAccount, // Use the normalized bank account
        values.bankNumber,
        selectedBank.name,
        1
      );
      if (response.result) {
        message.success("Cập nhật thông tin tài khoản ngân hàng thành công!");
      } else {
        message.error("Cập nhật thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error updating bank account:", error);
      message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center overflow-hidden">
        <Spin />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <IoWallet className="text-xl" />
        <div>Tài Chính</div>
        <FaChevronRight />
        <div>Tài khoản ngân hàng</div>
      </div>
      <div className="text-xl font-semibold">Tài khoản ngân hàng</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <Form className="bg-white p-4 rounded-lg" onFinish={handleFormSubmit}>
            <Form.Item
              label={`Chủ tài khoản (Tiếng Việt KHÔNG DẤU): ${bankAccount}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="bankAccount"
              rules={[
                { required: true, message: "Vui lòng điền tên tài khoản!" },
              ]}
            >
              <Input value={bankAccount} onChange={handleBankAccountChange} />
            </Form.Item>
            <Form.Item
              label={`Số tài khoản: ${bankNumber}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="bankNumber"
              rules={[
                { required: true, message: "Vui lòng điền số tài khoản!" },
              ]}
            >
              <Input value={bankNumber} onChange={handleBankNumberChange} />
            </Form.Item>
            <Form.Item
              label={`Ngân hàng: ${selectedBank.name}`}
              name="brandName"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              className="flex-1"
              rules={[
                { required: true, message: "Vui lòng chọn ngân hàng của bạn!" },
              ]}
            >
              <Select
                value={selectedBank.id || undefined} // Preselect the bank if already chosen
                defaultValue="Tên Ngân hàng"
                onChange={handleBankChange}
                options={bankList.map((bank) => ({
                  value: bank.id,
                  label: (
                    <div>
                      {bank.shortName} - {bank.name}
                    </div>
                  ),
                }))}
              />
            </Form.Item>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="text-gray-400">Mã ngân hàng:</div>
                  <div>{selectedBank.bin || "Chưa có mã ngân hàng"}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-gray-400">Swift code:</div>
                  <div>{selectedBank.swift_code || "Chưa có Swift code"}</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="default">Huỷ bỏ</Button>
                <Button type="primary" htmlType="submit">
                  Gửi
                </Button>
              </div>
            </div>
          </Form>
          <div className="bg-white p-4 rounded-lg">
            <div>
              Bằng cách nhấp vào "Gửi", tôi xác nhận tôi đã đọc, hiểu và đồng ý
              với các điều khoản và điều kiện của
              <span className="text-primary cursor-pointer px-2">
                Điều khoản và điều kiện của Vouchee, Chính sách bảo mật của
                Vouchee cho Dịch vụ Người bán
              </span>
            </div>
          </div>
          <Alert
            message="Lưu ý"
            description="Quét lại mã Qrcode kế bên để chắc chắn tài khoản nhận tiền của bạn đã chính xác"
            type="warning"
            showIcon
          />
        </div>
        <div
          className="bg-white p-4 rounded-xl flex items-center justify-center h-screen"
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          <img
            className="max-h-full max-w-full object-contain"
            src={`https://img.vietqr.io/image/${
              selectedBank.code
            }-${bankNumber}-print.png?accountName=${encodeURIComponent(
              bankAccount
            )}`}
            alt="bank"
          />
        </div>
      </div>
    </div>
  );
};

export default SellerBank;
