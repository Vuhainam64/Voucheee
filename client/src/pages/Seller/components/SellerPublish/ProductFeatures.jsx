import React from "react";
import { Form, Select } from "antd";

const ProductFeatures = () => {
  const handleProductChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="bg-white px-6 rounded-xl py-6">
      <div className="text-2xl font-semibold">Đặc tính sản phẩm</div>
      <div className="text-gray-500">
        Cung cấp đầy đủ đặc tính sản phẩm để tối ưu kết quả tìm kiếm sản phẩm.
      </div>
      <div className="flex items-center space-x-4">
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
            defaultValue="Hoàng Yến"
            onChange={handleProductChange}
            options={[
              { value: "Hoàng Yến", label: "Hoàng Yến" },
              { value: "Grab", label: "Grab" },
              { value: "Kichi", label: "Kichi" },
              { value: "Gogi", label: "Gogi" },
            ]}
          />
        </Form.Item>

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
            defaultValue="GiftPop"
            onChange={handleProductChange}
            options={[
              { value: "GiftPop", label: "GiftPop" },
              { value: "Urbox", label: "Urbox" },
              { value: "Utop", label: "Utop" },
              { value: "Wogi", label: "Wogi" },
              { value: "Gotit", label: "Gotit" },
            ]}
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default ProductFeatures;
