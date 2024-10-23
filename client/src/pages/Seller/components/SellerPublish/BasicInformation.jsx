import React, { useState, useEffect } from "react";
import ImgCrop from "antd-img-crop";
import { Form, Input, TreeSelect, Upload, Progress } from "antd";
import { toast } from "react-toastify";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { PlusOutlined } from "@ant-design/icons";

import { storage } from "../../../../config/firebase.config";
import { getAllCategory } from "../../../../api/category";

const { SHOW_PARENT } = TreeSelect;

const BasicInformation = ({
  setCategoryId,
  setTitle,
  setImages,
  setVideoUrl,
  title,
}) => {
  const [value, setValue] = useState(["0-0-0"]);
  const [treeData, setTreeData] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
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
    const selectedIds = [];
    newValue.forEach((value) => {
      const category = findCategoryByValue(treeData, value);
      if (category && category.children) {
        category.children.forEach((child) => {
          selectedIds.push(child.value);
        });
      } else {
        selectedIds.push(value);
      }
    });

    setValue(newValue);
    setCategoryId(selectedIds);
    console.log(selectedIds);
  };

  const findCategoryByValue = (tree, value) => {
    for (const node of tree) {
      if (node.value === value) {
        return node;
      }
      if (node.children) {
        const childNode = findCategoryByValue(node.children, value);
        if (childNode) {
          return childNode;
        }
      }
    }
    return null;
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
            console.log("File available at", downloadURL);
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

  return (
    <div className="bg-white px-6 rounded-xl py-6">
      <div className="text-2xl font-semibold pb-6">Thông tin cơ bản</div>
      <Form.Item
        label="Tên sản phẩm"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        name="title"
        rules={[{ required: true, toast: "Please input your voucher name!" }]}
      >
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Danh mục ngành hàng"
        name="categoryName"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, toast: "Please input your category!" }]}
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
          <ImgCrop rotationSlider>
            <Upload
              listType="picture-card"
              fileList={imageFiles}
              onChange={({ fileList }) => handleFileChange(fileList)}
              beforeUpload={(file) => handleBeforeUpload(file)}
              onRemove={(file) => deleteFile(file)}
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
        label="Video"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <div className="flex items-center bg-gray-100 p-4 rounded-md">
          <Upload
            listType="picture-card"
            beforeUpload={(file) => handleBeforeUpload(file)}
            customRequest={({ file, onSuccess, onError }) => {
              const isValidSize = file.size / 1024 / 1024 < 20; // 20 MB

              if (!isValidSize) {
                toast.error("Invalid file size!");
                onError("Invalid file size");
                return;
              }

              const storageRef = ref(storage, `videos/${file.name}`);
              const uploadTask = uploadBytesResumable(storageRef, file);

              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  setUploadProgress((prev) => ({
                    ...prev,
                    [file.uid]: progress,
                  }));
                },
                (error) => {
                  console.error("Upload error:", error);
                  toast.error("Upload failed.");
                  onError(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      console.log("Video available at", downloadURL);
                      setVideoUrl(downloadURL); // Chỉ lưu URL video
                      toast.success("Video uploaded successfully!");
                      onSuccess("Upload complete");
                    })
                    .catch((error) => {
                      console.error("Error getting download URL:", error);
                      toast.error("Failed to get download URL.");
                      onError(error);
                    });
                }
              );
            }}
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
