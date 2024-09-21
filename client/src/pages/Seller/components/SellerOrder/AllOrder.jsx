import React, { useState } from "react";
import { DatePicker, Input, Select, Button, Flex, Table, Image } from "antd";

import { FaRegCopy } from "react-icons/fa";
import { AiOutlinePrinter } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const { Search } = Input;
const { RangePicker } = DatePicker;

const columns = [
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Tổng cộng",
    dataIndex: "price",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
  },
];

const dataSource = Array.from({
  length: 10,
}).map((_, i) => ({
  key: i,
  product: (
    <div className="space-y-2">
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
        <div>(1 sản phẩm)</div>
        <div className="flex items-center space-x-2">
          <div>ID Đơn hàng:</div>
          <div className="text-primary flex items-center space-x-2 cursor-pointer">
            <div>{i + 834123488}</div> <FaRegCopy />
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Image
          width={60}
          className="rounded-xl"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <div>
          <div>
            Canvas Hotel Đà Nẵng - Nghỉ dưỡng phòng Grand Beach Front Triple
          </div>
          <div className="text-gray-400">Đã tạo: 21 thg 2 2022</div>
        </div>
      </div>
    </div>
  ),
  price: <div>57.800đ</div>,
  status: (
    <div>
      <div className="font-semibold">Chờ xử lý</div>
      <div className="flex items-center space-x-2">
        <AiOutlinePrinter />
        <div>Hoá đơn</div>
      </div>
    </div>
  ),
  action: (
    <Button type="primary" className="w-full">
      Chuẩn bị hàng và Gửi
    </Button>
  ),
}));

const AllOrder = () => {
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
      <div className="bg-white px-4 py-6 rounded-lg">
        <div className="flex space-x-4 items-center">
          <Select
            defaultValue="Ngày đặt hàng"
            options={[
              {
                value: "today",
                label: "Ngày hôm nay",
              },
              {
                value: "yesterday",
                label: "Ngày hôm qua",
              },
              {
                value: "7days",
                label: "7 ngày trước",
              },
              {
                value: "month",
                label: "1 tháng trước",
              },
            ]}
            className="flex-1"
          />
          <RangePicker className="flex-1" />
          <Search placeholder="ID đơn hàng" allowClear className="flex-1" />
          <Search placeholder="Mã vận đơn" allowClear className="flex-1" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg pb-8">
        <Flex gap="middle" vertical>
          <Flex align="center" gap="middle">
            {hasSelected ? `Đã chọn ${selectedRowKeys.length} đơn hàng` : null}
            <Button
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
            >
              Xuất hoá đơn
            </Button>
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

export default AllOrder;
