import React, { useState } from "react";
import { DatePicker, Dropdown, Modal, Select, Space, Tabs } from "antd";

import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const IncomeStatement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = [
    {
      label: <div>Tổng quan giao dịch (pdf)</div>,
      key: "0",
    },
    {
      label: <div>Chi tiết giao dịch (excel)</div>,
      key: "1",
    },
    {
      label: <div>Chi tiết giao dịch (csv)</div>,
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: <div>Xuất tất cả nhật ký</div>,
      key: "4",
    },
  ];

  const tabs = [
    {
      key: "1",
      label: "Sao kê tuần",
      children: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-gray-400">26 Sep - 02 Oct 2022</div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <div
                onClick={(e) => e.preventDefault()}
                className="text-primary cursor-pointer"
              >
                <Space>
                  Tải xuống
                  <FaChevronDown />
                </Space>
              </div>
            </Dropdown>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-400">12 Sep - 18 Sep 2022</div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <div
                onClick={(e) => e.preventDefault()}
                className="text-primary cursor-pointer"
              >
                <Space>
                  Tải xuống
                  <FaChevronDown />
                </Space>
              </div>
            </Dropdown>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-400">04 Apr - 10 Apr 2022</div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <div
                onClick={(e) => e.preventDefault()}
                className="text-primary cursor-pointer"
              >
                <Space>
                  Tải xuống
                  <FaChevronDown />
                </Space>
              </div>
            </Dropdown>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-400">14 Feb - 20 Feb 2022</div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <div
                onClick={(e) => e.preventDefault()}
                className="text-primary cursor-pointer"
              >
                <Space>
                  Tải xuống
                  <FaChevronDown />
                </Space>
              </div>
            </Dropdown>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Sao kê tháng",
      children: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-gray-400">01 Sep - 30 Sep 2022</div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <div
                onClick={(e) => e.preventDefault()}
                className="text-primary cursor-pointer"
              >
                <Space>
                  Tải xuống
                  <FaChevronDown />
                </Space>
              </div>
            </Dropdown>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-400">01 Apr - 30 Apr 2022</div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <div
                onClick={(e) => e.preventDefault()}
                className="text-primary cursor-pointer"
              >
                <Space>
                  Tải xuống
                  <FaChevronDown />
                </Space>
              </div>
            </Dropdown>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-400">01 Feb - 28 Feb 2022</div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <div
                onClick={(e) => e.preventDefault()}
                className="text-primary cursor-pointer"
              >
                <Space>
                  Tải xuống
                  <FaChevronDown />
                </Space>
              </div>
            </Dropdown>
          </div>
        </div>
      ),
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dateOnChange = () => {
    // handle date change
  };

  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-xl">Báo cáo thu nhập</div>
        <div className="flex items-center justify-between text-primary space-x-2">
          <div onClick={showModal} className="cursor-pointer">
            Xem thêm
          </div>
          <FaChevronRight />
        </div>
      </div>

      <Tabs defaultActiveKey="1" items={tabs} onChange={onChange} />

      <Modal
        title="Tải sao kê"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col space-y-2 my-4">
          <div className="font-semibold">Lựa chọn tháng</div>
          <DatePicker
            onChange={dateOnChange}
            picker="month"
            style={{
              width: "70%",
            }}
          />
          <div className="font-semibold">Tải định dạng</div>
          <Select
            showSearch
            placeholder="Lựa chọn định dạng"
            optionFilterProp="label"
            options={[
              {
                value: "pdf",
                label: "Tổng quan giao dịch (pdf)",
              },
              {
                value: "excel",
                label: "Chi tiết giao dịch (excel)",
              },
              {
                value: "csv",
                label: "Chi tiết giao dịch (csv)",
              },
              {
                value: "full",
                label: "Xuất tất cả nhật ký",
              },
            ]}
            style={{
              width: "70%",
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default IncomeStatement;
