import React, { useState, useEffect } from "react";
import {
  Modal,
  Table,
  Button,
  Form,
  Input,
  Upload,
  Image,
  Progress,
} from "antd";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";

import { getModal } from "../../../../../../api/modal";
import { storage } from "../../../../../../config/firebase.config";
import { createVoucherCode } from "../../../../../../api/voucher";

const ModalPopup = ({ isVisible, onClose, modalId }) => {
  const [modalData, setModalData] = useState(null);
  const [voucherCodes, setVoucherCodes] = useState([]);
  const [isAddCodeModalVisible, setIsAddCodeModalVisible] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [images, setImages] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchModalData = async () => {
      if (modalId) {
        try {
          const data = await getModal(modalId);
          setModalData(data.results);
          setVoucherCodes(data.results.voucherCodes);
        } catch (error) {
          console.error("Error loading modal data:", error);
        }
      }
    };
    fetchModalData();
  }, [modalId, refreshKey]);

  const handleDelete = (record) => {
    console.log("Delete code:", record.code);
  };

  const handleEdit = (record) => {
    console.log("Edit code:", record.code);
  };

  const handleAddCode = () => {
    setIsAddCodeModalVisible(true);
  };

  const handleCancelAddCode = () => {
    setIsAddCodeModalVisible(false);
  };

  const modalPopupColumns = [
    {
      title: "Số thứ tự",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
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
      render: (image) => (
        <Image
          width={50}
          src={image || "https://via.placeholder.com/50"}
          alt="Voucher"
        />
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => (
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

  const handleFileChange = (fileList) => {
    setImageFiles(fileList);
    fileList.forEach((file) => {
      if (file.status === "done") {
        setUploadProgress((prev) => ({ ...prev, [file.uid]: undefined }));
      }
    });
  };

  const uploadFile = (file) => {
    const storageRef = ref(storage, `portfolio/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress((prev) => ({ ...prev, [file.uid]: progress }));
      },
      (error) => {
        console.error("Upload error:", error);
        toast.error("Upload failed.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setImageFiles((prev) =>
              prev.map((f) =>
                f.uid === file.uid
                  ? { ...f, status: "done", url: downloadURL }
                  : f
              )
            );
            setImages((prevImages) => [...prevImages, downloadURL]);
            toast.success("File uploaded successfully!");
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            toast.error("Failed to get download URL.");
          });
      }
    );
  };

  const handleBeforeUpload = (file) => {
    const isValidSize = file.size / 1024 / 1024 < 20; // 20 MB

    if (!isValidSize) {
      toast.error("Invalid file size!");
      return false;
    }

    uploadFile(file);
    return false;
  };

  const deleteFile = (file) => {
    const fileRef = ref(storage, `portfolio/${file.name}`);

    deleteObject(fileRef)
      .then(() => {
        toast.success("File deleted successfully!");
        setImageFiles((prev) => prev.filter((f) => f.uid !== file.uid));
        setImages((prevImages) => prevImages.filter((url) => url !== file.url));
      })
      .catch((error) => {
        console.error("Delete error:", error);
        toast.error("Failed to delete file.");
      });
  };

  const handleAddVoucherCode = (values) => {
    const { code } = values;
    const image = images[0];
    createVoucherCode(modalId, { code, image })
      .then(() => {
        toast.success("Voucher code added successfully!");
        setRefreshKey((prevKey) => prevKey + 1);
        setIsAddCodeModalVisible(false);
      })
      .catch((error) => {
        toast.error("Failed to add voucher code.");
        console.error("Error adding voucher code:", error);
      });
  };

  return (
    <>
      <Modal
        title="Quản lý kho"
        open={isVisible}
        onCancel={onClose}
        footer={null}
      >
        {modalData && (
          <>
            <div className="flex items-center justify-between">
              <div className="font-bold mb-4">{modalData.title}</div>
              <Button type="primary" onClick={handleAddCode}>
                Thêm code
              </Button>
            </div>
            <Table
              columns={modalPopupColumns}
              dataSource={voucherCodes}
              rowKey={(record) => record.id}
              pagination={{ pageSize: 5 }}
            />
          </>
        )}
      </Modal>

      {/* Modal to add voucher code */}
      <Modal
        title="Thêm Voucher Code"
        open={isAddCodeModalVisible}
        onCancel={handleCancelAddCode}
        footer={null}
      >
        <Form onFinish={handleAddVoucherCode}>
          <Form.Item
            label="Code"
            name="code"
            rules={[
              { required: true, message: "Please input the voucher code!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Image" name="image">
            <div className="flex space-x-2">
              <Upload
                listType="picture-card"
                fileList={imageFiles}
                onChange={({ fileList }) => handleFileChange(fileList)}
                beforeUpload={(file) => handleBeforeUpload(file)}
                onRemove={(file) => deleteFile(file)}
              >
                {imageFiles.length < 1 && (
                  <button type="button">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                )}
              </Upload>
            </div>
            {imageFiles.map(
              (file) =>
                uploadProgress[file.uid] !== undefined && (
                  <Progress key={file.uid} percent={uploadProgress[file.uid]} />
                )
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm code
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalPopup;
