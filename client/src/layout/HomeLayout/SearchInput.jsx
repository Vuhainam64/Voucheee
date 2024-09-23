import React, { useState } from "react";
import { Select } from "antd";

import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

let timeout;
let currentValue;

const fetchSuggestions = async (value, callback) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const search = async () => {
    const query = new URLSearchParams({
      query: value,
    }).toString();

    try {
      const response = await fetch(
        `https://us-central1-get-feedback-a0119.cloudfunctions.net/app/api/shopee/search-test?${query}`
      );
      const data = await response.json();

      if (currentValue === value) {
        const results = data.data.map((item) => ({
          value: item.value,
          text: item.value,
          avatar: item.avatar,
          category: item.category,
          url: item.url,
        }));
        callback(results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      callback([]); // Return an empty array on error
    }
  };

  if (value) {
    timeout = setTimeout(search, 300);
  } else {
    callback([]);
  }
};

const SearchInput = ({ placeholder }) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [value, setValue] = useState();

  const handleSearch = (newValue) => {
    fetchSuggestions(newValue, setData);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    navigate(`/search?q=${newValue}`);
  };

  return (
    <Select
      showSearch
      value={value}
      placeholder={placeholder}
      defaultActiveFirstOption={false}
      suffixIcon={<FaSearch className="text-primary" />}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={data.map((d) => ({
        value: d.value,
        label: (
          <div className="flex items-center">
            <img
              src={`https:${d.avatar}`}
              alt={d.text}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span>{d.text}</span>
          </div>
        ),
      }))}
      className="w-full rounded-md border bg-gray-200 min-w-620"
    />
  );
};

export default SearchInput;
