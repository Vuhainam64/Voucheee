import React from "react";
import { Button, Space, TreeSelect } from "antd";
import { TreeNode } from "antd/es/tree-select";

const IncomeStatement = () => {
  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="text-xl font-semibold">Xem sao kê</div>
      <Space.Compact block>
        <Button>Submit</Button>
        <TreeSelect
          showSearch
          style={{
            width: "60%",
          }}
          value="leaf1"
          dropdownStyle={{
            maxHeight: 400,
            overflow: "auto",
          }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          onChange={() => {}}
        >
          <TreeNode value="parent 1" title="parent 1">
            <TreeNode value="parent 1-0" title="parent 1-0">
              <TreeNode value="leaf1" title="leaf1" />
              <TreeNode value="leaf2" title="leaf2" />
            </TreeNode>
            <TreeNode value="parent 1-1" title="parent 1-1">
              <TreeNode
                value="leaf3"
                title={
                  <b
                    style={{
                      color: "#08c",
                    }}
                  >
                    leaf3
                  </b>
                }
              />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
      </Space.Compact>
    </div>
  );
};

export default IncomeStatement;
