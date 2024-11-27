import React, { useEffect, useState } from "react";
import { Input, Select, DatePicker, Dropdown, Menu, Image } from "antd";

import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { getMyVoucher } from "../../api/myvoucher";
import { VoucherDetail } from "./components/VoucherList";

const { RangePicker } = DatePicker;
const { Search } = Input;

const VoucherList = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedVoucherIndex, setSelectedVoucherIndex] = useState(0);

  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      setLoading(true);
      try {
        const response = await getMyVoucher(status, startDate, endDate);
        setVouchers(response.results || []);
      } catch (error) {
        console.error("Failed to fetch vouchers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, [status, startDate, endDate]);

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setStatus(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Function to handle menu actions
  const handleMenuClick = (voucher) => {
    setSelectedVoucher(voucher);
    setSelectedVoucherIndex(0); // Reset to the first voucher code
    setIsModalVisible(true);
  };

  // Function để đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Navigate to the next voucher code
  const goNextVoucher = () => {
    if (selectedVoucher && selectedVoucher.voucherCodes) {
      const nextIndex =
        (selectedVoucherIndex + 1) % selectedVoucher.voucherCodes.length;
      setSelectedVoucherIndex(nextIndex);
    }
  };

  // Navigate to the previous voucher code
  const goPrevVoucher = () => {
    if (selectedVoucher && selectedVoucher.voucherCodes) {
      const prevIndex =
        (selectedVoucherIndex - 1 + selectedVoucher.voucherCodes.length) %
        selectedVoucher.voucherCodes.length;
      setSelectedVoucherIndex(prevIndex);
    }
  };

  const formatVoucherCode = (code) => {
    if (!code) return "";
    return code.replace(/(.{3})(?=.)/g, "$1-");
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex space-x-4 mb-4">
        <Search
          placeholder="Tên mã giảm giá"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={onSearch}
          className="flex-1"
        />
        <RangePicker
          className="flex-1"
          onChange={(dates) => {
            setStartDate(dates ? dates[0].format("YYYY-MM-DD") : null);
            setEndDate(dates ? dates[1].format("YYYY-MM-DD") : null);
          }}
        />
        <Select
          showSearch
          placeholder="Trạng thái"
          optionFilterProp="label"
          onChange={onChange}
          options={[
            { value: "", label: "Tất cả" },
            { value: "UNUSED", label: "Chưa sử dụng" },
            { value: "USED", label: "Đã sử dụng" },
            { value: "EXPIRED", label: "Hết hạn" },
          ]}
          className="flex-1 h-10"
        />
      </div>

      {/* Hiển thị danh sách voucher */}
      <div
        className="overflow-y-auto scrollbar-none"
        style={{ maxHeight: "calc(100vh - 314px)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            vouchers.map((voucher) => (
              <div
                key={voucher.id}
                className="border rounded-lg p-4 flex justify-between"
              >
                <div className="flex">
                  <Image
                    src={voucher.image}
                    alt={voucher.title}
                    width={80}
                    className="rounded-lg"
                  />
                  <div
                    className="flex justify-between items-center ml-4 cursor-pointer"
                    onClick={() => handleMenuClick(voucher)}
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{voucher.title}</h3>
                      <p className="text-gray-500">
                        Hạn sử dụng: {voucher.voucherCodes[0].startDate} -{" "}
                        {voucher.voucherCodes[0].endDate}
                      </p>
                    </div>
                  </div>
                </div>
                <Dropdown
                  overlay={
                    <Menu
                      items={[
                        {
                          label: "Sửa",
                          key: "edit",
                        },
                        {
                          label: "Xóa",
                          key: "delete",
                        },
                      ]}
                    />
                  }
                >
                  <HiOutlineDotsHorizontal className="cursor-pointer" />
                </Dropdown>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <VoucherDetail
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        selectedVoucher={selectedVoucher}
        selectedVoucherIndex={selectedVoucherIndex}
        goPrevVoucher={goPrevVoucher}
        goNextVoucher={goNextVoucher}
        formatVoucherCode={formatVoucherCode}
      />
    </div>
  );
};

export default VoucherList;
