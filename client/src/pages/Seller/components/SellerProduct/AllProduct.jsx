import React, { useState, useEffect } from "react";
import {
  Button,
  Dropdown,
  Image,
  message,
  Select,
  Space,
  Switch,
  Table,
  Input,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ModalPopup } from "./components/AllProduct";
import { updateModalActive } from "../../../../api/modal";
import { getSellerVoucher, updateVoucherActive } from "../../../../api/voucher";

const { Option } = Select;

const AllProduct = ({ setTotalVoucher }) => {
  const [vouchers, setVouchers] = useState([]);
  const [filteredVouchers, setFilteredVouchers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("Option1");
  const [selectedSort, setSelectedSort] = useState("Option1");

  useEffect(() => {
    const fetchVouchers = async () => {
      const data = await getSellerVoucher();
      setTotalVoucher(data?.metaData.total || 0);
      setVouchers(data?.results || []);
      setFilteredVouchers(data?.results || []);
    };
    fetchVouchers();
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);
    filterVouchers(value, selectedSupplier, selectedSort);
  };

  const handleSupplierChange = (value) => {
    setSelectedSupplier(value);
    filterVouchers(searchValue, value, selectedSort);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
    filterVouchers(searchValue, selectedSupplier, value);
  };

  const filterVouchers = (search, supplier, sort) => {
    let filtered = vouchers;

    if (search) {
      filtered = filtered.filter((voucher) => {
        // Check if the title or code is defined before calling toLowerCase
        const titleMatch =
          voucher.title &&
          voucher.title.toLowerCase().includes(search.toLowerCase());
        const codeMatch =
          voucher.code &&
          voucher.code.toLowerCase().includes(search.toLowerCase());

        return titleMatch || codeMatch;
      });
    }

    if (supplier && supplier !== "Option1") {
      filtered = filtered.filter(
        (voucher) => voucher.supplierName === supplier
      );
    }

    if (sort) {
      switch (sort) {
        case "Option1": // Tạo gần nhất
          filtered = filtered.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          break;
        case "Option2": // Cập nhật gần nhất
          filtered = filtered.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          break;
        case "Option3": // Còn ít trong kho
          filtered = filtered.sort((a, b) => a.stock - b.stock);
          break;
        case "Option4": // Đắt nhất
          filtered = filtered.sort((a, b) => b.sellPrice - a.sellPrice);
          break;
        case "Option5": // Rẻ nhất
          filtered = filtered.sort((a, b) => a.sellPrice - b.sellPrice);
          break;
        default:
          break;
      }
    }

    setFilteredVouchers(filtered);
  };

  const handleSwitchChange = async (checked, record) => {
    try {
      await updateVoucherActive(record.id, checked);

      // Update both vouchers and filteredVouchers
      setVouchers((prevVouchers) =>
        prevVouchers.map((voucher) =>
          voucher.id === record.id ? { ...voucher, isActive: checked } : voucher
        )
      );
      setFilteredVouchers((prevFilteredVouchers) =>
        prevFilteredVouchers.map((voucher) =>
          voucher.id === record.id ? { ...voucher, isActive: checked } : voucher
        )
      );
    } catch (error) {
      console.error("Failed to update active status:", error);
    }
  };

  const handleModalSwitchChange = async (checked, record) => {
    console.log(checked, record);
    try {
      // Update modal's active status in the backend
      await updateModalActive(record.id, checked);

      // Update the state to reflect the change in the UI
      setVouchers((prevVouchers) =>
        prevVouchers.map((voucher) => ({
          ...voucher,
          modals: voucher.modals.map((modal) =>
            modal.id === record.id ? { ...modal, isActive: checked } : modal
          ),
        }))
      );
      setFilteredVouchers((prevFilteredVouchers) =>
        prevFilteredVouchers.map((voucher) => ({
          ...voucher,
          modals: voucher.modals.map((modal) =>
            modal.id === record.id ? { ...modal, isActive: checked } : modal
          ),
        }))
      );
    } catch (error) {
      message.error("Failed to update active status for modal:", error);
    }
  };

  const showModal = (id) => {
    setModalId(id);
    setIsModalVisible(true);
  };

  const expandedRowRender = (record) => (
    <Table
      columns={expandColumns}
      dataSource={record.modals}
      pagination={false}
      rowKey="id"
    />
  );

  const items = [
    {
      key: "1",
      label: "Sao chép",
    },
    {
      key: "2",
      label: "Xoá",
    },
  ];

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image src={image} alt="Product" style={{ width: 50, height: 50 }} />
      ),
      width: "10%",
    },
    {
      title: "Thông tin sản phẩm",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplierName",
      key: "supplierName",
    },
    {
      title: "Kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Đang hoạt động",
      dataIndex: "isActive",
      key: "isActive",
      render: (active, record) => (
        <Switch
          checked={active}
          onChange={(checked) => handleSwitchChange(checked, record)}
        />
      ),
    },
  ];

  const expandColumns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image src={image} alt="Modal" style={{ width: 50, height: 50 }} />
      ),
      width: "10%",
    },
    {
      title: "Tên Modal",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    {
      title: "Giá gốc",
      dataIndex: "originalPrice",
      key: "originalPrice",
    },
    {
      title: "Giá bán",
      dataIndex: "sellPrice",
      key: "sellPrice",
    },
    {
      title: "Giá sự kiện",
      dataIndex: "salePrice",
      key: "salePrice",
    },
    {
      title: "Kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Đang hoạt động",
      dataIndex: "isActive",
      key: "isActive",
      render: (active, record) => (
        <Switch
          checked={active}
          onChange={(checked) => handleModalSwitchChange(checked, record)}
        />
      ),
    },
    {
      title: "Hành động",
      key: "operation",
      render: (record) => (
        <Space size="middle" direction="vertical">
          <Button type="link" onClick={() => showModal(record.id)}>
            Quản lý kho
          </Button>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <Button type="link">
              <Space>
                Xem thêm <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div className=" bg-white rounded-lg px-4">
      <div className="flex flex-row py-4 space-x-10">
        <Space.Compact className="flex-1">
          <Select defaultValue="Option1" onChange={handleSearch}>
            <Option value="Option1">Tên sản phẩm</Option>
            <Option value="Option2">Mã sản phẩm</Option>
          </Select>
          <Input.Search
            className="w-full"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Space.Compact>
        <Space.Compact className="flex-1">
          <Button>Nhà cung cấp</Button>
          <Select
            defaultValue="Option1"
            className="w-full"
            onChange={handleSupplierChange}
          >
            <Option value="Option1">Tất cả</Option>
            <Option value="Option2">GOTIT</Option>
            <Option value="Option3">URBOX</Option>
            <Option value="Option4">UTOP</Option>
            <Option value="Option5">DEALTODAY</Option>
            <Option value="Option6">GIFTPOP</Option>
          </Select>
        </Space.Compact>
        <Space.Compact className="flex-1">
          <Button>Sắp xếp</Button>
          <Select
            defaultValue="Option3"
            className="w-full"
            onChange={handleSortChange}
          >
            <Option value="Option3">Còn ít trong kho</Option>
            <Option value="Option4">Đắt nhất</Option>
            <Option value="Option5">Rẻ nhất</Option>
          </Select>
        </Space.Compact>
      </div>

      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
        }}
        dataSource={filteredVouchers}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <ModalPopup
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        modalId={modalId}
      />
    </div>
  );
};

export default AllProduct;
