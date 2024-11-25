import React, { useState } from "react";
import { Slider, Tooltip } from "antd";

import { PiWarningCircleFill } from "react-icons/pi";

const PriceRange = () => {
  const [priceRange, setPriceRange] = useState([5000, 5000000]);

  const onChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="font-bold text-xl">Khoảng giá</div>
      <Slider
        range
        min={5000}
        max={10000000}
        onChange={onChange}
        value={priceRange}
        marks={{
          5000: "5K",
          5000000: "5M",
          10000000: "10M",
        }}
        step={1000}
      />
      <div className="flex space-x-1">
        <div>
          Giá: {priceRange[0].toLocaleString()} -{" "}
          {priceRange[1].toLocaleString()}
        </div>
        <Tooltip title="Giá trị K,M tương ứng với 1.000, 1.000.000">
          <PiWarningCircleFill />
        </Tooltip>
      </div>
    </div>
  );
};

export default PriceRange;
