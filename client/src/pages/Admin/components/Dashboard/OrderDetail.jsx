import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row, Button, Descriptions, Tag, Spin } from "antd";
import { getDetaiOrder } from "../../../../api/admin";

const OrderDetail = () => {
  const [order, setOrders] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDetaiOrder(id);
        console.log(result);
        setOrders(result); // Set orders to the fetched data
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); // Turn off loading once the data is fetched
      }
    };
    fetchData();
  }, [id]);

  // If data is still loading, show the spinner
  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      />
    );
  }

  // If the order data is not available
  if (!order) {
    return <div>No order found.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Check if order is available before rendering the Card */}
      <Card
        title={`Order ID: ${order.id}`}
        style={{ marginBottom: "20px" }}
        extra={
          <Button type="primary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        }
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Status">
            <Tag color={order.status === "PAID" ? "green" : "red"}>
              {order.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Total Price">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(order.totalPrice)}
          </Descriptions.Item>
          <Descriptions.Item label="Discount Price">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(order.discountPrice)}
          </Descriptions.Item>
          <Descriptions.Item label="Final Price">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(order.finalPrice)}
          </Descriptions.Item>
          <Descriptions.Item label="VPoints Earned">
            {order.vPointUp}
          </Descriptions.Item>
          <Descriptions.Item label="Order Date">
            {new Date(order.createDate).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Note">
            {order.note || "No additional notes."}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Order Details" bordered={false}>
        <Row gutter={16}>
          {/* Check if orderDetails is an array and has items */}
          {Array.isArray(order.orderDetails) &&
          order.orderDetails.length > 0 ? (
            order.orderDetails.map((item) => (
              <Col span={8} key={item.modalId}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={item.brandName}
                      src={item.image}
                      style={{ width: "100%", height: "auto" }}
                    />
                  }
                >
                  <Card.Meta
                    title={item.brandName}
                    description={`Seller: ${item.sellerName}`}
                  />
                  <div style={{ marginTop: "10px" }}>
                    <p>
                      <strong>Price:</strong>{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.unitPrice)}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Total:</strong>{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.totalPrice)}
                    </p>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>No order details available</Col> // If no order details
          )}
        </Row>
      </Card>
    </div>
  );
};

export default OrderDetail;
