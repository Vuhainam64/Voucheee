import React, { useState, useEffect } from "react";
import {
  Modal,
  Table,
  Button,
  Form,
  Input,
  Upload,
  Image,
  Tabs,
  Spin,
  DatePicker,
  message,
} from "antd";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { CopyOutlined, PlusOutlined } from "@ant-design/icons";

import { getModal } from "../../../../../../api/modal";
import { createVoucherCode } from "../../../../../../api/voucher";
import {
  removeCode,
  updateVoucherCode,
} from "../../../../../../api/vouchercode";
import { storage } from "../../../../../../config/firebase.config";

const { TabPane } = Tabs;

const ModalPopup = ({ isVisible, onClose, modalId }) => {
  const [modalData, setModalData] = useState(null);
  const [unusedVoucherCodes, setUnusedVoucherCodes] = useState([]);
  const [pendingVoucherCodes, setPendingVoucherCodes] = useState([]);
  const [convertingVoucherCodes, setConvertingVoucherCodes] = useState([]);
  const [isAddCodeModalVisible, setIsAddCodeModalVisible] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [editMode, setEditMode] = useState(false); // Track whether we're editing or adding
  const [currentRecord, setCurrentRecord] = useState(null); // Store the current record to edit
  const [form] = Form.useForm(); // Create form instance

  useEffect(() => {
    const fetchModalData = async () => {
      if (modalId) {
        try {
          setLoading(true);
          const data = await getModal(modalId);
          setModalData(data.results);

          setUnusedVoucherCodes(
            data.results.voucherCodes.filter((code) => code.status === "UNUSED")
          );
          setPendingVoucherCodes(
            data.results.voucherCodes.filter(
              (code) => code.status === "PENDING"
            )
          );
          setConvertingVoucherCodes(
            data.results.voucherCodes.filter(
              (code) => code.status === "CONVERTING"
            )
          );
        } catch (error) {
          console.error("Error loading modal data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchModalData();
  }, [modalId, refreshKey]);

  const handleDelete = async (record) => {
    try {
      const result = await removeCode(record.id);
      if (result) {
        toast.success("Voucher code deleted successfully!");
      }
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      toast.error("Failed to delete voucher code.");
      console.error("Error deleting voucher code:", error);
    }
  };

  const handleEdit = (record) => {
    // Set edit mode and load the record to edit
    setIsAddCodeModalVisible(true);
    setEditMode(true);
    setCurrentRecord(record);
    form.setFieldsValue({
      code: record.code,
      startDate: moment(record.startDate, "YYYY-MM-DD"),
      endDate: moment(record.endDate, "YYYY-MM-DD"),
    });
    setImageFiles([
      {
        uid: record.id,
        name: "voucher_image.jpg",
        status: "done",
        url: record.image,
      },
    ]);
  };

  const handleAddVoucherCode = (values) => {
    const { code, startDate, endDate } = values;
    const image = imageFiles.length > 0 ? imageFiles[0] : null;
    if (!image) {
      toast.error("Please upload an image for the voucher code.");
      return;
    }

    const formattedStartDate = startDate.format("YYYY-MM-DD");
    const formattedEndDate = endDate.format("YYYY-MM-DD");

    if (editMode && currentRecord) {
      // If editing, update the voucher code
      updateVoucherCode(
        currentRecord.id,
        code,
        image.url,
        formattedStartDate,
        formattedEndDate,
        0
      )
        .then(() => {
          toast.success("Voucher code updated successfully!");
          setRefreshKey((prevKey) => prevKey + 1);
          setIsAddCodeModalVisible(false);
          setImageFiles([]);
          setEditMode(false);
          setCurrentRecord(null); // Clear current record after update
        })
        .catch((error) => {
          toast.error("Failed to update voucher code.");
          console.error("Error updating voucher code:", error);
        });
    } else {
      // If adding new voucher, keep the previous logic
      const storageRef = ref(storage, `vouchers/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image.originFileObj);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          toast.error("Failed to upload image.");
          console.error("Image upload error:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          createVoucherCode(modalId, {
            code,
            image: downloadURL,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          })
            .then(() => {
              toast.success("Voucher code added successfully!");
              setRefreshKey((prevKey) => prevKey + 1);
              setIsAddCodeModalVisible(false);
              setImageFiles([]);
            })
            .catch((error) => {
              toast.error("Failed to add voucher code.");
              console.error("Error adding voucher code:", error);
            });
        }
      );
    }
  };

  const handleAddCode = () => {
    setIsAddCodeModalVisible(true);
    setEditMode(false); // Reset to add mode when opening the form
    setCurrentRecord(null); // Clear current record
  };

  const handleCancelAddCode = () => {
    setIsAddCodeModalVisible(false);
  };

  const copyToClipboard = (id) => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        message.success(`ID ${id} copied to clipboard!`);
      })
      .catch((error) => {
        message.error("Failed to copy ID.");
        console.error("Copy error:", error);
      });
  };

  const modalPopupColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <div>
          {text}{" "}
          <CopyOutlined
            onClick={() => copyToClipboard(text)}
            style={{ cursor: "pointer", marginLeft: 8 }}
          />
        </div>
      ),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "NewCode",
      key: "newCode",
      render: () => <div className="text-xl">*********</div>,
      visible: activeTab === "1",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? (
          <Image width={50} src={image} alt="Voucher" />
        ) : (
          <span>No Image</span>
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
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) =>
        pendingVoucherCodes.some((code) => code.id === record.id) && (
          <div>
            <Button type="link" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button type="link" danger onClick={() => handleDelete(record)}>
              Delete
            </Button>
          </div>
        ),
    },
  ];

  return (
    <>
      <Modal
        title="Quản lý kho"
        open={isVisible}
        onCancel={onClose}
        footer={null}
        width={1200}
      >
        {loading ? (
          <Spin size="large" />
        ) : (
          modalData && (
            <>
              <div className="flex items-center justify-between">
                <div className="font-bold mb-4">{modalData.title}</div>
                <Button type="primary" onClick={handleAddCode}>
                  Thêm code
                </Button>
              </div>
              <Tabs
                defaultActiveKey="1"
                activeKey={activeTab}
                onChange={setActiveTab}
              >
                <TabPane tab="Đang Bán" key="1">
                  <Table
                    columns={modalPopupColumns.filter(
                      (column) => column.visible !== false
                    )}
                    dataSource={unusedVoucherCodes}
                    rowKey={(record) => record.id}
                    pagination={{ pageSize: 5 }}
                  />
                </TabPane>
                <TabPane tab="Đang Chờ Xử Lý" key="2">
                  <Table
                    columns={modalPopupColumns.filter(
                      (column) => column.visible !== false
                    )}
                    dataSource={pendingVoucherCodes}
                    rowKey={(record) => record.id}
                    pagination={{ pageSize: 5 }}
                  />
                </TabPane>
                <TabPane tab="Đang Chuyển Đổi" key="3">
                  <Table
                    columns={modalPopupColumns.filter(
                      (column) => column.visible !== false
                    )}
                    dataSource={convertingVoucherCodes}
                    rowKey={(record) => record.id}
                    pagination={{ pageSize: 5 }}
                  />
                </TabPane>
              </Tabs>
            </>
          )
        )}
      </Modal>

      {/* Modal to add voucher code */}
      <Modal
        title="Voucher Code"
        open={isAddCodeModalVisible}
        onCancel={handleCancelAddCode}
        footer={null}
      >
        <Form form={form} onFinish={handleAddVoucherCode}>
          <Form.Item
            label="Code"
            name="code"
            rules={[
              { required: true, message: "Please input the voucher code!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[
              { required: true, message: "Please select the start date!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            dependencies={["startDate"]} // Tham chiếu đến giá trị của startDate
            rules={[
              { required: true, message: "Please select the end date!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value.isAfter(getFieldValue("startDate"))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("End date must be greater than start date!")
                  );
                },
              }),
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Image">
            <Upload
              listType="picture-card"
              fileList={imageFiles}
              onChange={({ fileList }) => setImageFiles(fileList)}
              beforeUpload={() => false}
            >
              {imageFiles.length < 1 && (
                <button type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalPopup;
