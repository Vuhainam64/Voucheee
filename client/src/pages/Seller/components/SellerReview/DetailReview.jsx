import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Input,
  Select,
  Button,
  Flex,
  Table,
  Image,
  Rate,
  message,
} from "antd";

import { FaRegCopy } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

import { getAllRatingBySeller } from "../../../../api/rating";

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

const DetailReview = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [filters, setFilters] = useState({
    modalId: "",
    qualityStar: null,
    serviceStar: null,
    sellerStar: null,
  });

  const fetchReviews = async () => {
    try {
      const data = await getAllRatingBySeller(
        filters.modalId,
        filters.qualityStar,
        filters.serviceStar,
        filters.sellerStar,
        filters.minAverageStar,
        filters.maxAverageStar
      );
      setDataSource(
        data.results.map((item) => ({
          key: item.id,
          content: (
            <div className="space-y-2">
              <div
                onClick={() => handleCopy(item.orderId || "Không có")}
                className="flex items-center space-x-2"
              >
                <div>ID Đơn hàng:</div>
                <div className="text-primary flex items-center space-x-2 cursor-pointer">
                  <div>{item.orderId || "Không có"}</div> <FaRegCopy />
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="font-semibold">Nội dung chính:</div>
                <div>{item.comment || "Không có nội dung"}</div>
              </div>
              <div className="space-x-4">
                {item.medias.map((media, index) => (
                  <Image
                    key={index}
                    width={60}
                    className="rounded-xl"
                    src={media}
                  />
                ))}
              </div>
              <div className="text-gray-400">
                Đã tạo: {new Date(item.createDate).toLocaleString()}
              </div>
            </div>
          ),
          rate: (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Đánh giá tổng quát:</div>
                <Rate allowHalf defaultValue={item.totalStar} disabled />
              </div>
              <div className="flex items-center justify-between">
                <div className="">Chất lượng sản phẩm:</div>
                <Rate allowHalf defaultValue={item.qualityStar} disabled />
              </div>
              <div className="flex items-center justify-between">
                <div className="">Dịch vụ sử dụng:</div>
                <Rate allowHalf defaultValue={item.serviceStar} disabled />
              </div>
              <div className="flex items-center justify-between">
                <div className="">Nhà bán hàng:</div>
                <Rate allowHalf defaultValue={item.sellerStar} disabled />
              </div>
            </div>
          ),
          product: (
            <div className="space-y-2">
              <div
                onClick={() => handleCopy(item.modalId)}
                className="flex items-center space-x-2"
              >
                <div>ID Sản phẩm:</div>
                <div className="text-primary flex items-center space-x-2 cursor-pointer">
                  <div>{item.modalId}</div> <FaRegCopy />
                </div>
              </div>
              <div>{item.modalName}</div>
              <div className="space-x-4">
                <Image
                  width={60}
                  className="rounded-xl"
                  src={item.modalImage}
                />
              </div>
              <div className="text-gray-400">
                Nhà cung cấp: {item.supplierName}
              </div>
            </div>
          ),
          action: (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Image
                  width={25}
                  className="rounded-full"
                  src={item.sellerImage}
                />
                <div>{item.sellerName}</div>
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
        }))
      );
    } catch (err) {
      message.error("Lỗi khi lấy dữ liệu đánh giá!");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [filters]);

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

  const handleCopy = (text) => {
    if (!navigator.clipboard) {
      message.error("Trình duyệt không hỗ trợ sao chép!");
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success("Đã sao chép!");
      })
      .catch(() => {
        message.error("Sao chép thất bại!");
      });
  };

  const onSearchQuantityStar = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      qualityStar: value,
    }));
  };

  const onSearchServiceStar = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      serviceStar: value,
    }));
  };

  const onSearchSellerStar = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sellerStar: value,
    }));
  };

  const onSearchModalId = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      modalId: value,
    }));
  };

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
            defaultValue="Dịch vụ sử dụng"
            options={[
              { value: "", label: "Tất cả" },
              { value: "1", label: "1 sao" },
              { value: "2", label: "2 sao" },
              { value: "3", label: "3 sao" },
              { value: "4", label: "4 sao" },
              { value: "5", label: "5 sao" },
            ]}
            className="flex-1"
            onChange={onSearchServiceStar}
          />
          <Select
            defaultValue="Chất lượng sản phẩm"
            options={[
              { value: "", label: "Tất cả" },
              { value: "1", label: "1 sao" },
              { value: "2", label: "2 sao" },
              { value: "3", label: "3 sao" },
              { value: "4", label: "4 sao" },
              { value: "5", label: "5 sao" },
            ]}
            className="flex-1"
            onChange={onSearchQuantityStar}
          />
          <Select
            defaultValue="Nhà bán hàng"
            options={[
              { value: "", label: "Tất cả" },
              { value: "1", label: "1 sao" },
              { value: "2", label: "2 sao" },
              { value: "3", label: "3 sao" },
              { value: "4", label: "4 sao" },
              { value: "5", label: "5 sao" },
            ]}
            className="flex-1"
            onChange={onSearchSellerStar}
          />
        </div>

        {/* Hàng Search và RangePicker */}
        <div className="flex space-x-4">
          <Search
            placeholder="ID Sản Phẩm"
            className="flex-1"
            onSearch={onSearchModalId}
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
