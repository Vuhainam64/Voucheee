import React, { useEffect, useState } from "react";
import { Form, Select, Spin } from "antd";

import { MdGpsFixed } from "react-icons/md";

import { getAllSupplier } from "../../../../api/supplier";
import { getBrandByName, getBrand } from "../../../../api/brand";

const ProductFeatures = ({ setBrandId, setSupplierId }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [brandDetails, setBrandDetails] = useState(null);

  const fetchSuppliers = async () => {
    const data = await getAllSupplier();
    if (data) setSuppliers(data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSupplierChange = (value) => {
    setSupplierId(value);
  };

  const handleBrandChange = async (value) => {
    setBrandId(value);
    const brand = await getBrand(value);
    setBrandDetails(brand);
  };

  const handleBrandSearch = (value) => {
    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(async () => {
      if (value) {
        setLoadingBrands(true);
        const data = await getBrandByName(value);
        if (data) {
          setBrands(
            data.map((brand) => ({
              value: brand.id,
              label: brand.name,
            }))
          );
        }
        setLoadingBrands(false);
      } else {
        setBrands([]);
      }
    }, 500);

    setSearchTimeout(timeout);
  };

  // Mở Google Maps với lat và lon khi nhấn vào địa chỉ
  const handleAddressClick = (lon, lat) => {
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white px-6 rounded-xl py-6">
      <div className="text-2xl font-semibold">Đặc tính sản phẩm</div>
      <div className="text-gray-500">
        Cung cấp đầy đủ đặc tính sản phẩm để tối ưu kết quả tìm kiếm sản phẩm.
      </div>
      <div className="flex items-center space-x-4">
        {/* Select Thương hiệu */}
        <Form.Item
          label="Thương hiệu"
          name="brandName"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="flex-1"
          rules={[
            {
              required: true,
              message: "Please select brand!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Tìm kiếm thương hiệu"
            onSearch={handleBrandSearch}
            onChange={handleBrandChange}
            notFoundContent={loadingBrands ? <Spin size="small" /> : null}
            filterOption={false}
            options={brands}
          />
        </Form.Item>

        {/* Select Nhà cung cấp */}
        <Form.Item
          label="Nhà cung cấp"
          name="supplierName"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="flex-1"
          rules={[
            {
              required: true,
              message: "Please select supplier!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn nhà cung cấp"
            onChange={handleSupplierChange}
            optionFilterProp="label"
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            options={suppliers.map((supplier) => ({
              value: supplier.id,
              label: supplier.name,
            }))}
          />
        </Form.Item>
      </div>

      <div>
        <div className="font-semibold text-lg">
          Địa chỉ cửa hàng/ Nơi sử dụng
        </div>
        <div className="max-h-52 overflow-y-scroll space-y-2">
          {brandDetails &&
            brandDetails.addresses.map((address) => (
              <div
                key={address.id}
                className="flex items-center space-x-2 bg-slate-200 bg-opacity-60 px-4 py-2 rounded-xl cursor-pointer"
                onClick={() => handleAddressClick(address.lon, address.lat)} // Mở Google Maps
              >
                <MdGpsFixed />
                <div>{address.name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;
