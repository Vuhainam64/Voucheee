import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";

import { getAllSupplier } from "../../../../api/supplier";

const Supplier = ({ selectedBrands, setSelectedBrands }) => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const data = await getAllSupplier();
      if (data) {
        setSuppliers(
          data.map((supplier) => ({
            label: supplier.name,
            value: supplier.id,
          }))
        );
      }
    };
    fetchSuppliers();
  }, []);

  const onBrandChange = (checkedValues) => {
    setSelectedBrands(checkedValues);
    console.log("Selected brands:", checkedValues, selectedBrands);
  };

  return (
    <div className="bg-white p-4 rounded-lg space-y-2">
      <div className="font-bold text-xl">Thương hiệu</div>
      <div className="overflow-y-auto scrollbar-thin h-[250px]">
        <Checkbox.Group
          options={suppliers}
          onChange={onBrandChange}
          className="flex flex-col space-y-2 px-4"
        />
      </div>
    </div>
  );
};

export default Supplier;
