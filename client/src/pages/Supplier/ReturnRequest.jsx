import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Tabs,
  Button,
  Input,
  DatePicker,
  Modal,
  Form,
  Dropdown,
  Menu,
  Image,
} from "antd";
import { FaChevronRight } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { getAllRefund } from "../../api/refundrequest";
import { updateRefundStatus } from "../../api/refundrequest";
import moment from "moment";

const ReturnRequest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });
  const [searchName, setSearchName] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [searchDate, setSearchDate] = useState(null);

  // Modal States
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [reason, setReason] = useState("");
  const [modalStatus, setModalStatus] = useState(1);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleViewDetails = (voucher) => {
    setSelectedDetails(voucher);
    setIsDetailModalVisible(true); // Hiện modal chi tiết
  };

  const closeDetailModal = () => {
    setIsDetailModalVisible(false); // Đóng modal chi tiết
    setSelectedDetails(null);
  };

  const fetchRefunds = async (page = 1, statusFilter = status) => {
    setLoading(true);
    try {
      const response = await getAllRefund(statusFilter);
      let filteredData = response.results;

      // Apply search filters if provided
      if (searchName) {
        filteredData = filteredData.filter((item) =>
          item.voucherCode.name.toLowerCase().includes(searchName.toLowerCase())
        );
      }
      if (searchCode) {
        filteredData = filteredData.filter((item) =>
          item.voucherCode.code.toLowerCase().includes(searchCode.toLowerCase())
        );
      }
      if (searchDate) {
        filteredData = filteredData.filter((item) =>
          moment(item.createDate).isSame(searchDate, "day")
        );
      }

      setData(filteredData);
      setPagination({
        ...pagination,
        current: page,
        total: filteredData.length, // Use filtered data length
      });
    } catch (error) {
      console.error("Failed to fetch refunds:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, [status, searchName, searchCode, searchDate]);

  const handleRefund = (voucher) => {
    setSelectedVoucher(voucher);
    setModalStatus(1); // Set to 'Hoàn tất' by default
    setIsModalVisible(true); // Show the modal
    setIsDetailModalVisible(false); // Close the detail modal if it's open)
  };

  const handleModalSubmit = async () => {
    if (reason.trim() === "") {
      alert("Please provide a reason.");
      return;
    }

    try {
      const response = await updateRefundStatus(
        selectedVoucher.id || selectedDetails.id,
        reason,
        modalStatus
      );

      if (response.result) {
        alert(response.message); // Show success message
        setIsModalVisible(false); // Close the modal
        fetchRefunds(); // Re-fetch the list to reflect the status change
      }
    } catch (error) {
      console.error("Failed to update refund status:", error);
      alert("An error occurred while updating the refund status.");
    }
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
          <img src={image} alt="Voucher" className="w-12 h-12 object-cover" />
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
          <img src={voucher?.image} alt={voucher?.name} className="w-12" />
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
      render: (_, voucher) => (
        <div className="space-x-2">
          <Button
            onClick={(e) => e.stopPropagation()} // Để tránh xung đột với expand row
          >
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1" onClick={() => handleViewDetails(voucher)}>
                    Chi tiết
                  </Menu.Item>
                  {status === 0 && (
                    <Menu.Item key="2" onClick={() => handleRefund(voucher)}>
                      Hoàn trả
                    </Menu.Item>
                  )}
                </Menu>
              }
              trigger={["click"]}
            >
              <div>
                Xem thêm <FaChevronRight className="inline" />
              </div>
            </Dropdown>
          </Button>
        </div>
      ),
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
      <div className="bg-white rounded-lg p-4 space-y-4 shadow-md">
        <div className="text-xl font-semibold">Quản lí hoàn trả</div>

        {/* Search Filters */}
        <div className="flex space-x-4">
          <Input
            placeholder="Tìm tên voucher"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-1/4"
          />
          <Input
            placeholder="Tìm mã voucher"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="w-1/4"
          />
          <DatePicker
            format="YYYY-MM-DD"
            value={searchDate}
            onChange={(date) => setSearchDate(date)}
            placeholder="Chọn ngày"
            className="w-1/4"
          />
        </div>

        {/* Filter by Status */}
        <div className="flex space-x-4 mt-4">
          <Tabs
            defaultActiveKey={String(status)}
            onChange={(key) => setStatus(Number(key))}
            items={[
              { label: "Chờ xử lý", key: "0" },
              { label: "Từ chối", key: "2" },
              { label: "Chấp nhận", key: "1" },
            ]}
            className="w-full"
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

      {/* Modal for Refund or Reject */}
      <Modal
        title={modalStatus === 1 ? "Hoàn trả Voucher" : "Từ chối Voucher"}
        open={isModalVisible}
        onOk={handleModalSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
        className="w-96"
      >
        <Form>
          <Form.Item label="Lý do" required>
            <Input.TextArea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do"
            />
          </Form.Item>
          <Form.Item label="Trạng thái" required>
            <select
              value={modalStatus}
              onChange={(e) => setModalStatus(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value={1}>Chấp nhận</option>
              <option value={2}>Từ chối</option>
            </select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={
          <div className="text-lg font-semibold text-gray-800">
            {selectedDetails?.voucherCode?.name || "Chi tiết Voucher"}
          </div>
        }
        open={isDetailModalVisible}
        onOk={handleRefund}
        onCancel={closeDetailModal}
        okText="Hoàn trả/ Từ Chối"
        cancelButtonProps={{ style: { display: "none" } }}
        className="rounded-lg"
      >
        {selectedDetails && (
          <div className="p-4 space-y-4 text-gray-700">
            <div className="flex flex-col">
              <p>
                <span className="font-medium">Mã Code:</span>{" "}
                {selectedDetails.voucherCode?.code}
              </p>
              <p>
                <span className="font-medium">Thương hiệu:</span>{" "}
                {selectedDetails.voucherCode?.brand}
              </p>
            </div>

            <div className="flex flex-wrap items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="font-medium">Hạn sử dụng:</div>
                <div>
                  {moment(selectedDetails.voucherCode?.startDate).format(
                    "DD/MM/YYYY"
                  )}{" "}
                  -{" "}
                  {moment(selectedDetails.voucherCode?.endDate).format(
                    "DD/MM/YYYY"
                  )}
                </div>
              </div>
              <p className="flex items-center">
                <div className="font-medium">Trạng thái:</div>{" "}
                <Tag
                  color={
                    selectedDetails.status === "PENDING"
                      ? "orange"
                      : selectedDetails.status === "SUSPECTED"
                      ? "red"
                      : "green"
                  }
                  className="ml-2"
                >
                  {selectedDetails.status}
                </Tag>
              </p>
            </div>

            {/* Display Images */}
            {selectedDetails.medias?.length > 0 && (
              <div className="space-y-2">
                <div className="font-medium">Hình ảnh liên quan:</div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedDetails.medias.map((media, index) => (
                    <Image
                      key={media.id || index}
                      src={`data:image/png;base64,${media.url}`}
                      alt={`media-${index}`}
                      className="rounded-lg border border-gray-300"
                      width={100}
                      height={100}
                      preview={{
                        mask: "Xem chi tiết", // Hiển thị text khi hover vào ảnh
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReturnRequest;
