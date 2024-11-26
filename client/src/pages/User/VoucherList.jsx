import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Dropdown,
  Input,
  Select,
  Menu,
  Image,
  Modal,
  Button,
} from "antd";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { getMyVoucher } from "../../api/myvoucher";

const { RangePicker } = DatePicker;
const { Search } = Input;

const VoucherList = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const [status, setStatus] = useState("all");
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
    setIsModalVisible(true);
  };

  // Function để đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
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
            { value: "all", label: "Tất cả" },
            { value: "unused", label: "Chưa sử dụng" },
            { value: "used", label: "Đã sử dụng" },
            { value: "expired", label: "Hết hạn" },
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
                  <div className="flex justify-between items-center ml-4">
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
                    <Menu>
                      <Menu.Item
                        key="0"
                        onClick={() => handleMenuClick(voucher)}
                      >
                        Chi tiết
                      </Menu.Item>
                      <Menu.Item key="1">Đã sử dụng</Menu.Item>
                      <Menu.Item key="2">Mua lại</Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                  className="cursor-pointer"
                >
                  <HiOutlineDotsHorizontal />
                </Dropdown>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal để hiển thị voucher code */}
      <Modal
        title="Voucher Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Đóng
          </Button>,
        ]}
      >
        {selectedVoucher && (
          <div>
            <h3>{selectedVoucher.title}</h3>
            <p>
              Voucher Code:{" "}
              {selectedVoucher.voucherCodes[0]?.code || "Chưa có mã"}
            </p>
            <Image
              src={selectedVoucher.voucherCodes[0]?.image || ""}
              alt="Voucher Code"
              width={150}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VoucherList;
