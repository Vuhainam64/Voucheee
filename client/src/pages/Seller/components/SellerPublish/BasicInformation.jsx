import React, { useState, useEffect } from "react";
import ImgCrop from "antd-img-crop";
import {
  Form,
  Input,
  TreeSelect,
  Upload,
  Progress,
  message,
  Image,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../../config/firebase.config";
import { getAllCategory } from "../../../../api/category";

const { SHOW_PARENT } = TreeSelect;

const BasicInformation = () => {
  const [value, setValue] = useState(["0-0-0"]);
  const [treeData, setTreeData] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [adImageFiles, setAdImageFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategory();
      if (data) {
        const formattedData = formatTreeData(data.results);
        setTreeData(formattedData);
      }
    };

    fetchCategories();
  }, []);

  const formatTreeData = (categories) => {
    const categoryMap = {};

    categories.forEach((category) => {
      const { id, voucherTypeTitle, title } = category;
      if (!categoryMap[voucherTypeTitle]) {
        categoryMap[voucherTypeTitle] = {
          title: voucherTypeTitle,
          value: voucherTypeTitle,
          key: voucherTypeTitle,
          children: [],
        };
      }
      categoryMap[voucherTypeTitle].children.push({
        title: title,
        value: id,
        key: id,
      });
    });

    return Object.values(categoryMap);
  };

  const onChange = (newValue) => {
    console.log("onChange ", newValue);
    setValue(newValue);
  };

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleFileChange = (fileList, type) => {
    const setFileList = type === "image" ? setImageFiles : setAdImageFiles;
    setFileList(fileList);
    fileList.forEach((file) => {
      if (file.status === "done") {
        setUploadProgress((prev) => ({ ...prev, [file.uid]: undefined }));
      }
    });
  };

  const uploadFile = (file, type) => {
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
        message.error("Upload failed.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            if (type === "image") {
              setImageFiles((prev) =>
                prev.map((f) =>
                  f.uid === file.uid
                    ? { ...f, status: "done", url: downloadURL }
                    : f
                )
              );
            } else {
              setAdImageFiles((prev) =>
                prev.map((f) =>
                  f.uid === file.uid
                    ? { ...f, status: "done", url: downloadURL }
                    : f
                )
              );
            }
            message.success("File uploaded successfully!");
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            message.error("Failed to get download URL.");
          });
      }
    );
  };

  const handleBeforeUpload = (file, type) => {
    const isVideo = type === "video" ? file.type.startsWith("video/") : true;
    const isValidSize = file.size / 1024 / 1024 < 20; // 20 MB
    const isValidFormat =
      type === "video"
        ? ["video/mp4", "video/avi", "video/mkv"].includes(file.type)
        : true;

    if (!isVideo || !isValidSize || !isValidFormat) {
      message.error("Invalid file type or size!");
      return false;
    }

    uploadFile(file, type);
    return false;
  };

  const deleteFile = (file, type) => {
    const fileRef = ref(storage, `portfolio/${file.name}`);

    deleteObject(fileRef)
      .then(() => {
        message.success("File deleted successfully!");
        if (type === "image") {
          setImageFiles((prev) => prev.filter((f) => f.uid !== file.uid));
        } else {
          setAdImageFiles((prev) => prev.filter((f) => f.uid !== file.uid));
        }
      })
      .catch((error) => {
        console.error("Delete error:", error);
        message.error("Failed to delete file.");
      });
  };

  return (
    <div className="bg-white px-6 rounded-xl py-6">
      <div className="text-2xl font-semibold pb-6">Thông tin cơ bản</div>
      <Form.Item
        label="Tên sản phẩm"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        name="productName"
        rules={[{ required: true, message: "Please input your voucher name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Danh mục ngành hàng"
        name="categoryName"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "Please input your category!" }]}
      >
        <TreeSelect {...tProps} />
      </Form.Item>
      <Form.Item
        label="Ảnh sản phẩm"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <div className="flex space-x-2">
          {/* <div className="flex space-x-2">
            {imageFiles.map((file) => (
              <div key={file.uid} className="p-2 rounded-md border">
                {file.status === "done" && (
                  <div className="relative inline-block">
                    <Image
                      width={80}
                      height={80}
                      src={file.url}
                      alt={file.name}
                    />
                    <button
                      className="top-2 right-2 absolute bg-red-500 text-white rounded-full p-1"
                      onClick={() => deleteFile(file, "image")}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div> */}
          <ImgCrop rotationSlider>
            <Upload
              listType="picture-card"
              fileList={imageFiles}
              onChange={({ fileList }) => handleFileChange(fileList, "image")}
              beforeUpload={(file) => handleBeforeUpload(file, "image")}
              onRemove={(file) => deleteFile(file, "image")}
            >
              {imageFiles.length < 5 && (
                <button type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              )}
            </Upload>
          </ImgCrop>
        </div>
        {imageFiles.map(
          (file) =>
            uploadProgress[file.uid] !== undefined && (
              <Progress key={file.uid} percent={uploadProgress[file.uid]} />
            )
        )}
      </Form.Item>

      <Form.Item
        label="Hình ảnh quảng cáo cho người mua"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <ImgCrop rotationSlider>
          <Upload
            listType="picture-card"
            fileList={adImageFiles}
            onChange={({ fileList }) => handleFileChange(fileList, "adImage")}
            beforeUpload={(file) => handleBeforeUpload(file, "adImage")}
            onRemove={(file) => deleteFile(file, "adImage")}
          >
            {adImageFiles.length < 5 && (
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload>
        </ImgCrop>
        {adImageFiles.map(
          (file) =>
            uploadProgress[file.uid] !== undefined && (
              <Progress key={file.uid} percent={uploadProgress[file.uid]} />
            )
        )}
      </Form.Item>
      <Form.Item
        label="Video"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <div className="flex items-center bg-gray-100 p-4 rounded-md">
          <Upload
            action="/*"
            listType="picture-card"
            beforeUpload={(file) => handleBeforeUpload(file, "video")}
            maxCount={1}
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
          <div style={{ marginLeft: 16 }}>
            <ul style={{ listStyleType: "disc", paddingLeft: 20 }}>
              <li>Kích thước tối đa: 20 MB</li>
              <li>Định dạng: MP4, AVI, MKV</li>
            </ul>
          </div>
        </div>
      </Form.Item>
    </div>
  );
};

export default BasicInformation;
