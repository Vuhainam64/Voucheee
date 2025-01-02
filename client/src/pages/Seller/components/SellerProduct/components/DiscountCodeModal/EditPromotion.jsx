import React, { useEffect } from "react";
import { Modal, Form, Input, Button, DatePicker, Switch, message } from "antd";
import dayjs from "dayjs";
import { updatePromotion } from "../../../../../../api/shoppromotion";

const { RangePicker } = DatePicker;

const EditPromotion = ({
  isVisible,
  onClose,
  promotion,
  onPromotionUpdated,
}) => {
  const [form] = Form.useForm();

  // Populate form fields with the selected promotion
  useEffect(() => {
    if (promotion) {
      form.setFieldsValue({
        name: promotion.name,
        description: promotion.description,
        percentDiscount: promotion.percentDiscount,
        dateRange: [dayjs(promotion.startDate), dayjs(promotion.endDate)],
        stock: promotion.stock,
        isActive: promotion.isActive,
        id: promotion.id,
      });
    }
  }, [promotion, form]);

  const handleEditPromotion = async (values) => {
    try {
      await updatePromotion(
        values.name,
        values.description,
        values.percentDiscount,
        values.dateRange[0].format("YYYY-MM-DD"),
        values.dateRange[1].format("YYYY-MM-DD"),
        values.stock,
        values.isActive,
        promotion.id
      );

      message.success("Cập nhật mã giảm giá thành công!");
      onPromotionUpdated({
        ...promotion,
        ...values,
        startDate: values.dateRange[0].format("YYYY-MM-DD"),
        endDate: values.dateRange[1].format("YYYY-MM-DD"),
      });
      onClose();
    } catch (error) {
      message.error("Cập nhật mã giảm giá thất bại!");
    }
  };

  return (
    <Modal
      title="Chỉnh sửa mã giảm giá"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleEditPromotion}>
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
          <Input.TextArea />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPromotion;
