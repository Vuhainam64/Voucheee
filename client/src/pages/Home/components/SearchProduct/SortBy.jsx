import React from "react";
import { Select } from "antd";

const SortBy = () => {
  return (
    <div className="flex items-center space-x-2">
      <div>Sắp xếp theo:</div>
      <Select
        defaultValue="Sắp xếp"
        style={{ width: 120 }}
        options={[
          { value: "time", label: "Mới nhất" },
          { value: "topsell", label: "Bán chạy" },
          { value: "ascending", label: "Tăng dần" },
          { value: "decreasing", label: "Giảm dần" },
        ]}
      />
    </div>
  );
};

export default SortBy;
