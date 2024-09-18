import React, { useState } from "react";
import { Form, Input, TreeSelect, Upload } from "antd";

import { PlusOutlined } from "@ant-design/icons";

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "E-Voucher",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Vui chơi giải trí",
        value: "0-0-1",
        key: "0-0-1",
      },
      {
        title: "Sức khoẻ và làm đẹp",
        value: "0-0-2",
        key: "0-0-2",
      },
      {
        title: "Ăn uống",
        value: "0-0-3",
        key: "0-0-3",
      },
      {
        title: "Du lịch - Khách sạn",
        value: "0-0-4",
        key: "0-0-4",
      },
      {
        title: "Booking Golf",
        value: "0-0-5",
        key: "0-0-5",
      },
      {
        title: "Khoá học - Đào tạo",
        value: "0-0-6",
        key: "0-0-6",
      },
      {
        title: "Quà tặng",
        value: "0-0-7",
        key: "0-0-7",
      },
      {
        title: "Mã giảm giá",
        value: "0-0-8",
        key: "0-0-8",
      },
    ],
  },
  {
    title: "E-Gift",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Voucher giảm giá %",
        value: "0-1-0",
        key: "0-1-0",
      },
    ],
  },
  {
    title: "E-Ticket",
    value: "0-2",
    key: "0-2",
    children: [
      {
        title: "Vé xem phim",
        value: "0-2-1",
        key: "0-2-1",
      },
      {
        title: "Khu vui chơi",
        value: "0-2-2",
        key: "0-2-2",
      },
      {
        title: "Điểm tham quan",
        value: "0-2-3",
        key: "0-2-3",
      },
      {
        title: "Sân khấu",
        value: "0-2-4",
        key: "0-2-4",
      },
      {
        title: "Nghệ thuật",
        value: "0-2-5",
        key: "0-2-5",
      },
      {
        title: "Liveshow",
        value: "0-2-6",
        key: "0-2-6",
      },
      {
        title: "Thể thao",
        value: "0-2-7",
        key: "0-2-7",
      },
      {
        title: "Hội thảo khoa học",
        value: "0-2-8",
        key: "0-2-8",
      },
      {
        title: "Tour du lịch",
        value: "0-2-9",
        key: "0-2-9",
      },
      {
        title: "Vé du thuyền",
        value: "0-2-10",
        key: "0-2-10",
      },
      {
        title: "Sim thẻ",
        value: "0-2-11",
        key: "0-2-11",
      },
      {
        title: "Vé tàu",
        value: "0-2-12",
        key: "0-2-12",
      },
      {
        title: "Vé xe khách",
        value: "0-2-13",
        key: "0-2-13",
      },
      {
        title: "Vé cáp treo",
        value: "0-2-14",
        key: "0-2-14",
      },
      {
        title: "Vé xem phim",
        value: "0-2-15",
        key: "0-2-15",
      },
      {
        title: "Vé máy bay",
        value: "0-2-16",
        key: "0-2-16",
      },
      {
        title: "Vé phòng chờ sân bay",
        value: "0-2-17",
        key: "0-2-17",
      },
    ],
  },
];

const BasicInformation = () => {
  const [value, setValue] = useState(["0-0-0"]);

  const onChange = (newValue) => {
    console.log("onChange ", newValue);
    setValue(newValue);
  };

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="bg-white px-6 rounded-xl py-6">
      <div className="text-2xl font-semibold pb-6">Thông tin cơ bản</div>
      <Form.Item
        label="Tên sản phẩm"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        name="productName"
        rules={[
          {
            required: true,
            message: "Please input your voucher name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Danh mục ngành hàng"
        name="categoryName"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[
          {
            required: true,
            message: "Please input your category!",
          },
        ]}
      >
        <TreeSelect {...tProps} />
      </Form.Item>
      <Form.Item
        label="Ảnh sản phẩm"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Upload
          action="/*"
          listType="picture-card"
          className="bg-gray-100 p-4 rounded-md"
        >
          <button
            style={{
              border: 0,
              background: "none",
            }}
            type="button"
          >
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </button>
        </Upload>
      </Form.Item>
      <Form.Item
        label="Hình ảnh quảng cáo cho người mua"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Upload
          action="/*"
          listType="picture-card"
          className="bg-gray-100 p-4 rounded-md"
        >
          <button
            style={{
              border: 0,
              background: "none",
            }}
            type="button"
          >
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </button>
        </Upload>
      </Form.Item>
      <Form.Item
        label="Video"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <div className="flex items-center bg-gray-100 p-4 rounded-md">
          <Upload action="/*" listType="picture-card" maxCount={1}>
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
          <div style={{ marginLeft: 16 }}>
            <ul
              style={{ listStyleType: "disc", paddingLeft: "20px" }}
              className="space-y-[2px]"
            >
              <li>Min Kích thước: 480x480 px</li>
              <li>Max Video Chiều dài: 60 giây</li>
              <li>Max Kích thước tập tin: 100MB</li>
              <li>Định Dạng Được Hỗ Trợ: MP4</li>
              <li>New Video có thể mất lên đến 36 giờ để được chấp thuận</li>
            </ul>
          </div>
        </div>
      </Form.Item>
    </div>
  );
};

export default BasicInformation;
