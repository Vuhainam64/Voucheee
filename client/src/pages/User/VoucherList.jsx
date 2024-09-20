import React from "react";
import { DatePicker, Dropdown, Input, Select, Menu } from "antd";

import { HiOutlineDotsHorizontal } from "react-icons/hi";

const { RangePicker } = DatePicker;
const { Search } = Input;

const VoucherList = () => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Function to generate dynamic menu based on passed props
  const createMenu = (voucherId) => (
    <Menu>
      <Menu.Item key="0" onClick={() => handleMenuClick(voucherId, "Chi tiết")}>
        Chi tiết
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={() => handleMenuClick(voucherId, "Đã sử dụng")}
      >
        Đã sử dụng
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleMenuClick(voucherId, "Mua lại")}>
        Mua lại
      </Menu.Item>
    </Menu>
  );

  // Handle menu click based on voucher and action type
  const handleMenuClick = (voucherId, action) => {
    console.log(`Voucher ${voucherId}: ${action}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      {/* Search, Date Picker, and Status Selector in one row */}
      <div className="flex space-x-4 mb-4">
        <Search
          placeholder="Tên mã giảm giá"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={onSearch}
          className="flex-1"
        />
        <RangePicker className="flex-1" />
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
          className="flex-1"
        />
      </div>

      {/* Grid of voucher cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((voucher) => (
          <div
            key={voucher}
            className="border rounded-lg p-4 flex justify-between"
          >
            <div className="flex">
              <img
                src={`https://via.placeholder.com/150?text=Voucher+${voucher}`}
                alt={`Voucher ${voucher}`}
                className="w-20 h-20 mr-4 rounded-lg"
              />
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">
                    Tên Voucher {voucher}
                  </h3>
                  <p className="text-gray-500">Hạn sử dụng: 2024-12-31</p>
                </div>
              </div>
            </div>
            <Dropdown
              overlay={createMenu(voucher)}
              trigger={["click"]}
              className="cursor-pointer"
            >
              <HiOutlineDotsHorizontal />
            </Dropdown>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoucherList;
