import React from "react";
import Barcode from "react-barcode";
import { Modal, Button, QRCode } from "antd";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { IconLogo } from "../../../../assets/img";

const VoucherDetail = ({
  isModalVisible,
  handleCancel,
  selectedVoucher,
  selectedVoucherIndex,
  goPrevVoucher,
  goNextVoucher,
  formatVoucherCode,
}) => {
  return (
    <Modal
      title="Chi tiết voucher"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Đóng
        </Button>,
      ]}
    >
      {selectedVoucher && (
        <div
          className="flex flex-col items-center space-y-6 bg-gray-100 py-6 
          rounded-lg shadow-md bg-opacity-80"
        >
          {/* Thông tin chính của voucher */}
          <div className="relative flex flex-col items-center space-y-4 border-dashed border-b-2 border-gray-400 pb-4 w-full">
            <div className="absolute -bottom-2 -left-2 h-4 w-4 bg-white rounded-full"></div>
            <div className="absolute -bottom-2 -right-2 h-4 w-4 bg-white rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedVoucher.title}
            </h3>
            <div className="text-sm text-gray-600">Đưa mã này cho thu ngân</div>
            {/* Mã voucher */}
            <div className="text-sm text-gray-600">
              <span className="font-medium">Voucher Code:</span>{" "}
              <span className="text-primary">
                {formatVoucherCode(
                  selectedVoucher.voucherCodes[selectedVoucherIndex]?.code
                )}
              </span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full items-center">
              <Button
                icon={<FaChevronLeft size={20} />}
                onClick={goPrevVoucher}
                disabled={selectedVoucherIndex === 0}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <QRCode
                errorLevel="H"
                value={selectedVoucher.voucherCodes[selectedVoucherIndex]?.code}
                icon={IconLogo}
              />
              <Button
                icon={<FaChevronRight size={20} />}
                onClick={goNextVoucher}
                disabled={
                  selectedVoucherIndex ===
                  selectedVoucher.voucherCodes.length - 1
                }
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <Barcode
              value={selectedVoucher.voucherCodes[selectedVoucherIndex]?.code}
              format="CODE128"
              displayValue={false}
              background="none"
              height={40}
            />
          </div>

          {/* Nội dung bổ sung hoặc hình ảnh */}
          <div className="w-full text-center mt-4">
            {/* Placeholder for additional content */}
            <p className="text-sm text-primary italic">
              Sử dụng trước ngày{" "}
              {selectedVoucher.voucherCodes[selectedVoucherIndex]?.startDate}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default VoucherDetail;
