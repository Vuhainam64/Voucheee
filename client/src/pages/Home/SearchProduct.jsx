import React, { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Spin } from "antd";

import {
  Category,
  PriceRange,
  SortBy,
  Supplier,
} from "./components/SearchProduct";
import { searchProduct } from "../../api/voucher";

let debounceTimer = null;

const SearchProduct = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  const [products, setProducts] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [sortVoucherEnum, setSortVoucherEnum] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([5000, 5000000]);
  const [debouncedPriceRange, setDebouncedPriceRange] = useState([
    5000, 5000000,
  ]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("q: ", q);
  console.log("sortVoucherEnum: ", sortVoucherEnum);
  console.log("priceRange: ", priceRange);
  console.log("debouncedPriceRange: ", debouncedPriceRange);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = {
          title: q,
          sortVoucherEnum,
          categoryIDs: selectedCategories,
          minPrice: debouncedPriceRange[0],
          maxPrice: debouncedPriceRange[1],
        };

        const response = await searchProduct(params);
        setProducts(response.results);
        setTotalResults(response.metaData.total);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [q, sortVoucherEnum, selectedCategories, debouncedPriceRange]);

  const handleSortChange = (value) => {
    setSortVoucherEnum(value);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    // Reset debounce timer mỗi khi thay đổi
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setDebouncedPriceRange(range); // Cập nhật giá trị debounce sau 1 giây
    }, 1000);
  };

  return (
    <div className="bg-gray-100 flex-grow">
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-4 gap-4 py-4">
        <div className="space-y-4">
          {/* Danh mục */}
          <Category onCategoryChange={handleCategoryChange} />

          {/* Thương hiệu */}
          <Supplier />

          {/* Khoảng giá */}
          <PriceRange onPriceRangeChange={handlePriceRangeChange} />
        </div>

        {/* Kết quả tìm kiếm */}
        <div className="col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="font-bold">
                Tìm thấy {totalResults} kết quả cho
              </div>
              <div>{q}</div>
            </div>
            <SortBy onSortChange={handleSortChange} />
          </div>

          {/* Hiển thị Spin nếu đang tải */}
          {isLoading ? (
            <div className="flex justify-center items-center h-[calc(100vh-298px)]">
              <Spin size="large" />
            </div>
          ) : (
            <div
              className="grid grid-cols-4 gap-4 overflow-y-auto scrollbar-none"
              style={{ maxHeight: "calc(100vh - 298px)" }}
            >
              {products.map((product) => (
                <Link
                  to={`/detail/${product.id}`}
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg flex flex-col hover:no-underline"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-40 w-full object-cover rounded-t-lg"
                    />
                    <div className="bg-black h-full w-full rounded-t-lg opacity-10 absolute top-0 left-0"></div>
                    <div className="absolute px-2 py-1 rounded-xl bg-primary text-white top-2 left-2">
                      Giảm {product.shopDiscount}%
                    </div>
                    <div className="absolute px-2 py-1 rounded-xl bottom-2 left-2">
                      <div className="flex items-center justify-center text-white">
                        <img
                          src={product.brandImage}
                          alt={product.brandName}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="ml-2">{product.brandName}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <div className="text-gray-800">{product.title}</div>
                    <div className="font-semibold text-lg text-primary">
                      {product.salePrice
                        ? product.salePrice.toLocaleString()
                        : product.salePrice}
                      đ
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
