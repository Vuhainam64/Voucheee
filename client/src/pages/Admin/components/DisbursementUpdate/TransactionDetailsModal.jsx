import React, { useState, useEffect } from "react";
import { Modal, Table, Input, Button, Space, message } from "antd";
import * as XLSX from "xlsx";

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
        "Thời gian tạo (Create Date)",
      ],
    ];

    filteredTransactions.forEach((item, index) => {
      sheetData.push([
        index + 1,
        item?.withdrawWalletTransaction?.bankNumber || "",
        item?.withdrawWalletTransaction?.bankAccount || "",
        item?.withdrawWalletTransaction?.bankName || "",
        item?.withdrawWalletTransaction?.amount || 0,
        item?.withdrawWalletTransaction?.note || "",
        new Date(item?.createDate).toLocaleString(),
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
      width={800}
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
        <Button type="primary" onClick={exportToExcel}>
          Xuất Excel
        </Button>
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
