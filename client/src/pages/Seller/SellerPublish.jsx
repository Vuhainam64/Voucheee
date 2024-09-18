import React from "react";
import { Alert, Anchor, Button, Form } from "antd";

import { AiFillAccountBook } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";

import {
  BasicInformation,
  PriceStockVariations,
  ProductDescription,
  ProductFeatures,
} from "./components/SellerPublish";

const SellerPublish = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full h-full p-8 flex flex-col">
      <div className="flex items-center space-x-2">
        <AiFillAccountBook className="text-xl" />
        <div>Sản Phẩm</div>
        <FaChevronRight />
        <div>Thêm Sản Phẩm</div>
      </div>

      <div className="text-2xl font-semibold py-4">Thêm sản phẩm</div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-4">
          <Form
            name="addVoucher"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete
            className="space-y-6"
          >
            <div id="part-1">
              <BasicInformation />
            </div>
            <div id="part-2">
              <ProductFeatures />
            </div>
            <div id="part-3">
              <PriceStockVariations />
            </div>
            <div id="part-4">
              <ProductDescription />
            </div>
            <div className="bg-white px-6 rounded-xl py-6 flex justify-between space-x-4">
              <div className="flex-1">
                <Alert
                  message="Danh mục sản phẩm là bằng tay lựa chọn. Sản phẩm với sai Category sẽ bị đình chỉ."
                  type="warning"
                  showIcon
                />
              </div>
              <div className="flex items-center space-x-4">
                <Button>Lưu bản nháp</Button>
                <Button type="primary">Gửi đi</Button>
              </div>
            </div>
          </Form>
        </div>

        <div className="sticky top-4">
          <Anchor
            items={[
              {
                key: "part-1",
                href: "#part-1",
                title: "Thông tin cơ bản",
              },
              {
                key: "part-2",
                href: "#part-2",
                title: "Đặc tính sản phẩm",
              },
              {
                key: "part-3",
                href: "#part-3",
                title: "Giá bán, Kho hàng và Biến thể",
              },
              {
                key: "part-4",
                href: "#part-4",
                title: "Mô tả sản phẩm",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerPublish;
