import React from "react";
import { Select } from "antd";

const SortBy = ({ onSortChange }) => {
  const handleChange = (value) => {
    onSortChange(value);
  };

  return (
    <div className="flex items-center space-x-2">
      <div>Sắp xếp theo:</div>
      <Select
        defaultValue={0}
        style={{ width: 120 }}
        options={[
          { value: 0, label: "Mới nhất" },
          { value: 1, label: "Bán chạy" },
          { value: 2, label: "Tăng dần" },
          { value: 3, label: "Giảm dần" },
        ]}
        onChange={handleChange}
      />
    </div>
  );
};

export default SortBy;
