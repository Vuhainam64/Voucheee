import React, { useEffect, useState } from "react";

import { getBestSupplier } from "../../../../api/supplier";

const TopBrands = () => {
  const [suppliers, setSuppliers] = useState([]);

  const fetchSuppliers = async () => {
    const data = await getBestSupplier();
    if (data) setSuppliers(data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-[1330px] py-4 space-y-4">
      <div className="w-full text-center text-2xl font-semibold">
        Top thương hiệu nổi bật
      </div>
      <div className="flex items-center justify-center">
        <div className="flex space-x-8">
          {suppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="flex flex-col items-center space-y-2"
            >
              <img
                src={supplier.image}
                alt={supplier.name}
                className="w-40 h-40 rounded-full object-cover"
              />
              <div className="text-lg font-medium">{supplier.name}</div>
              <div className="text-sm text-gray-500">
                Đã bán: {supplier.soldVoucher.toLocaleString("vi-VN")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBrands;
