import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useParams } from "react-router-dom";
import { Image } from "antd";
import { getDetaiRefund } from "../../../../api/admin";

const RefundDetail = () => {
  const [data, setdata] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDetaiRefund(id);
        console.log(result);
        setdata(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [id]);
  const columns = [
    {
      title: "Refund ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Voucher Name",
      dataIndex: "voucherCode",
      key: "voucherCode",
      render: (voucher) => voucher.name,
    },
    {
      title: "Voucher Code",
      dataIndex: "voucherCode",
      key: "voucherCodeCode",
      render: (voucher) => voucher.code,
    },
    {
      title: "Voucher Status",
      dataIndex: "voucherCode",
      key: "voucherStatus",
      render: (voucher) => voucher.status,
    },
    {
      title: "Voucher Brand",
      dataIndex: "voucherCode",
      key: "voucherBrand",
      render: (voucher) => voucher.brand,
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
    {
      title: "Start Date",
      dataIndex: "voucherCode",
      key: "startDate",
      render: (voucher) => new Date(voucher.startDate).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "voucherCode",
      key: "endDate",
      render: (voucher) => new Date(voucher.endDate).toLocaleDateString(),
    },
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

export default RefundDetail;
