import React, { useState } from "react";
import { Slider, InputNumber, Tooltip } from "antd";

import { PiWarningCircleFill } from "react-icons/pi";

const PriceRange = ({ onPriceRangeChange }) => {
  const [priceRange, setPriceRange] = useState([5000, 5000000]);

  const handleSliderChange = (value) => {
    setPriceRange(value);
    onPriceRangeChange(value);
  };

  const handleInputChange = (value, index) => {
    const updatedRange = [...priceRange];
    updatedRange[index] = value;
    if (updatedRange[0] < updatedRange[1]) {
      setPriceRange(updatedRange);
      onPriceRangeChange(updatedRange);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="font-bold text-xl">Khoảng giá</div>

      {/* Slider */}
      <Slider
        range
        min={5000}
        max={10000000}
        value={priceRange}
        onChange={handleSliderChange}
        marks={{
          5000: "5K",
          5000000: "5M",
          10000000: "10M",
        }}
        step={1000}
      />

      {/* Input fields */}
      <div className="flex items-center space-x-2">
        <div className="font-bold">Giá:</div>
        <InputNumber
          min={5000}
          max={priceRange[1] - 1000} // Đảm bảo giá trị nhỏ hơn giá trị tối đa
          step={1000}
          value={priceRange[0]}
          onChange={(value) => handleInputChange(value, 0)}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />
        <span> - </span>
        <InputNumber
          min={priceRange[0] + 1000} // Đảm bảo giá trị lớn hơn giá trị tối thiểu
          max={10000000}
          step={1000}
          value={priceRange[1]}
          onChange={(value) => handleInputChange(value, 1)}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />
        <Tooltip title="Giá trị K,M tương ứng với 1.000, 1.000.000">
          <PiWarningCircleFill />
        </Tooltip>
      </div>
    </div>
  );
};

export default PriceRange;
