import React, { useEffect, useState } from "react";
import { Table, Tag, Tabs, Button } from "antd";
import { FaChevronRight } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { getAllRefund } from "../../api/refundrequest";

const ReturnRequest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0); // 0: PENDING, 1: PROCESSING, 2: COMPLETED
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });

  const fetchRefunds = async (page = 1, statusFilter = status) => {
    setLoading(true);
    try {
      const response = await getAllRefund(statusFilter);
      setData(response.results);
      setPagination({
        ...pagination,
        current: page,
        total: response.metaData.total,
      });
    } catch (error) {
      console.error("Failed to fetch refunds:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, [status]);

  const handleRefund = (voucher) => {
    console.log("Hoàn trả voucher:", voucher);
    // Logic hoàn trả ở đây (gọi API hoặc cập nhật trạng thái)
  };

  const handleReject = (voucher) => {
    console.log("Từ chối voucher:", voucher);
    // Logic từ chối ở đây (gọi API hoặc cập nhật trạng thái)
  };

  const expandedRowRender = (record) => {
    const voucherColumns = [
      {
        title: "Tên Voucher",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Hình ảnh",
        dataIndex: "image",
        key: "image",
        render: (image) => (
          <img
            src={image}
            alt="Voucher"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ),
      },
      {
        title: "Mã Code",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "Thương hiệu",
        dataIndex: "brand",
        key: "brand",
      },
      {
        title: "Ngày bắt đầu",
        dataIndex: "startDate",
        key: "startDate",
      },
      {
        title: "Ngày kết thúc",
        dataIndex: "endDate",
        key: "endDate",
      },
    ];

    const voucherData = record.voucherCode
      ? [
          {
            key: 1,
            name: record.voucherCode.name,
            image: record.voucherCode.image,
            code: record.voucherCode.code,
            brand: record.voucherCode.brand,
            startDate: record.voucherCode.startDate,
            endDate: record.voucherCode.endDate,
          },
        ]
      : [];

    return (
      <Table
        columns={voucherColumns}
        dataSource={voucherData}
        pagination={false}
        rowKey="code"
      />
    );
  };

  const columns = [
    {
      title: "Voucher",
      dataIndex: "voucherCode",
      key: "voucherCode",
      render: (voucher) => (
        <>
          <div>{voucher?.name}</div>
          <img src={voucher?.image} alt={voucher?.name} style={{ width: 50 }} />
        </>
      ),
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplierName",
      key: "supplierName",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "PENDING"
            ? "orange"
            : status === "SUSPECTED"
            ? "red"
            : "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      key: "createDate",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Chức năng",
      key: "action",
      render: (_, voucher) => {
        // Render the buttons only if the status is "Chờ xử lý" (status === 0)
        return status === 0 ? (
          <div className="space-x-2">
            <Button
              onClick={() => handleRefund(voucher)}
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              Hoàn trả
            </Button>
            <Button
              onClick={() => handleReject(voucher)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Từ chối
            </Button>
          </div>
        ) : null; // Don't render buttons for other statuses
      },
    },
  ];

  return (
    <div className="w-full h-screen p-6 space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2">
        <MdOutlineDashboard className="text-xl" />
        <div>Tài Chính</div>
        <FaChevronRight />
        <div>Quản lí hoàn trả</div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-lg p-4 space-y-4">
        <div className="text-xl font-semibold">Quản lí hoàn trả</div>

        {/* Filter */}
        <div className="flex space-x-4">
          <Tabs
            defaultActiveKey={String(status)}
            onChange={(key) => setStatus(Number(key))}
            items={[
              { label: "Chờ xử lý", key: "0" },
              { label: "Đang xử lý", key: "1" },
              { label: "Hoàn tất", key: "2" },
            ]}
          />
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            onChange: (page) => fetchRefunds(page),
          }}
          expandable={{
            expandedRowRender,
            rowExpandable: (record) => record.voucherCode !== undefined, // only expandable if voucherCode exists
          }}
        />
      </div>
    </div>
  );
};

export default ReturnRequest;
