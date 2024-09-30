import React, { useRef } from "react";
import { Link } from "react-router-dom";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import {
  AllGift,
  Beauty,
  Course,
  Entertainment,
  Food,
  GiftBox,
  Golf,
  Lounge,
  Software,
  Travel,
} from "../../../../assets/img/category";

const CategoryCard = ({ link, img, label, padding = true }) => {
  return (
    <Link
      to={link}
      className="items-center justify-center space-y-4 bg-white p-4 rounded-xl 
        cursor-pointer hover:no-underline hover:text-primary min-w-40"
    >
      <div className="flex w-full items-center justify-center">
        <img
          src={img}
          alt={label}
          className={`w-16 h-16 bg-gray-200 rounded-full ${
            padding ? "p-2" : ""
          }`}
        />
      </div>
      <div className="w-full text-center text-nowrap">{label}</div>
    </Link>
  );
};

const Category = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -200, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="my-4 relative">
      {/* Nút mũi tên trái */}
      <button
        className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 
  rounded-full z-10 bg-opacity-70 hover:text-primary"
        onClick={() => scroll("left")}
      >
        <FaChevronLeft />
      </button>

      {/* Vùng danh mục sản phẩm */}
      <div
        className="flex items-center space-x-4 py-4 overflow-x-scroll scrollbar-none"
        ref={scrollRef}
      >
        <CategoryCard link="/category/1" img={AllGift} label="Tất cả" />
        <CategoryCard
          link="/category/1"
          img={Entertainment}
          label="Vui chơi - Giải trí"
        />
        <CategoryCard
          link="/category/2"
          img={Beauty}
          label="Sức khoẻ và Làm đẹp"
        />
        <CategoryCard link="/category/3" img={Food} label="Ăn uống" />
        <CategoryCard
          link="/category/4"
          img={Travel}
          label="Du lịch và Khách sạn"
          padding={false}
        />
        <CategoryCard link="/category/5" img={Golf} label="Booking Golf" />
        <CategoryCard
          link="/category/6"
          img={Course}
          label="Khoá học và Đào tạo"
        />
        <CategoryCard link="/category/6" img={Software} label="Phần mềm" />
        <CategoryCard
          link="/category/7"
          img={Lounge}
          label="Phòng chờ sân bay"
        />
        <CategoryCard link="/category/7" img={GiftBox} label="Quà tặng" />
      </div>

      {/* Nút mũi tên phải */}
      <button
        className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 bg-gray-200 
  p-2 rounded-full z-10 hover:text-primary bg-opacity-70"
        onClick={() => scroll("right")}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Category;
