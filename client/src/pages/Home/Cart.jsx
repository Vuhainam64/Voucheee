import { Button, Checkbox, Image, InputNumber, Space } from "antd";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FcShop } from "react-icons/fc";
import { MdMessage } from "react-icons/md";
import { HiOutlineTicket } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";

import { getCart } from "../../api/cart";
import { PaymentForm, VoucherModal } from "./components/Cart";

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isVoucherModalVisible, setIsVoucherModalVisible] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedPromotions, setSelectedPromotions] = useState([]);

  console.log(selectedItems);
  console.log(selectedPromotions);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await getCart();
        setCartData(data);
      } catch (error) {
        toast.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  const handleCheckboxChange = (checked, sellerId, modal) => {
    const selectedItem = {
      quantity: modal.quantity,
      id: modal.id,
      salePrice: modal.salePrice,
    };

    setSelectedItems((prevItems) => {
      let updatedItems = [...prevItems];

      if (checked) {
        const sellerIndex = updatedItems.findIndex(
          (item) => item.sellerId === sellerId
        );

        if (sellerIndex === -1) {
          updatedItems.push({
            sellerId: sellerId,
            promotions: {
              id: null,
              name: null,
              description: null,
              percentDiscount: null,
              moneyDiscount: null,
              requiredQuantity: null,
              maxMoneyToDiscount: null,
              minMoneyToApply: null,
            },
            modals: [selectedItem],
          });
        } else {
          const productIndex = updatedItems[sellerIndex].modals.findIndex(
            (item) => item.id === selectedItem.id
          );

          if (productIndex === -1) {
            updatedItems[sellerIndex].modals.push(selectedItem);
          } else {
            updatedItems[sellerIndex].modals[productIndex].quantity +=
              selectedItem.quantity;
          }
        }
      } else {
        updatedItems = updatedItems.map((item) => {
          if (item.sellerId === sellerId) {
            item.modals = item.modals.filter(
              (modalItem) => modalItem.id !== selectedItem.id
            );
          }
          return item;
        });
      }

      updatedItems = updatedItems.filter((item) => item.modals.length > 0);

      return updatedItems;
    });
  };

  const renderSellers = () => {
    return cartData?.sellers.map((seller) => (
      <div key={seller.sellerId} className="bg-white rounded-lg">
        <div className="flex items-center space-x-4 border-b py-4 px-4">
          <Checkbox
            onChange={(e) =>
              handleCheckboxChange(
                e.target.checked,
                seller.sellerId,
                seller.modals[0]
              )
            }
          />
          <Link
            to={`/store/${seller.sellerId}`}
            className="flex items-center space-x-2"
          >
            <FcShop />
            <div>{seller.sellerName}</div>
          </Link>
          <MdMessage />
        </div>

        <div className="pb-4 px-4">
          {seller.modals.map((modal) => (
            <div
              key={modal.id}
              className="flex items-center space-x-4 border-b py-4 justify-between"
            >
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange(e.target.checked, seller.sellerId, modal)
                }
              />
              <Image width={100} src={modal.image} />
              <div className="flex-1">
                <div>{modal.title}</div>
                <div>{modal.brandName}</div>
              </div>
              <div className="line-through text-gray-500">
                {modal.originalPrice}
              </div>
              <div>{modal.sellPrice}</div>
              <Space.Compact>
                <Button>-</Button>
                <InputNumber min={1} max={10} value={modal.quantity} />
                <Button>+</Button>
              </Space.Compact>
              <div className="text-primary text-lg font-semibold">
                {modal.totalFinalPrice}
              </div>
              <motion.div className="hover:text-red-600 cursor-pointer">
                <FaRegTrashAlt />
              </motion.div>
            </div>
          ))}
        </div>

        <div className="pb-4 px-4 flex items-center space-x-4">
          <div
            className="flex items-center space-x-2 group cursor-pointer"
            onClick={() => handleVoucherModalOpen(seller.sellerId)}
          >
            <HiOutlineTicket className="text-xl text-primary transition-colors" />
            <div className="text-primary transition-all">Xem thêm voucher</div>
          </div>
          <div>
            {selectedPromotions
              .filter((promo) => promo.sellerId === seller.sellerId)
              .map((promo) => (
                <div key={promo.id} className="text-primary text-sm">
                  {promo.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    ));
  };

  const handleVoucherModalOpen = (sellerId) => {
    setSelectedSeller(cartData.sellers.find((s) => s.sellerId === sellerId));
    setIsVoucherModalVisible(true);
  };

  return (
    <div className="w-full bg-slate-100">
      <div className="max-w-[1400px] w-full flex flex-col mx-auto p-4">
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="col-span-2">
            <div
              className="overflow-y-auto scrollbar-none space-y-4"
              style={{ height: "calc(100vh - 314px)" }}
            >
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Checkbox />
                  <div>Sản phẩm</div>
                </div>
              </div>

              {renderSellers()}
            </div>
          </div>

          <PaymentForm
            selectedVoucher={[]}
            cartData={cartData}
            totalPrice={cartData?.balance}
            selectedItems={selectedItems}
          />
        </div>
      </div>

      <VoucherModal
        isModalVisible={isVoucherModalVisible}
        onClose={() => setIsVoucherModalVisible(false)}
        seller={selectedSeller}
        selectedPromotions={selectedPromotions}
        setSelectedPromotions={setSelectedPromotions}
      />
    </div>
  );
};

export default Cart;
