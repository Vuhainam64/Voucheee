import React from "react";
import { Form, Input, Switch, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../../config/firebase.config";

const PriceStockVariations = ({ setModals }) => {
  const [form] = Form.useForm();

  const onValuesChange = (changedValues, allValues) => {
    if (Array.isArray(allValues.variants)) {
      const newModals = allValues.variants
        .filter((variant) => variant)
        .map((variant) => ({
          title: variant.variantName || "",
          originalPrice: variant.originalPrice || 0.01,
          sellPrice: variant.curentPrice || 0.01,
          image: variant.variantImage.length
            ? variant.variantImage[0]?.url || ""
            : "",
          status: variant.isOpen ? 1 : 0,
        }));

      setModals(newModals);
    }
  };

  // Hàm upload ảnh lên Firebase
  const handleUpload = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          message.error("Upload failed!");
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          message.success("Upload successful!");
          resolve({ name: file.name, url: downloadURL });
        }
      );
    });
  };

  // Hàm xóa ảnh khỏi Firebase
  const handleDelete = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      await deleteObject(storageRef);
      message.success("Image deleted successfully!");
    } catch (error) {
      message.error("Failed to delete image!");
    }
  };

  return (
    <div className="bg-white px-6 rounded-xl py-6">
      <div className="text-2xl font-semibold">
        Giá bán, Kho hàng và Biến thể
      </div>
      <div className="text-gray-500">
        Tạo biến thể nếu sản phẩm có hơn một tùy chọn, ví dụ như về giá cả hoặc
        nơi sử dụng đặc biệt
      </div>
      <Form
        form={form}
        initialValues={{
          variants: [
            {
              variantName: "",
              curentPrice: 0.01,
              originalPrice: 0.01,
              isOpen: true,
              variantImage: [],
            },
          ],
        }}
        onValuesChange={onValuesChange}
      >
        <Form.List name="variants">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key || index}
                  className="mt-4 p-4 border rounded-lg"
                >
                  <Form.Item
                    label="Tên biến thể"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={[field.name, "variantName"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input the variant name!",
                      },
                    ]}
                  >
                    <Input placeholder="Variant Name" />
                  </Form.Item>
                  <div className="flex items-center space-x-4">
                    <Form.Item
                      label="Giá bán"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name={[field.name, "curentPrice"]}
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Please input your voucher current Price!",
                        },
                      ]}
                    >
                      <Input addonAfter="₫" min={0} type="number" step="1000" />
                    </Form.Item>
                    <Form.Item
                      label="Giá gốc"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name={[field.name, "originalPrice"]}
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Please input your voucher original Price!",
                        },
                      ]}
                    >
                      <Input addonAfter="₫" min={0} type="number" step="1000" />
                    </Form.Item>
                    <Form.Item
                      label="Mở bán"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name={[field.name, "isOpen"]}
                      className="flex-1"
                    >
                      <Switch defaultChecked={true} />
                    </Form.Item>
                  </div>
                  <Form.Item
                    label="Ảnh"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={[field.name, "variantImage"]}
                    valuePropName="fileList"
                    getValueFromEvent={(e) =>
                      Array.isArray(e) ? e : e && e.fileList
                    }
                    rules={[
                      { required: true, message: "Please upload an image!" },
                    ]}
                  >
                    <ImgCrop rotationSlider>
                      <Upload
                        listType="picture-card"
                        beforeUpload={async (file) => {
                          try {
                            const res = await handleUpload(file);
                            const currentVariants =
                              form.getFieldValue("variants");

                            form.setFieldsValue({
                              variants: currentVariants.map((variant, i) =>
                                i === index
                                  ? {
                                      ...variant,
                                      variantImage: [
                                        { name: res.name, url: res.url },
                                      ],
                                    }
                                  : variant
                              ),
                            });

                            onValuesChange({}, form.getFieldsValue()); // Cập nhật setModals
                          } catch (error) {
                            console.error(error);
                          }
                          return false; // Ngăn chặn upload lên UI
                        }}
                        onRemove={(file) => handleDelete(file)}
                        maxCount={1}
                      >
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => remove(field.name)}
                    block
                  >
                    Xoá
                  </Button>
                </div>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                + Thêm biến thể
              </Button>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

export default PriceStockVariations;
