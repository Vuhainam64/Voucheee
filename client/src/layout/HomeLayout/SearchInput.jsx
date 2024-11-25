import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Spin } from "antd";

import { FaSearch } from "react-icons/fa";
import { getMiniSearch } from "../../api/voucher";

let timeout;
let currentValue;

const fetchSuggestions = async (value, callback) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const search = async () => {
    try {
      const results = await getMiniSearch(value);
      console.log("Results:", results);

      if (currentValue === value) {
        const formattedResults = results.map((item) => ({
          value: item.id,
          text: item.title,
          avatar: item.image,
        }));
        callback(formattedResults);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      callback([]); // Return empty array on error
    }
  };

  if (value) {
    timeout = setTimeout(search, 300);
  } else {
    callback([]); // Return empty when input is empty
  }
};

const SearchInput = ({ placeholder }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (newValue) => {
    setLoading(true);
    fetchSuggestions(newValue, (results) => {
      setData(results);
      setLoading(false);
    });
    setValue(newValue);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    navigate(`/detail/${newValue}`);
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
      notFoundContent={loading ? <Spin size="small" /> : null}
      options={data.map((d) => ({
        value: d.value,
        label: (
          <div className="flex items-center">
            <img
              src={d.avatar}
              alt={d.text}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span>{d.text}</span>
          </div>
        ),
      }))}
      className="w-full rounded-md border bg-gray-200 min-w-620"
      onKeyDown={(e) =>
        e.key === "Enter" ? navigate(`/search?q=${value}`) : ""
      }
    />
  );
};

export default SearchInput;
