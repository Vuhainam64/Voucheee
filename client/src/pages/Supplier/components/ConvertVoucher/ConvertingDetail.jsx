import React, { useState, useEffect } from "react";
import { Modal, Spin, message, Table, Button } from "antd";
import * as XLSX from "xlsx";

import {
  convertNewCode,
  getVoucherConvertingByID,
} from "../../../../api/vouchercode";

const ConvertingDetail = ({ visible, setVisible, voucherId, onCancel }) => {
  const [vouchers, setVouchers] = useState([]); // Use an array for multiple vouchers
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVoucherDetails = async () => {
      if (voucherId) {
        setLoading(true);
        try {
          const response = await getVoucherConvertingByID(voucherId);
          setVouchers(response.results); // Store all vouchers from the response
        } catch (error) {
          message.error("Lỗi khi tải thông tin voucher.");
          console.error("Error fetching voucher details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (visible && voucherId) {
      fetchVoucherDetails();
    } else {
      setVouchers([]); // Reset vouchers if modal is closed
    }
  }, [visible, voucherId]); // Re-fetch data when modal is opened

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Modal Name",
      dataIndex: "modalname",
      key: "modalname",
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image && <img src={image} alt="Voucher" style={{ width: "50px" }} />,
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

  const dataSource = vouchers.map((voucher) => ({
    key: voucher.id,
    name: voucher.name,
    modalname: voucher.modalname,
    code: voucher.code,
    image: voucher.image,
    startDate: voucher.startDate,
    endDate: voucher.endDate,
  }));

  // Xuất Excel với các cột id, name, modalname, modalId, status, newCode, code, image, startDate, endDate
  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();

    // Lấy dữ liệu cần thiết cho xuất Excel
    const exportData = vouchers.map((voucher) => ({
      id: voucher.id,
      name: voucher.name,
      modalname: voucher.modalname,
      modalId: voucher.modalId,
      status: voucher.status,
      image: voucher.image,
      startDate: voucher.startDate,
      endDate: voucher.endDate,
      code: voucher.code,
      newCode: null,
      comment: null,
      updateStatus: null,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, "VoucherDetails");

    const fileName = `${voucherId}.xlsx`; // Tên file theo ID voucher
    XLSX.writeFile(wb, fileName);
  };

  // Nhập Excel
  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const binaryStr = evt.target.result;
      const wb = XLSX.read(binaryStr, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);

      // Map data to API structure
      const mappedData = data.map((row) => ({
        id: row.id,
        newCode: row.newCode,
        comment: row.comment,
        updateStatus: row.updateStatus,
      }));

      try {
        setLoading(true);
        await convertNewCode(mappedData);
        message.success("Dữ liệu đã được nhập và cập nhật thành công.");
        setVisible(false);
        setVouchers([]);
      } catch (error) {
        message.error("Lỗi khi nhập dữ liệu từ Excel.");
        console.error("Error importing data:", error);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <Modal
      title="Chi tiết Voucher"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={handleExportExcel}
          style={{ marginRight: 8 }}
        >
          Xuất Excel
        </Button>

        {/* Ẩn input file, chỉ hiển thị nút "Nhập Excel" */}
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleImportExcel}
          style={{ display: "none" }} // Ẩn input file
          id="import-excel" // Id để tương tác
        />
        <Button
          type="default"
          onClick={() => document.getElementById("import-excel").click()} // Kích hoạt input file khi người dùng nhấn vào nút "Nhập Excel"
        >
          Nhập Excel
        </Button>
      </div>

      {loading ? (
        <Spin tip="Đang tải..." />
      ) : vouchers.length > 0 ? (
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="key"
          bordered
          size="middle"
          pagination={{ pageSize: 10 }}
        />
      ) : (
        <p>Không có thông tin chi tiết.</p>
      )}
    </Modal>
  );
};

export default ConvertingDetail;