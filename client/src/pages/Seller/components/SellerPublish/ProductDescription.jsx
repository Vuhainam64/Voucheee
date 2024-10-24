import React from "react";
import ReactQuill from "react-quill";

import TextEditorBar, {
  formats,
  modules,
} from "../../../../components/ReactQuill/TextEditorBar";

const ProductDescription = ({ description, setDescription }) => {
  return (
    <div className="bg-white px-6 rounded-xl py-6">
      <div className="text-2xl font-semibold">Mô tả sản phẩm</div>
      <div className="text-gray-500 pb-4">Mô tả chính</div>
      <div className="p-3 border rounded-xl w-full h-fit border-gray-300 bg-white">
        <TextEditorBar toolbarId={"t1"} />
        <ReactQuill
          theme="snow"
          placeholder={"Write something awesome..."}
          modules={modules("t1")}
          formats={formats}
          className="min-h-[20.5rem] max-h-[25.5rem] overflow-auto"
          value={description}
          onChange={(value) => setDescription(value)}
        />
      </div>
    </div>
  );
};

export default ProductDescription;
