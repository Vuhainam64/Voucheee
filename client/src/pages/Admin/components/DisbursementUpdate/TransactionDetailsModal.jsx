import React, { useState, useEffect } from "react";
import { Modal, Table, Input, Button, Space, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { updateWithdrawStatusTransfering } from "../../../../api/withdraw";

const TransactionDetailsModal = ({ visible, onClose, transactions }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Cập nhật filteredTransactions khi transactions thay đổi
  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = transactions.filter((item) => {
      const bankNumber = item?.withdrawWalletTransaction?.bankNumber || "";
      const bankAccount = item?.withdrawWalletTransaction?.bankAccount || "";
      const note = item?.withdrawWalletTransaction?.note || "";
      return (
        bankNumber.toLowerCase().includes(value) ||
        bankAccount.toLowerCase().includes(value) ||
        note.toLowerCase().includes(value)
      );
    });
    setFilteredTransactions(filtered);
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      // Bỏ dòng đầu và các dòng tiêu đề
      const transactionData = jsonData.slice(4).map((row) => {
        const paymentDetail = row[5] || ""; // Nội dung chuyển khoản
        const match = paymentDetail.match(/Ma giao dich (\w+)/); // Lấy id từ nội dung
        const id = match ? match[1] : null;
        return {
          id,
          statusEnum: 2, // Cố định trạng thái
          note: row[7], // Trạng thái giao dịch
        };
      });

      // Lọc ra các giao dịch hợp lệ (có id)
      const validTransactions = transactionData.filter((item) => item.id);

      // Gọi API với danh sách giao dịch
      if (validTransactions.length > 0) {
        updateWithdrawStatusTransfering(validTransactions)
          .then((response) => {
            message.success(`Cập nhật thành công: ${response.message}`);
            onClose();
          })
          .catch((err) => {
            message.error("Lỗi cập nhật giao dịch!");
            console.error(err);
          });
      } else {
        message.error("Không tìm thấy giao dịch hợp lệ trong file Excel!");
      }
    };
    reader.readAsArrayBuffer(file);
    return false; // Chặn upload file trực tiếp
  };

  const exportToExcel = () => {
    const sheetData = [
      ["DANH SÁCH GIAO DỊCH", "", "", "", "", "", ""],
      [
        "STT (Ord. No.)",
        "Số tài khoản (Account No.)",
        "Tên người thụ hưởng (Beneficiary)",
        "Ngân hàng thụ hưởng/Chi nhánh (Beneficiary Bank)",
        "Số tiền (Amount)",
        "Nội dung chuyển khoản (Payment Detail)",
      ],
    ];

    filteredTransactions.forEach((item, index) => {
      sheetData.push([
        index + 1,
        `${item?.withdrawWalletTransaction?.bankNumber}` || "",
        item?.withdrawWalletTransaction?.bankAccount || "",
        item?.withdrawWalletTransaction?.bankName || "",
        item?.withdrawWalletTransaction?.amount || 0,
        `${item?.withdrawWalletTransaction?.note} Ma giao dich ${item?.id}` ||
          "",
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Danh Sách Giao Dịch");
    XLSX.writeFile(wb, "Danh_Sach_Giao_Dich.xlsx");

    message.success("Dữ liệu đã được xuất thành công!");
  };

  const columns = [
    {
      title: "STT (Ord. No.)",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1, // Tạo số thứ tự tự động
    },
    {
      title: "Số tài khoản (Account No.)",
      dataIndex: ["withdrawWalletTransaction", "bankNumber"],
      key: "bankNumber",
    },
    {
      title: "Tên người thụ hưởng (Beneficiary)",
      dataIndex: ["withdrawWalletTransaction", "bankAccount"],
      key: "bankAccount",
    },
    {
      title: "Ngân hàng thụ hưởng/Chi nhánh (Beneficiary Bank)",
      dataIndex: ["withdrawWalletTransaction", "bankName"],
      key: "bankName",
    },
    {
      title: "Số tiền (Amount)",
      dataIndex: ["withdrawWalletTransaction", "amount"],
      key: "amount",
      render: (amount) => `${amount} VND`,
    },
    {
      title: "Nội dung chuyển khoản (Payment Detail)",
      dataIndex: ["withdrawWalletTransaction", "note"],
      key: "note",
      render: (note, record) => `${note} Ma giao dich ${record?.id || ""}`,
    },
    {
      title: "Thời gian tạo (Create Date)",
      dataIndex: ["createDate"],
      key: "createDate",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <Modal
      title="Chi tiết giao dịch"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1200}
    >
      <Space
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Input.Search
          placeholder="Tìm kiếm số tài khoản, tên người thụ hưởng hoặc nội dung"
          onChange={handleSearch}
          value={searchText}
          style={{ width: 400 }}
        />
        <div className="flex space-x-2">
          <Upload
            beforeUpload={handleFileUpload}
            accept=".xlsx, .xls"
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Nhập Excel</Button>
          </Upload>
          <Button type="primary" onClick={exportToExcel}>
            Xuất Excel
          </Button>
        </div>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredTransactions}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </Modal>
  );
};

export default TransactionDetailsModal;
