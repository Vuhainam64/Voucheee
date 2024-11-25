import React, { useEffect, useState } from "react";
import { Tree } from "antd";

import { getAllCategory } from "../../../../api/category";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategory();
      if (data) {
        const formattedData = formatTreeData(data.results);
        setCategories(formattedData);
      }
    };

    fetchCategories();
  }, []);

  const formatTreeData = (categories) => {
    const categoryMap = {};

    categories.forEach((category) => {
      const { id, voucherTypeTitle, title } = category;
      if (!categoryMap[voucherTypeTitle]) {
        categoryMap[voucherTypeTitle] = {
          title: voucherTypeTitle,
          value: voucherTypeTitle,
          key: voucherTypeTitle,
          children: [],
        };
      }
      categoryMap[voucherTypeTitle].children.push({
        title: title,
        value: id,
        key: id,
      });
    });

    return Object.values(categoryMap);
  };

  const onCheck = (checkedKeys) => {
    console.log("Checked keys:", checkedKeys);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="font-bold text-xl">Danh mục</div>
      <Tree
        treeData={categories}
        checkable
        onCheck={onCheck}
        defaultExpandAll
        className="overflow-y-auto h-[158px] scrollbar-thin px-4 py-2"
      />
    </div>
  );
};

export default Category;
