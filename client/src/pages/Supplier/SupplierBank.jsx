import React from "react";
import { Alert, Button, Form, Input, Select } from "antd";

import { IoWallet } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";

import { bankList } from "../../utils/banks";

const SupplierBank = () => {
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
          <Form className="bg-white p-4 rounded-lg ">
            <Form.Item
              label="Chủ tài khoản (Tiếng Việt KHÔNG DẤU)"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="productName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền tên tài khoản!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số tài khoản"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="productName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền số tài khoản!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Thương hiệu"
              name="brandName"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngân hàng của bạn!",
                },
              ]}
            >
              <Select
                defaultValue="Tên Ngân hàng"
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
                  <div>79358001</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-gray-400">Swift code:</div>
                  <div>TPBVVNVX</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button>Huỷ bỏ</Button>
                <Button type="primary">Gửi</Button>
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
          className="bg-white p-4 rounded-xl flex items-center justify-center
        h-screen"
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          <img
            className="h-fit"
            src={`https://img.vietqr.io/image/TPB-04304796201-full.png?accountName=VU%20HAI%20NAM`}
            alt="bank"
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierBank;
