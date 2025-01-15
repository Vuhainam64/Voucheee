import React from "react";
import { Typography, Divider, Anchor, Card } from "antd";

const { Title, Paragraph, Text } = Typography;
const { Link } = Anchor;

const SellerPolicy = () => {
  return (
    <div className="policy-container p-8">
      <div className="flex space-x-4">
        <div className="w-3/4 bg-white p-4 rounded-lg">
          <Typography>
            <Title id="introduction" level={2}>
              1. Introduction
            </Title>
            <Paragraph>
              Welcome to our e-commerce platform! As a seller offering
              e-vouchers, you are required to comply with the following policy.
              This policy is designed to create a transparent, safe, and
              efficient marketplace for both sellers and buyers. By listing and
              selling e-vouchers on our platform, you agree to abide by these
              terms.
            </Paragraph>
            <Divider />

            <Title id="product-listings" level={2}>
              2. Product Listings (E-Vouchers)
            </Title>
            <Paragraph>
              Sellers must ensure that all e-voucher products are legal, valid,
              and compliant with applicable laws and regulations. All e-voucher
              listings must include:
            </Paragraph>
            <ul>
              <li>
                Clear and accurate descriptions of the voucher, including its
                value, terms, expiration date, usage instructions, and any
                applicable restrictions.
              </li>
              <li>
                A detailed list of what the voucher can be redeemed for, whether
                it's for a product, service, or experience.
              </li>
              <li>
                Accurate product images (if relevant), ensuring the buyer can
                easily identify what they are purchasing.
              </li>
            </ul>
            <Paragraph>
              E-vouchers must not be misleading or ambiguous in terms of their
              offerings. Sellers should make clear any limitations of the
              e-voucher, such as geographic restrictions, product exclusions, or
              other conditions.
            </Paragraph>
            <Divider />

            <Title id="pricing-payment" level={2}>
              3. Pricing and Payment
            </Title>
            <Paragraph>
              Sellers are responsible for setting the prices of their
              e-vouchers. The price should not exceed the face value of the
              voucher unless otherwise authorized.
            </Paragraph>
            <Paragraph>
              The platform will charge a commission fee on the sale of
              e-vouchers, which will be deducted from the final sale price.
              Sellers must ensure that the payment processing system is secure
              and that all transactions are handled through the platform’s
              payment gateway.
            </Paragraph>
            <Divider />

            <Title id="refund-policy" level={2}>
              4. Refund and Cancellation Policy
            </Title>
            <Paragraph>
              E-vouchers are generally non-refundable unless specified otherwise
              in the seller’s terms. However, if a buyer encounters issues such
              as an invalid voucher or a product that cannot be redeemed,
              sellers should work to resolve the issue.
            </Paragraph>
            <ul>
              <li>
                Refunds for e-vouchers may be issued in cases where the voucher
                is defective, expired, or cannot be used as intended.
              </li>
              <li>
                Sellers must clearly state their refund and cancellation
                policies on their listing pages, including any applicable
                conditions and timeframes for requesting a refund.
              </li>
            </ul>
            <Divider />

            <Title id="prohibited-conduct" level={2}>
              5. Prohibited Conduct
            </Title>
            <Paragraph>
              Sellers must refrain from the following actions:
            </Paragraph>
            <ul>
              <li>
                Selling counterfeit, fraudulent, or unauthorized e-vouchers.
              </li>
              <li>
                Misleading buyers regarding the redemption process, expiry date,
                or value of e-vouchers.
              </li>
              <li>
                Engaging in any form of fraudulent activity such as artificially
                inflating voucher prices or manipulating ratings and reviews.
              </li>
              <li>
                Using e-vouchers for illegal activities or offering vouchers
                that violate any local, national, or international laws.
              </li>
              <li>Listing expired or invalid e-vouchers for sale.</li>
            </ul>
            <Divider />

            <Title id="voucher-expiration" level={2}>
              6. Voucher Expiration and Terms
            </Title>
            <Paragraph>
              Sellers must provide clear information regarding the expiration
              date of the e-voucher, if applicable. The expiration date should
              be reasonable and comply with local regulations regarding gift
              cards or promotional vouchers.
            </Paragraph>
            <Divider />

            <Title id="seller-responsibilities" level={2}>
              7. Seller Responsibilities
            </Title>
            <Paragraph>
              Sellers must keep their product listings up to date, ensuring that
              all information, such as expiration dates, product availability,
              and terms, are accurate and reflective of the current offering.
            </Paragraph>
            <Paragraph>
              Sellers must handle all customer inquiries and complaints in a
              professional manner.
            </Paragraph>
          </Typography>
        </div>
        <div className="w-1/4">
          <Card title="Table of Contents" className="sticky top-4">
            <Anchor>
              <Link href="#introduction" title="1. Introduction" />
              <Link
                href="#product-listings"
                title="2. Product Listings (E-Vouchers)"
              />
              <Link href="#pricing-payment" title="3. Pricing and Payment" />
              <Link
                href="#refund-policy"
                title="4. Refund and Cancellation Policy"
              />
              <Link href="#prohibited-conduct" title="5. Prohibited Conduct" />
              <Link
                href="#voucher-expiration"
                title="6. Voucher Expiration and Terms"
              />
              <Link
                href="#seller-responsibilities"
                title="7. Seller Responsibilities"
              />
            </Anchor>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellerPolicy;
