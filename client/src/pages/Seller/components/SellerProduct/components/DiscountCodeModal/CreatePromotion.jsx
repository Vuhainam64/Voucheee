import React, { useState } from "react";
import { Modal, Form, Input, Switch, Button, DatePicker, message } from "antd";
import TextArea from "antd/es/input/TextArea";

import { createPromotion } from "../../../../../../api/shoppromotion";

const { RangePicker } = DatePicker;

const CreatePromotion = ({ isVisible, onClose, onPromotionAdded }) => {
  const [addForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleAddPromotion = async (values) => {
    try {
      setLoading(true);
      const response = await createPromotion(
        values.name,
        values.description,
        values.percentDiscount,
        values.dateRange[0].format("YYYY-MM-DD"),
        values.dateRange[1].format("YYYY-MM-DD"),
        values.stock,
        values.isActive
      );

      message.success(response.message);
      onPromotionAdded(response.value, values);
      onClose();
      addForm.resetFields();
    } catch (error) {
      message.error("Thêm mã giảm giá thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm Mã Giảm Giá"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={900}
    >
      <Form layout="vertical" form={addForm} onFinish={handleAddPromotion}>
        <Form.Item
          label="Tên khuyến mãi"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên khuyến mãi" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày bắt đầu - Ngày kết thúc"
          name="dateRange"
          rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
        >
          <RangePicker />
        </Form.Item>
        <div className="flex items-center justify-between">
          <Form.Item
            label="Phần trăm giảm"
            name="percentDiscount"
            rules={[
              { required: true, message: "Vui lòng nhập phần trăm giảm giá" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="stock"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Trạng thái" name="isActive" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePromotion;
