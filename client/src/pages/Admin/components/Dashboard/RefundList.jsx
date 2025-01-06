import React, { useState, useEffect } from "react";
import { Table, Image } from "antd";
import { getAllRefund } from "../../../../api/admin";
import { useNavigate } from "react-router-dom";

const RefundList = () => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();

  const handleOrderClick = (refundId) => {
    navigate(`/admin/refund/${refundId}`);
    console.log(refundId);
  };
  // Function to fetch data
  const fetchData = async () => {
    try {
      const result = await getAllRefund();
      setdata(result.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
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
      render: (text) => (
        <a onClick={() => handleOrderClick(text)}>{text}</a> // Clickable Order ID
      ),
    },
    {
      title: "Voucher Name",
      dataIndex: "voucherCode",
      key: "voucherCode",
      render: (voucher) => voucher.name,
    },

    {
      title: "Voucher Status",
      dataIndex: "voucherCode",
      key: "voucherStatus",
      render: (voucher) => voucher.status,
    },

    // {
    //   title: "Voucher Images",
    //   dataIndex: "medias",
    //   key: "medias",
    //   render: (medias) => (
    //     <div>
    //       {medias.map((media) => (
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

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id" // Key for each row, should be unique
      pagination={{ pageSize: 5 }} // Pagination
      bordered={false} // Turn off default border styles
      style={{ width: "100%" }} // Custom styles to fill the container
    />
  );
};

export default RefundList;
