import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Dropdown,
  Menu,
  Checkbox,
  message,
  Spin,
  Modal,
} from "antd";
import * as XLSX from "xlsx";

import { BiTransferAlt } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa6";
import { DownOutlined } from "@ant-design/icons";

import {
  getALLWithdraw,
  updateWithdrawStatusTransfering,
} from "../../api/withdraw";
import { DisbursementChart, Summary } from "./components/DisbursementList";

const DisbursementList = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const withdrawData = await getALLWithdraw(0);
      setData(
        withdrawData.results.map((item, index) => ({
          key: item.id,
          bankNumber: item.withdrawWalletTransaction.bankNumber,
          bankAccount: item.withdrawWalletTransaction.bankAccount,
          bankName: item.withdrawWalletTransaction.bankName,
          amount: item.withdrawWalletTransaction.amount,
          note: item.withdrawWalletTransaction.note,
          role: item.walletType,
          time: item.createDate.split("T")[0],
        }))
      );
    } catch (error) {
      message.error("Không thể tải dữ liệu giải ngân.");
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: <Checkbox onChange={(e) => handleSelectAll(e.target.checked)} />,
      dataIndex: "checkbox",
      key: "checkbox",
      render: (_, record) => (
        <Checkbox
          checked={selectedRows.includes(record.key)}
          onChange={(e) => handleRowSelect(record.key, e.target.checked)}
        />
      ),
    },
    {
      title: "Số tài khoản (Account No.)",
      dataIndex: "bankNumber",
      key: "bankNumber",
    },
    {
      title: "Tên người thụ hưởng (Beneficiary)",
      dataIndex: "bankAccount",
      key: "bankAccount",
    },
    {
      title: "Ngân hàng thụ hưởng/Chi nhánh (Beneficiary Bank)",
      dataIndex: "bankName",
      key: "bankName",
    },
    {
      title: "Số tiền (Amount)",
      dataIndex: "amount",
      key: "amount",
      render: (value) => `${value.toLocaleString()} đ`,
    },
    {
      title: "Nội dung chuyển khoản (Payment Detail)",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Vai trò (Role)",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Thời gian (Time)",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Chức năng",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">Xem chi tiết</Menu.Item>
              <Menu.Item key="2">Download</Menu.Item>
              <Menu.Item key="3">Xuất Excel</Menu.Item>
            </Menu>
          }
        >
          <Button>
            Xem thêm <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const handleRowSelect = (key, checked) => {
    setSelectedRows((prev) =>
      checked ? [...prev, key] : prev.filter((item) => item !== key)
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedRows(checked ? data.map((item) => item.key) : []);
  };

  const exportToExcel = async () => {
    try {
      // Chuyển trạng thái của các giao dịch đã chọn
      const selectedTransactions = selectedRows.map((key) => {
        return {
          id: key, // Chuyển "key" thành "id"
          statusEnum: 1, // Trạng thái đã được cập nhật
        };
      });

      // Gửi thông tin các giao dịch đã chọn để cập nhật trạng thái
      const updateRes = await updateWithdrawStatusTransfering(
        selectedTransactions
      );

      message.success("Dữ liệu đã được chuyển trạng thái sang chờ chuyển đổi.");

      if (selectedRows.length > 0) {
        setLoading(true);
        const selectedData = data.filter((item) =>
          selectedRows.includes(item.key)
        );

        const sheetData = [
          ["DANH SÁCH GIAO DỊCH", "", "", "", "", ""],
          [
            "STT (Ord. No.)",
            "Số tài khoản (Account No.)",
            "Tên người thụ hưởng (Beneficiary)",
            "Ngân hàng thụ hưởng/Chi nhánh (Beneficiary Bank)",
            "Số tiền (Amount)",
            "Nội dung chuyển khoản (Payment Detail)",
          ],
        ];

        // Duyệt qua dữ liệu và thêm các dòng vào sheet
        selectedData.forEach((item) => {
          sheetData.push([
            item.key, // STT
            item.bankNumber, // Số tài khoản
            item.bankAccount, // Tên người thụ hưởng
            item.bankName, // Ngân hàng thụ hưởng
            item.amount, // Số tiền
            item.note, // Nội dung chuyển khoản
          ]);
        });

        // Tạo workbook và sheet từ dữ liệu
        const ws = XLSX.utils.aoa_to_sheet(sheetData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Danh Sách Giao Dịch");

        // Xuất ra file Excel
        XLSX.writeFile(wb, `${updateRes.value}.xlsx`);

        setLoading(false);
        message.success("Dữ liệu đã được xuất thành công!");
      }
      setIsModalVisible(false);
      await fetchData();
      setSelectedRows([]);
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật trạng thái voucher.");
      console.error("Error updating voucher status:", error);
    }
  };

  return (
    <div className="w-full h-full p-4 flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BiTransferAlt className="text-xl" />
          <div>Giải ngân</div>
          <FaChevronRight />
          <div>Danh sách giải ngân</div>
        </div>
        <div className="flex items-center space-x-2">
          <Link to={"/admin/disbursementUpdate"}>Cập nhật giải ngân</Link>
          <FaChevronRight />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Summary />
        <DisbursementChart />
      </div>

      {/* Title and Export Button */}
      <div className="bg-white rounded-lg p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Danh sách giải ngân</div>
        <Button
          type="primary"
          onClick={() => {
            setIsModalVisible(true);
          }}
          loading={loading}
          disabled={selectedRows.length === 0}
        >
          Xuất Excel
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg p-4">
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="key"
            pagination={{ pageSize: 5, pageSizeOptions: ["5", "10", "20"] }}
          />
        </Spin>
      </div>
      <Modal
        title="Xác nhận chuyển đổi trạng thái"
        open={isModalVisible}
        onOk={exportToExcel}
        onCancel={() => setIsModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>
          Bạn có chắc chắn muốn chuyển trạng thái các giao dịch đã chọn sang
          trạng thái chờ thanh toán không?
        </p>
      </Modal>
    </div>
  );
};

export default DisbursementList;
