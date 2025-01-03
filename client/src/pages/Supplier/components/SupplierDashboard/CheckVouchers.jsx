import React, { useEffect, useState } from "react";
import { Button, Image, Table, Modal, message, Spin } from "antd";
import * as XLSX from "xlsx";

import {
  getAllVoucherConvert,
  updateListCodeStatusConverting,
} from "../../../../api/vouchercode";

const CheckVouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const vouchersData = await getAllVoucherConvert();
      setVouchers(vouchersData.results);
    } catch (error) {
      console.error("Failed to fetch vouchers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? (
          <Image src={image} alt="Voucher" style={{ maxWidth: "100px" }} />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const exportToExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const href = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `${fileName}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    try {
      await updateListCodeStatusConverting(selectedRowKeys);
      message.success(
        "Vouchers đã được chuyển trạng thái sang chờ chuyển đổi."
      );

      if (selectedRowKeys.length > 0) {
        const selectedVouchers = vouchers.filter((voucher) =>
          selectedRowKeys.includes(voucher.id)
        );
        exportToExcel(selectedVouchers, "vouchers");
      }

      await fetchVouchers();
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật trạng thái voucher.");
      console.error("Error updating voucher status:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex bg-white p-4 rounded-xl justify-between">
        <div className="text-2xl font-bold">Duyệt Voucher</div>
        <Button
          type={selectedRowKeys.length > 0 ? "primary" : "default"}
          onClick={showModal}
          disabled={selectedRowKeys.length === 0 || loading}
        >
          Xuất Excel
        </Button>
      </div>
      <div className="bg-white p-4 rounded-xl">
        <Spin spinning={loading}>
          <Table
            dataSource={vouchers}
            columns={columns}
            rowKey="id"
            rowSelection={rowSelection}
          />
        </Spin>
      </div>
      <Modal
        title="Xác nhận chuyển đổi voucher"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>
          Xác nhận các voucher cần chuyển đổi. Sau khi ấn xác nhận, các voucher
          sẽ chuyển sang trạng thái chờ chuyển đổi.
        </p>
      </Modal>
    </div>
  );
};

export default CheckVouchers;
