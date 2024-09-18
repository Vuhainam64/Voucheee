import React from "react";
import { Form, Input, Switch, Button, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const PriceStockVariations = () => {
  return (
    <div className="bg-white px-6 rounded-xl py-6">
      <div className="text-2xl font-semibold">
        Giá bán, Kho hàng và Biến thể
      </div>
      <div className="text-gray-500">
        Tạo biến thể nếu sản phẩm có hơn một tùy chọn, ví dụ như về giá cả hoặc
        nơi sử dụng đặc biệt
      </div>
      <div className="flex items-center space-x-4">
        <Form.Item
          label="Giá bán"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="curentPrice"
          className="flex-1"
          rules={[
            {
              required: true,
              message: "Please input your voucher current Price!",
            },
          ]}
        >
          <Input addonAfter="₫" min={0} type="number" step="1000" />
        </Form.Item>
        <Form.Item
          label="Giá gốc"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="originalPrice"
          className="flex-1"
          rules={[
            {
              required: true,
              message: "Please input your voucher original Price!",
            },
          ]}
        >
          <Input addonAfter="₫" min={0} type="number" step="1000" />
        </Form.Item>
        <Form.Item
          label="Kho hàng"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="stock"
          className="flex-1"
          rules={[
            {
              required: true,
              message: "Please input your stock!",
            },
          ]}
        >
          <Input type="number" min={0} max={10000} defaultValue={1} />
        </Form.Item>
        <Form.Item
          label="Mở bán"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="isOpen"
          className="flex-1"
          rules={[
            {
              required: true,
              message: "Please choose open or not!",
            },
          ]}
        >
          <Switch defaultChecked={true} />
        </Form.Item>
      </div>

      {/* Variants Section */}
      <Form.List name="variants">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <div key={field.key} className="mt-4 p-4 border rounded-lg">
                <Form.Item
                  label="Tên biến thể"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name={[field.name, "variantName"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input the variant name!",
                    },
                  ]}
                >
                  <Input placeholder="Variant Name" />
                </Form.Item>
                <div className="flex items-center space-x-4">
                  <Form.Item
                    label="Giá bán"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="curentPrice"
                    className="flex-1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your voucher current Price!",
                      },
                    ]}
                  >
                    <Input addonAfter="₫" min={0} type="number" step="1000" />
                  </Form.Item>
                  <Form.Item
                    label="Giá gốc"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="originalPrice"
                    className="flex-1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your voucher original Price!",
                      },
                    ]}
                  >
                    <Input addonAfter="₫" min={0} type="number" step="1000" />
                  </Form.Item>
                  <Form.Item
                    label="Kho hàng"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="stock"
                    className="flex-1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your stock!",
                      },
                    ]}
                  >
                    <Input type="number" min={0} max={10000} defaultValue={1} />
                  </Form.Item>
                  <Form.Item
                    label="Mở bán"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="isOpen"
                    className="flex-1"
                    rules={[
                      {
                        required: true,
                        message: "Please choose open or not!",
                      },
                    ]}
                  >
                    <Switch defaultChecked={true} />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Ảnh"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name={[field.name, "variantImage"]}
                  rules={[
                    {
                      required: true,
                      message: "Please upload an image!",
                    },
                  ]}
                >
                  <Upload
                    listType="picture-card"
                    beforeUpload={() => false} // Prevent automatic upload
                    maxCount={8} // Limit to 8 images
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
                <Button type="dashed" onClick={() => remove(field.name)} block>
                  Xoá
                </Button>
              </div>
            ))}
            <Button type="dashed" onClick={() => add()} block>
              + Thêm biến thể
            </Button>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default PriceStockVariations;
