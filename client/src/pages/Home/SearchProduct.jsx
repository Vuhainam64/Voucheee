import React from "react";
import { Link } from "react-router-dom";
import { Tree, Slider, Tooltip, Checkbox, Select } from "antd";

import { PiWarningCircleFill } from "react-icons/pi";

import { Hero, Test } from "../../assets/img";

// Dữ liệu danh mục
const categoryOptions = [
  {
    title: "E-Voucher",
    value: "0-0",
    key: "0-0",
    children: [
      { title: "Vui chơi giải trí", value: "0-0-1", key: "0-0-1" },
      { title: "Sức khoẻ và làm đẹp", value: "0-0-2", key: "0-0-2" },
      { title: "Ăn uống", value: "0-0-3", key: "0-0-3" },
      { title: "Du lịch - Khách sạn", value: "0-0-4", key: "0-0-4" },
      { title: "Booking Golf", value: "0-0-5", key: "0-0-5" },
      { title: "Khoá học - Đào tạo", value: "0-0-6", key: "0-0-6" },
      { title: "Quà tặng", value: "0-0-7", key: "0-0-7" },
      { title: "Mã giảm giá", value: "0-0-8", key: "0-0-8" },
    ],
  },
  {
    title: "E-Gift",
    value: "0-1",
    key: "0-1",
    children: [{ title: "Voucher giảm giá %", value: "0-1-0", key: "0-1-0" }],
  },
  {
    title: "E-Ticket",
    value: "0-2",
    key: "0-2",
    children: [
      { title: "Vé xem phim", value: "0-2-1", key: "0-2-1" },
      { title: "Khu vui chơi", value: "0-2-2", key: "0-2-2" },
      { title: "Điểm tham quan", value: "0-2-3", key: "0-2-3" },
      { title: "Sân khấu", value: "0-2-4", key: "0-2-4" },
      { title: "Nghệ thuật", value: "0-2-5", key: "0-2-5" },
      { title: "Liveshow", value: "0-2-6", key: "0-2-6" },
      { title: "Thể thao", value: "0-2-7", key: "0-2-7" },
      { title: "Hội thảo khoa học", value: "0-2-8", key: "0-2-8" },
      { title: "Tour du lịch", value: "0-2-9", key: "0-2-9" },
      { title: "Vé du thuyền", value: "0-2-10", key: "0-2-10" },
      { title: "Sim thẻ", value: "0-2-11", key: "0-2-11" },
      { title: "Vé tàu", value: "0-2-12", key: "0-2-12" },
      { title: "Vé xe khách", value: "0-2-13", key: "0-2-13" },
      { title: "Vé cáp treo", value: "0-2-14", key: "0-2-14" },
      { title: "Vé xem phim", value: "0-2-15", key: "0-2-15" },
      { title: "Vé máy bay", value: "0-2-16", key: "0-2-16" },
      { title: "Vé phòng chờ sân bay", value: "0-2-17", key: "0-2-17" },
    ],
  },
];

// Dữ liệu thương hiệu
const brandOptions = [
  { label: "Thương hiệu A", value: "brand-a" },
  { label: "Thương hiệu B", value: "brand-b" },
  { label: "Thương hiệu C", value: "brand-c" },
  { label: "Thương hiệu D", value: "brand-d" },
  { label: "Thương hiệu E", value: "brand-e" },
  { label: "Thương hiệu F", value: "brand-f" },
];

const SearchProduct = () => {
  const [priceRange, setPriceRange] = React.useState([5000, 5000000]);
  const [selectedBrands, setSelectedBrands] = React.useState([]);

  const onCheck = (checkedKeys) => {
    console.log("Checked keys:", checkedKeys);
  };

  const onChange = (value) => {
    setPriceRange(value);
  };

  const onBrandChange = (checkedValues) => {
    setSelectedBrands(checkedValues);
    console.log("Selected brands:", checkedValues, selectedBrands);
  };

  return (
    <div className="bg-gray-100 flex-grow">
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-4 gap-4 py-4">
        <div className="space-y-4">
          {/* Danh mục */}
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-xl">Danh mục</div>
            <Tree
              treeData={categoryOptions}
              checkable
              onCheck={onCheck}
              defaultExpandAll
              className="overflow-y-auto h-[158px] scrollbar-thin"
            />
          </div>

          {/* Thương hiệu */}
          <div className="bg-white p-4 rounded-lg space-y-2">
            <div className="font-bold text-xl">Thương hiệu</div>
            <div className="overflow-y-auto scrollbar-thin h-[250px]">
              <Checkbox.Group
                options={brandOptions}
                onChange={onBrandChange}
                className="flex flex-col space-y-2 px-4"
              />
            </div>
          </div>

          {/* Khoảng giá */}
          <div className="bg-white p-4 rounded-lg">
            <div className="font-bold text-xl">Khoảng giá</div>
            <Slider
              range
              min={5000}
              max={10000000}
              onChange={onChange}
              value={priceRange}
              marks={{
                5000: "5K",
                5000000: "5M",
                10000000: "10M",
              }}
              step={1000}
            />
            <div className="flex space-x-1">
              <div>
                Giá: {priceRange[0].toLocaleString()} -{" "}
                {priceRange[1].toLocaleString()}
              </div>
              <Tooltip title="Giá trị K,M tương ứng với 1.000, 1.000.000">
                <PiWarningCircleFill />
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Kết quả tìm kiếm */}
        <div className="col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-lg flex items-center justify-between">
            <div className="font-bold">Tìm thấy 100 kết quả</div>
            <div className="flex items-center space-x-2">
              <div>Sắp xếp theo:</div>
              <Select
                defaultValue="Sắp xếp"
                style={{ width: 120 }}
                options={[
                  { value: "time", label: "Mới nhất" },
                  { value: "topsell", label: "Bán chạy" },
                  { value: "ascending", label: "Tăng dần" },
                  { value: "decreasing", label: "Giảm dần" },
                ]}
              />
            </div>
          </div>

          {/* Card sản phẩm */}
          <div
            className="grid grid-cols-4 gap-4 overflow-y-auto scrollbar-none"
            style={{ maxHeight: "calc(100vh - 298px)" }}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <Link
                to={`/detail/${index + 1}`}
                key={index}
                className="bg-white rounded-lg shadow-lg flex flex-col hover:no-underline"
              >
                <div className="relative">
                  <img
                    src={Hero}
                    alt=""
                    className="h-40 w-full object-cover rounded-t-lg"
                  />
                  <div className="bg-black h-full w-full rounded-t-lg opacity-10 absolute top-0 left-0"></div>
                  <div className="absolute px-2 py-1 rounded-xl bg-primary text-white top-2 left-2">
                    Giảm 25%
                  </div>
                  <div className="absolute px-2 py-1 rounded-xl bottom-2 left-2">
                    <div className="flex items-center justify-center text-white">
                      <img src={Test} alt="" className="w-8 h-8 rounded-full" />
                      <div className="ml-2">
                        Thai Express - Món Thái - 8 chi nhánh
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <div className="text-gray-800">
                    Voucher giảm 120.000đ ăn tại nhà hàng
                  </div>
                  <div className="text-gray-600">T2-CN 10:00-22:00</div>
                  <div className="font-semibold text-lg text-primary">
                    100.000đ
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
