import React, { useEffect, useState } from "react";
import { Modal, message, Spin } from "antd";
import { getAllPromotionByShopID } from "../../../../api/shoppromotion";

const VoucherModal = ({
  isModalVisible,
  onClose,
  seller,
  selectedPromotions,
  setSelectedPromotions,
}) => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      if (seller && seller.sellerId) {
        try {
          const promotionsData = await getAllPromotionByShopID(seller.sellerId);
          setPromotions(promotionsData);
          setLoading(false);
        } catch (error) {
          message.error("Error fetching promotions.");
          setLoading(false);
        }
      }
    };

    if (isModalVisible) {
      setLoading(true);
      fetchPromotions();
    }
  }, [isModalVisible, seller]);

  const handleSelectVoucher = (promo) => {
    const existingVoucher = selectedPromotions.find(
      (selectedPromo) => selectedPromo.sellerId === seller.sellerId
    );

    if (existingVoucher) {
      if (existingVoucher.id === promo.id) {
        // Nếu chọn lại voucher đã chọn trước đó, huỷ nó
        setSelectedPromotions((prevPromotions) =>
          prevPromotions.filter(
            (selectedPromo) => selectedPromo.sellerId !== seller.sellerId
          )
        );
        message.info("Voucher đã bị huỷ.");
      } else {
        // Nếu chọn voucher mới, thay thế voucher cũ cho seller này
        setSelectedPromotions((prevPromotions) =>
          prevPromotions.map((selectedPromo) =>
            selectedPromo.sellerId === seller.sellerId
              ? { ...promo, sellerId: seller.sellerId } // Thay thế voucher cũ
              : selectedPromo
          )
        );
        message.info("Voucher đã được thay thế.");
      }
    } else {
      // Nếu seller chưa có voucher nào, thêm voucher mới
      setSelectedPromotions((prevPromotions) => [
        ...prevPromotions,
        { ...promo, sellerId: seller.sellerId },
      ]);
      message.info("Voucher đã được chọn.");
    }

    onClose(); // Đóng modal sau khi chọn/vô hiệu hoá voucher
  };

  return (
    <Modal
      title={`Vouchers for ${seller?.sellerName}`}
      open={isModalVisible}
      onCancel={onClose}
      footer={null}
    >
      {loading ? (
        <Spin tip="Loading vouchers..." />
      ) : (
        <div>
          {promotions.map((promo) => (
            <div
              key={promo.id}
              onClick={() => handleSelectVoucher(promo)}
              className={`mb-4 p-4 rounded-lg border-2 ${
                promo.stock > 0
                  ? "border-dashed border-primary"
                  : "border-gray-400"
              } bg-gray-50 shadow-md relative ${
                promo.stock === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <div className="absolute -top-2 -left-2 h-4 w-4 bg-primary rounded-full"></div>
              <div className="absolute -top-2 -right-2 h-4 w-4 bg-primary rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 h-4 w-4 bg-primary rounded-full"></div>
              <div className="absolute -bottom-2 -right-2 h-4 w-4 bg-primary rounded-full"></div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-secondary">
                    {promo.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {promo.description}
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-semibold text-primary">
                      Giảm: {promo.percentDiscount}%
                    </span>
                    <span className="ml-4 font-semibold text-gray-800">
                      Còn lại: {promo.stock > 0 ? promo.stock : "Hết hàng"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default VoucherModal;
