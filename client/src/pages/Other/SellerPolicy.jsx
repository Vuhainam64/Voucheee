import React, { useState } from "react";
import { Typography, Divider, Anchor, Card, Button } from "antd";

const { Title, Paragraph } = Typography;
const { Link } = Anchor;

const SellerPolicy = () => {
  const [language, setLanguage] = useState("vi");

  const content = {
    vi: {
      introduction: "1. Giới thiệu",
      introParagraph:
        "Chào mừng bạn đến với nền tảng thương mại điện tử của chúng tôi! Là một người bán cung cấp e-voucher, bạn cần tuân thủ chính sách sau đây. Chính sách này nhằm tạo ra một thị trường minh bạch, an toàn và hiệu quả cho cả người bán và người mua. Bằng cách đăng bán e-voucher trên nền tảng của chúng tôi, bạn đồng ý tuân theo các điều khoản này.",
      productListings: "2. Danh sách sản phẩm (E-Vouchers)",
      pricingPayment: "3. Giá cả và Thanh toán",
      refundPolicy: "4. Chính sách Hoàn tiền và Hủy bỏ",
      prohibitedConduct: "5. Hành vi Bị cấm",
      voucherExpiration: "6. Thời hạn và Điều khoản Voucher",
      sellerResponsibilities: "7. Trách nhiệm của Người bán",
    },
    en: {
      introduction: "1. Introduction",
      introParagraph:
        "Welcome to our e-commerce platform! As a seller offering e-vouchers, you are required to comply with the following policy. This policy is designed to create a transparent, safe, and efficient marketplace for both sellers and buyers. By listing and selling e-vouchers on our platform, you agree to abide by these terms.",
      productListings: "2. Product Listings (E-Vouchers)",
      pricingPayment: "3. Pricing and Payment",
      refundPolicy: "4. Refund and Cancellation Policy",
      prohibitedConduct: "5. Prohibited Conduct",
      voucherExpiration: "6. Voucher Expiration and Terms",
      sellerResponsibilities: "7. Seller Responsibilities",
    },
  };

  const lang = content[language];

  return (
    <div className="policy-container p-8">
      {/* Language Selector */}
      <div className="flex justify-end mb-4">
        <Button
          type={language === "vi" ? "primary" : "default"}
          onClick={() => setLanguage("vi")}
        >
          Tiếng Việt
        </Button>
        <Button
          type={language === "en" ? "primary" : "default"}
          onClick={() => setLanguage("en")}
          className="ml-2"
        >
          English
        </Button>
      </div>

      <div className="flex space-x-4">
        <div className="w-3/4 bg-white p-4 rounded-lg">
          <Typography>
            <Title id="introduction" level={2}>
              {lang.introduction}
            </Title>
            <Paragraph>{lang.introParagraph}</Paragraph>
            <Divider />

            <Title id="product-listings" level={2}>
              {lang.productListings}
            </Title>
            <Paragraph>
              {language === "vi"
                ? "Người bán phải đảm bảo rằng tất cả các sản phẩm e-voucher đều hợp pháp, hợp lệ và tuân thủ các luật và quy định hiện hành. Tất cả danh sách e-voucher phải bao gồm:"
                : "Sellers must ensure that all e-voucher products are legal, valid, and compliant with applicable laws and regulations. All e-voucher listings must include:"}
            </Paragraph>
            <ul>
              <li>
                {language === "vi"
                  ? "Mô tả rõ ràng và chính xác về voucher, bao gồm giá trị, điều khoản, ngày hết hạn, hướng dẫn sử dụng và bất kỳ hạn chế nào."
                  : "Clear and accurate descriptions of the voucher, including its value, terms, expiration date, usage instructions, and any applicable restrictions."}
              </li>
              <li>
                {language === "vi"
                  ? "Danh sách chi tiết những gì voucher có thể đổi được, dù đó là sản phẩm, dịch vụ hay trải nghiệm."
                  : "A detailed list of what the voucher can be redeemed for, whether it's for a product, service, or experience."}
              </li>
              <li>
                {language === "vi"
                  ? "Hình ảnh sản phẩm chính xác (nếu có), giúp người mua dễ dàng nhận biết sản phẩm họ đang mua."
                  : "Accurate product images (if relevant), ensuring the buyer can easily identify what they are purchasing."}
              </li>
            </ul>
            <Divider />

            <Title id="pricing-payment" level={2}>
              {lang.pricingPayment}
            </Title>
            <Divider />

            <Title id="refund-policy" level={2}>
              {lang.refundPolicy}
            </Title>
            <Divider />

            <Title id="prohibited-conduct" level={2}>
              {lang.prohibitedConduct}
            </Title>
            <Divider />

            <Title id="voucher-expiration" level={2}>
              {lang.voucherExpiration}
            </Title>
            <Divider />

            <Title id="seller-responsibilities" level={2}>
              {lang.sellerResponsibilities}
            </Title>
          </Typography>
        </div>
        <div className="w-1/4">
          <Card
            title={language === "vi" ? "Mục lục" : "Table of Contents"}
            className="sticky top-4"
          >
            <Anchor>
              <Link href="#introduction" title={lang.introduction} />
              <Link href="#product-listings" title={lang.productListings} />
              <Link href="#pricing-payment" title={lang.pricingPayment} />
              <Link href="#refund-policy" title={lang.refundPolicy} />
              <Link href="#prohibited-conduct" title={lang.prohibitedConduct} />
              <Link href="#voucher-expiration" title={lang.voucherExpiration} />
              <Link
                href="#seller-responsibilities"
                title={lang.sellerResponsibilities}
              />
            </Anchor>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellerPolicy;
