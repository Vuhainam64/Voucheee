import React, { useState } from "react";
import {
  DatePicker,
  Input,
  Select,
  Button,
  Flex,
  Table,
  Image,
  Rate,
} from "antd";

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";

const { Search } = Input;
const { RangePicker } = DatePicker;

const columns = [
  {
    title: "Nội dung",
    dataIndex: "content",
  },
  {
    title: "Đánh giá",
    dataIndex: "rate",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const dataSource = Array.from({
  length: 10,
}).map((_, i) => ({
  key: i,
  content: (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div>ID Đơn hàng:</div>
        <div className="text-primary flex items-center space-x-2 cursor-pointer">
          <div>{i + 834123488}</div> <FaRegCopy />
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="font-semibold">Nội dung chính:</div>
        <div>Sản phẩm như hình, treo đồ ổn,để theo dõi thêm</div>
      </div>
      <div className="space-x-4">
        <Image
          width={60}
          className="rounded-xl"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <Image
          width={60}
          className="rounded-xl"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </div>
      <div className="text-gray-400">Đã tạo: 21 thg 2 2022</div>
    </div>
  ),
  rate: (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Đánh giá tổng quát:</div>
        <Rate allowHalf defaultValue={4.5} disabled />
      </div>
      <div className="flex items-center justify-between">
        <div className="">Chất lượng sản phẩm:</div>
        <Rate allowHalf defaultValue={5} disabled />
      </div>
      <div className="flex items-center justify-between">
        <div className="">Dịch vụ sử dụng:</div>
        <Rate allowHalf defaultValue={4} disabled />
      </div>
      <div className="flex items-center justify-between">
        <div className="">Nhà bán hàng:</div>
        <Rate allowHalf defaultValue={4} disabled />
      </div>
    </div>
  ),
  product: (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div>ID Sản phẩm:</div>
        <div className="text-primary flex items-center space-x-2 cursor-pointer">
          <div>{i + 834123488}</div> <FaRegCopy />
        </div>
      </div>
      <div>
        Canvas Hotel Đà Nẵng - Nghỉ dưỡng phòng Grand Beach Front Triple
      </div>
      <div className="space-x-4">
        <Image
          width={60}
          className="rounded-xl"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </div>
      <div className="text-gray-400">Nhà cung cấp: GiftPop</div>
    </div>
  ),
  action: (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Image
          width={25}
          className="rounded-full"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <div>Nguyễn Thường Xuân</div>
        <div className="cursor-pointer text-primary">
          <IoChatbubbleEllipsesOutline />
        </div>
      </div>
      <div className="space-y-4">
        <Button type="primary" className="w-full">
          Trả Lời
        </Button>
        <Button type="primary" className="w-full">
          Báo Cáo Đánh Giá
        </Button>
      </div>
    </div>
  ),
}));

const DetailReview = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="space-y-4">
      {/* Lọc đánh giá  */}
      <div className="bg-white p-4 rounded-lg pb-8">
        <div className="flex items-center justify-between pb-4">
          <div className="font-bold text-xl">Lọc đánh giá</div>
          <Button>Đặt lại</Button>
        </div>
        {/* Hàng Select */}
        <div className="flex space-x-4 mb-4">
          <Select
            defaultValue="Trạng thái"
            options={[
              { value: "replied", label: "Đã trả lời" },
              { value: "notRespond", label: "Chưa trả lời" },
            ]}
            className="flex-1"
          />
          <Select
            defaultValue="Nội dung"
            options={[
              { value: "description", label: "Kèm nội dung" },
              { value: "imageVideo", label: "Kèm hình ảnh/video" },
            ]}
            className="flex-1"
          />
          <Select
            defaultValue="Đánh giá tổng quát"
            options={[
              { value: "1", label: "1 sao" },
              { value: "2", label: "2 sao" },
              { value: "3", label: "3 sao" },
              { value: "4", label: "4 sao" },
              { value: "5", label: "5 sao" },
            ]}
            className="flex-1"
          />
          <Select
            defaultValue="Chất lượng sản phẩm"
            options={[
              { value: "1", label: "1 sao" },
              { value: "2", label: "2 sao" },
              { value: "3", label: "3 sao" },
              { value: "4", label: "4 sao" },
              { value: "5", label: "5 sao" },
            ]}
            className="flex-1"
          />
          <Select
            defaultValue="Nhà bán hàng"
            options={[
              { value: "1", label: "1 sao" },
              { value: "2", label: "2 sao" },
              { value: "3", label: "3 sao" },
              { value: "4", label: "4 sao" },
              { value: "5", label: "5 sao" },
            ]}
            className="flex-1"
          />
        </div>

        {/* Hàng Search và RangePicker */}
        <div className="flex space-x-4">
          <Search
            placeholder="ID Sản Phẩm"
            className="flex-1"
            // onSearch={onSearch}
          />
          <Search
            placeholder="ID Đơn Hàng"
            className="flex-1"
            // onSearch={onSearch}
          />
          <Search
            placeholder="Người mua"
            className="flex-1"
            // onSearch={onSearch}
          />
          <RangePicker className="flex-1" />
        </div>
      </div>

      {/* bảng đánh giá  */}
      <div className="bg-white p-4 rounded-lg pb-8">
        <Flex gap="middle" vertical>
          <Flex align="center" gap="middle">
            <Button
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
            >
              Phản hồi hàng loạt
            </Button>
            {hasSelected ? `Đã chọn ${selectedRowKeys.length} đánh giá` : null}
          </Flex>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 5 }}
          />
        </Flex>
      </div>
    </div>
  );
};

export default DetailReview;
