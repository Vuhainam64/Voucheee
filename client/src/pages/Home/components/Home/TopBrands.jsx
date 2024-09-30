import React from "react";

const TopBrands = () => {
  return (
    <div className="flex flex-col w-full max-w-[1330px] py-4 space-y-4">
      <div className="w-full text-center text-2xl font-semibold">
        Top thương hiệu nổi bật
      </div>
      <div className="flex items-center justify-center">
        <div className="flex space-x-8">
          {Array.from({ length: 7 }).map((_, index) => (
            <img
              key={index} // Thêm key cho mỗi phần tử trong danh sách
              src="https://www.giftpop.vn/upload/shBBS/1534412120.png"
              alt=""
              className="w-40 h-40" // Kích thước của hình ảnh
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBrands;
