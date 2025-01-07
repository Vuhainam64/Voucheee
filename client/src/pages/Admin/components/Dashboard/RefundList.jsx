import React, { useState, useEffect } from "react";
import { Table, Image, Spin, Alert } from "antd";
import { getAllRefund } from "../../../../api/admin";
import { useNavigate } from "react-router-dom";

const RefundList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOrderClick = (refundId) => {
    navigate(`/admin/refund/${refundId}`);
    console.log(refundId);
  };

  // Function to fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getAllRefund();
      setData(result.results); // assuming result.results is the correct format
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Define table columns
  const columns = [
    {
      title: "Refund ID",
      dataIndex: "id",
      key: "id",
      // render: (text) => (
      //   <a onClick={() => handleOrderClick(text)}>{text}</a> // Clickable Refund ID
      // ),
    },
    {
      title: "Voucher Name",
      dataIndex: "voucherCode", // assuming this contains an object with `name`
      key: "voucherCode",
      render: (voucher) => voucher?.name || "N/A", // Check for undefined value
    },
    {
      title: "Voucher Status",
      dataIndex: "voucherCode", // assuming this contains an object with `status`
      key: "voucherStatus",
      render: (voucher) => voucher?.status || "Unknown", // Check for undefined value
    },
    // {
    //   title: "Voucher Images",
    //   dataIndex: "medias", // assuming `medias` is an array of image objects
    //   key: "medias",
    //   render: (medias) => (
    //     <div>
    //       {medias?.map((media) => (
    //         <Image
    //           key={media.id}
    //           src={media.url}
    //           alt={`Voucher Image ${media.index}`}
    //           width={100}
    //         />
    //       ))}
    //     </div>
    //   ),
    // },
  ];

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message={error} type="error" showIcon />;
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id" // Unique key for each row
      pagination={{ pageSize: 5 }} // Pagination
      bordered={false} // Turn off default border styles
      style={{ width: "100%" }} // Custom styles to fill the container
    />
  );
};

export default RefundList;
