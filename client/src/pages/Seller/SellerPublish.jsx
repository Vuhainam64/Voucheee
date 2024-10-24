import React, { useState } from "react";
import { Alert, Anchor, Button, Form, Progress, Steps } from "antd";
import { AiFillAccountBook } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import {
  BasicInformation,
  PriceStockVariations,
  ProductDescription,
  ProductFeatures,
} from "./components/SellerPublish";

import { createVoucher } from "../../api/voucher";

const SellerPublish = () => {
  const [showStepsBasicInformation, setShowStepsBasicInformation] =
    useState(false);
  const [brandId, setBrandId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [categoryId, setCategoryId] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [modals, setModals] = useState([]);
  console.log(videoUrl);
  const onFinish = async (values) => {
    const data = {
      brandId,
      supplierId,
      categoryId,
      title,
      description,
      images,
      video: videoUrl,
      status: 0,
      modals: modals.map((modal) => ({
        title: modal.title,
        originalPrice: modal.originalPrice,
        sellPrice: modal.sellPrice,
        image: modal.image,
        status: modal.status,
      })),
    };

    try {
      const response = await createVoucher(data);
      if (response) {
        console.log("Voucher created successfully:", response);
      } else {
        console.error("Failed to create voucher");
      }
    } catch (error) {
      console.error("Error creating voucher:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full h-full p-8 flex flex-col">
      <div className="flex items-center space-x-2">
        <AiFillAccountBook className="text-xl" />
        <div>Sản Phẩm</div>
        <FaChevronRight />
        <div>Thêm Sản Phẩm</div>
      </div>

      <div className="text-2xl font-semibold py-4">Thêm sản phẩm</div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-4">
          <Form
            name="addVoucher"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="space-y-6"
            initialValues={{
              brandName: "Chọn Thương Hiệu",
              supplierName: "Chọn Nhà Cung Cấp",
            }}
          >
            <div id="basic-information">
              <BasicInformation
                setCategoryId={setCategoryId}
                title={title}
                setTitle={setTitle}
                setImages={setImages}
                setVideoUrl={setVideoUrl}
              />
            </div>
            <div id="product-features">
              <ProductFeatures
                setBrandId={setBrandId}
                setSupplierId={setSupplierId}
              />
            </div>
            <div id="price-stock-variations">
              <PriceStockVariations setModals={setModals} />
            </div>
            <div id="product-description">
              <ProductDescription
                description={description}
                setDescription={setDescription}
              />
            </div>
            <div className="bg-white px-6 rounded-xl py-6 flex justify-between space-x-4">
              <div className="flex-1">
                <Alert
                  message="Danh mục sản phẩm là bằng tay lựa chọn. Sản phẩm với sai Category sẽ bị đình chỉ."
                  type="warning"
                  showIcon
                />
              </div>
              <div className="flex items-center space-x-4">
                <Button>Lưu bản nháp</Button>
                <Button type="primary" htmlType="submit">
                  Gửi đi
                </Button>
              </div>
            </div>
          </Form>
        </div>

        <div className="col-span-1 h-screen sticky top-4 space-y-4">
          <div className="bg-white rounded-xl p-6">
            <div className="text-xl font-semibold">Điểm nội dung</div>
            <Progress percent={30} size="small" />
            <Anchor
              offsetTop={100}
              items={[
                {
                  key: "basic-information",
                  href: "#basic-information",
                  title: (
                    <div
                      onClick={() =>
                        setShowStepsBasicInformation(!showStepsBasicInformation)
                      }
                      className="cursor-pointer"
                    >
                      <div className="font-semibold pb-2">Thông tin cơ bản</div>
                      {showStepsBasicInformation && (
                        <Steps
                          progressDot
                          direction="vertical"
                          current={1}
                          items={[
                            {
                              title: "Finished",
                              description: "Thêm ít nhất 3 ảnh chính.",
                            },
                            {
                              title: "In Progress",
                              description: "Chất lượng tiêu đề",
                            },
                            {
                              title: "Waiting",
                              description:
                                "This is a description. This is a description.",
                            },
                          ]}
                        />
                      )}
                    </div>
                  ),
                },
                {
                  key: "product-features",
                  href: "#product-features",
                  title: (
                    <div>
                      <div className="font-semibold pb-2">
                        Đặc tính sản phẩm
                      </div>
                    </div>
                  ),
                },
                {
                  key: "price-stock-variations",
                  href: "#price-stock-variations",
                  title: "Giá bán, Kho hàng và Biến thể",
                },
                {
                  key: "product-description",
                  href: "#product-description",
                  title: "Mô tả sản phẩm",
                },
              ]}
            />
          </div>
          <div className="bg-white rounded-xl p-6 space-y-2">
            <div className="text-xl font-semibold text-blue-500">Tips</div>
            <div className="text-gray-500">
              Vui lòng tải lên hình ảnh, điền tên sản phẩm và chọn đúng ngành
              hàng trước khi đăng tải sản phẩm.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPublish;
